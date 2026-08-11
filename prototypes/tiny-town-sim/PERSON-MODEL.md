# Person Model Reference

What each box on an NPC's mind actually is, as implemented in `sim.js` —
not the intent, the code. Written because the box count and the rules for
how they interact have grown past what's easy to hold in your head across
sessions. Update this when the model changes; treat any drift between this
file and `sim.js` as a bug in one or the other.

The player has no `mind` object. Everything below applies to NPCs only.

## Personality (`mind.personality`)

OCEAN + one additional trait, each 0–1, set once in `createWorld()` and
**never mutated anywhere in the codebase.** Fully static.

`openness, conscientiousness, extraversion, agreeableness, neuroticism, boldness`

`boldness` was added because confront/retreat decisions needed a risk-taking
axis that Neuroticism alone didn't cleanly cover — the one sanctioned
addition beyond the Big Five, per "add a trait only when the sim
demonstrates a need."

**Known gap:** this is meant to be the "sticky, not static" layer — slow to
shift, capable of snapping from one intense event. Right now it's just
static. See "Not yet built" below.

## Values (`mind.values`)

`[{ value: 'Justice', weight: 0.7 }, ...]` — weight in `[-1, 1]`. Picked from
a shared 13-entry bank (`Sim.VALUES`); each NPC holds 2–4. **Absence from
the list means indifference, not opposition** — `getValueWeight()` returns
`0` for anything not present, which is a real default, not a missing value.
Also never mutated after creation.

Values are what most behavior actually reads, not personality directly:
Honesty gates lying/scapegoating, Justice scales offense at theft, Wealth
gates whether restitution reads as "enough," Compassion adds to bystander
care on top of Agreeableness.

## Beliefs (`mind.beliefs`)

Propositional, not episodic — a belief is a *stance*, not a memory of
experiencing something. Shape:

```
{ id, subject, predicate, data, confidence, source, tick, eventId, contested? }
```

Two formation paths:
- **Witnessed** (`predicate: 'did:Take'` etc.) — always pushed at 100%
  confidence for any event the agent personally perceived.
- **Claimed** (`stole_from`, `attacked`, `is_dead`, `is_trustworthy`,
  `is_dangerous`, `provoked`) — confidence starts from trust in the source,
  then can be overridden:
  - to `0`, tagged "known false" in `source`, if `checkContradiction()`
    finds the witness has ground truth against it (self-knowledge about
    their own actions/what happened to them, or a direct eyewitness record
    naming someone else as the real actor)
  - discounted/boosted by `findConflictingBeliefs()` when it competes with
    an existing belief about the same incident (mutual counter-accusation
    or rival suspects for the same victim) — tagged `contested: true`
  - `provoked` claims are deliberately exempt from ground-truth checking —
    "why" isn't a fact the event ledger can confirm the way "did it happen"
    is, so it's judged purely on trust in the claimant

**Beliefs never decay and are never pruned.** The array only grows. This is
asymmetric with Memories on purpose right now, but worth revisiting —
should a belief someone hasn't had reinforced in a long time also soften?

## Memories (`mind.memories`)

Episodic pointers, not content: `{ id, eventId, tick, importance }`. The
actual "what happened" lives in `world.events`, looked up by `eventId` when
rendered — memories don't duplicate it.

- Formed **only by direct witnessing** — `addMemory()` fires once per
  perceived event, unconditionally, regardless of verb. Being told
  something never creates a memory of the claim; that's belief-only. Being
  told something *does* create a memory of the conversation happening (you
  witnessed someone speaking to you), just not of whether it's true.
- `importance` is fixed at formation from `appraisal.impact`, which is only
  ever nonzero for Take/Attack/Give. **`appraiseEvent` has no branch for
  Tell or Move**, so every conversation-memory forms at the floor value
  (`0.1`) no matter how explosive the content was. Hearing "X is dead"
  decays exactly as fast as hearing about the weather. Real gap, not a
  design choice — content significance should presumably feed back into how
  memorable the conversation itself is.
- Strength is computed live, not stored decayed: `memoryStrength(mem, tick)
  = importance × 0.5^((tick - formedTick) / halflife)`, `halflife = 3 +
  importance × 35`. Trivial memories (importance ~0.1) fade in ~6-7 ticks;
  a major one (importance ~1) lingers for ~38.
- Self-pruning: `addMemory()` drops anything under strength `0.03` (relative
  to the current tick) before pushing the new one. No separate GC pass.
- The only place memory strength currently gates behavior:
  `checkContradiction()`'s eyewitness override, and whether a dormant
  `SeekRestitution` goal is still eligible to resurface
  (`memoryStrengthForEvent`).

## Needs (`mind.needs`)

`{ safety, sustenance, belonging }`, default `{1, 1, 0.6}`, each 0–1.

**Only two triggers exist in the entire codebase**: being Attacked drops
`safety` by 0.4; bread hitting exactly zero after a Take drops `sustenance`
by 0.4. **`belonging` is wired to nothing anywhere — pure stub, permanently
0.6.** Needs also never regenerate — nothing raises them back toward 1.
There's no eating, no "felt safe for a while so safety recovers," nothing.
A need that's dropped stays dropped forever unless something explicitly
pushes it back up, and nothing currently does.

## Emotions (`mind.emotions`)

Transient, decaying, distinct from the slow-changing Relationship numbers:
`{ emotion, target, intensity, tick }`. Only four types exist —
`Anger`, `Indignation`, `Fear`, `Gratitude` — all pushed from
`applyAppraisal()` or `reactToBeingLiedTo()`. Decays live, same pattern as
memory: `intensity × 0.5^((tick - formedTick) / 6)`. Capped at 20 entries
per agent, oldest dropped first (not decay-based pruning, just a hard cap).

Read via `activeEmotionIntensity(agent, emotion, targetId, tick)`, which
sums all matching entries' current decayed value — multiple Anger spikes
toward the same person stack rather than replace.

## Relationships (`mind.relationships`)

`{ trust, affection, fear, grievance }` per other agent, default
`{0.5, 0.3, 0, 0}`, lazily created on first `relOf()` call. **Entirely
event-driven — no passive decay or drift.** A grievance formed at tick 3 is
bit-for-bit the same at tick 3000 unless a specific event touches it. This
is the "sticky" layer working as designed for relationships specifically —
the open question is whether it should also be true forever, or whether
very old, unreinforced relationship state should eventually soften the way
memories do.

## Goals (`mind.goals.current` / `.future`)

`{ id, type, target, priority, tick, sourceEventId?, reason? }`. Only two
types exist:

- **`SeekRestitution`** — the fully-built one. Created on victimization,
  closes when grievance decays low ("settled," deleted outright), or goes
  dormant (moved to `future`, tagged with `reason: 'affection'` or
  `'fear'`) when the witness likes the target too much to bother or is too
  scared to pursue it. Dormant goals get re-checked (`reassessGoals`)
  whenever the relationship with their target shifts again — they can
  resurface into `current` if the suppressing condition reverses and the
  underlying memory hasn't decayed past relevance, or get silently pruned
  if it has.
- **`ReplenishFood`** — created once (`applyEffects`, Take) when an NPC's
  bread hits zero, pushed straight into `future`. **Never read again
  anywhere in the codebase.** Same shape as a real goal, no behavior behind
  it — a stub that shows up in the mind inspector and nothing else.

## Not yet built

Logged, not implemented, so it doesn't get lost between sessions:

- **Personality/value drift.** The Phelps-Roper framework (intentional vs.
  unintentional change, sustained pressure vs. one intense event, the
  regression trap for unintentional shifts) — a separate design pass, not
  a bolt-on. Needs concrete trigger conditions before it's buildable:
  what counts as "intense enough," what a slow-accumulation path even
  measures against, per-value vs. whole-person shifts.
- **Belief decay/pruning.** Beliefs currently never fade or get forgotten
  the way memories do, which is an odd asymmetry given a belief is
  downstream of a memory in the witnessed case.
- **Needs regeneration and `belonging`.** No need currently recovers on its
  own, and `belonging` has no triggers at all.
- **Tell/Move-aware memory importance.** Conversation memories should
  presumably inherit some signal from the claim's content, not always form
  at the floor.
