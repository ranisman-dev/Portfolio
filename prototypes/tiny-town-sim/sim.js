// Tiny Town Sim — core engine.
// No DOM references in this file. Everything here is objective world state,
// generic verbs, perception/belief formation, and reactive agent decisions.
// presentation.js is the only thing allowed to touch the DOM.

const LOCATIONS = {
  square: { id: 'square', name: 'Town Square' },
  away:   { id: 'away',   name: 'Away' }, // abstract "not here" — no one perceives anything at 'away'
};

const VERBS = ['Take', 'Give', 'Attack', 'Tell', 'Move'];

// Global value bank. An agent only carries a handful of these with a weight;
// absence from an agent's list means indifference, not opposition — a
// negative weight is how an agent is actively against something.
const VALUES = [
  'Honesty', 'Justice', 'Loyalty', 'Wealth', 'Safety', 'Compassion',
  'Tradition', 'Autonomy', 'Status', 'Community', 'Pleasure', 'Curiosity', 'Honor',
];

const PREDICATE_LABELS = {
  stole_from: (c) => `${c.subject} stole ${c.item || 'something'} from ${c.victim}`,
  attacked:   (c) => `${c.subject} attacked ${c.victim}`,
  is_dead:    (c) => `${c.subject} is dead`,
  is_trustworthy: (c) => `${c.subject} is trustworthy`,
  is_dangerous:   (c) => `${c.subject} is dangerous`,
};

const EMOTION_HALFLIFE_TICKS = 6;

function makeAgent(id, name, opts = {}) {
  const isPlayer = !!opts.isPlayer;
  return {
    id,
    name,
    isPlayer,
    location: opts.location || 'square',
    health: 100,
    alive: true,
    inventory: { bread: 0, gold: 0, ...(opts.inventory || {}) },
    mind: isPlayer ? null : {
      personality: {
        openness: 0.5, conscientiousness: 0.5, extraversion: 0.5,
        agreeableness: 0.5, neuroticism: 0.5,
        boldness: 0.5, // additional behavioral trait, beyond OCEAN — added because risk-taking in
                        // confront/retreat decisions isn't well-separated from Neuroticism alone
        ...(opts.personality || {}),
      },
      values: opts.values || [], // [{ value: 'Justice', weight: 0.7 }, ...] — weight in [-1, 1]
      beliefs: [],                // propositional: {id, subject, predicate, data, confidence, source, tick, eventId}
      needs: { safety: 1, sustenance: 1, belonging: 0.6, ...(opts.needs || {}) },
      emotions: [],                // transient: {emotion, target, intensity, tick} — decays, doesn't persist like relationships
      relationships: {},           // otherId -> {trust, affection, fear, grievance}
      memories: [],                 // episodic pointers: {id, eventId, tick, importance}
      goals: { current: [], future: [] },
      reactedEventIds: new Set(),
      log: [],                      // human-readable decision trail, for the mind inspector
    },
  };
}

function relOf(agent, otherId) {
  if (!agent.mind.relationships[otherId]) {
    agent.mind.relationships[otherId] = { trust: 0.5, affection: 0.3, fear: 0, grievance: 0 };
  }
  return agent.mind.relationships[otherId];
}

function getValueWeight(agent, valueName) {
  const v = agent.mind.values.find(v => v.value === valueName);
  return v ? v.weight : 0; // absent = indifferent, not opposed
}

function createWorld() {
  const agents = {
    player: makeAgent('player', 'You', { isPlayer: true, inventory: { bread: 0, gold: 5 } }),

    mara: makeAgent('mara', 'Mara', {
      inventory: { bread: 6, gold: 3 },
      personality: { conscientiousness: 0.8, agreeableness: 0.55, neuroticism: 0.4, boldness: 0.35 },
      values: [{ value: 'Justice', weight: 0.7 }, { value: 'Honesty', weight: 0.6 }, { value: 'Community', weight: 0.4 }],
    }),
    ives: makeAgent('ives', 'Ives', {
      inventory: { bread: 0, gold: 1 },
      personality: { conscientiousness: 0.3, agreeableness: 0.35, extraversion: 0.7, boldness: 0.7 },
      values: [{ value: 'Pleasure', weight: 0.6 }, { value: 'Autonomy', weight: 0.5 }, { value: 'Honesty', weight: -0.3 }],
    }),
    tomas: makeAgent('tomas', 'Tomas', {
      inventory: { bread: 1, gold: 2 },
      personality: { agreeableness: 0.4, neuroticism: 0.45, boldness: 0.5 },
      values: [{ value: 'Status', weight: 0.5 }, { value: 'Wealth', weight: 0.5 }, { value: 'Tradition', weight: 0.3 }],
    }),
    elena: makeAgent('elena', 'Elena', {
      inventory: { bread: 1, gold: 4 },
      personality: { openness: 0.6, conscientiousness: 0.6, agreeableness: 0.75, neuroticism: 0.3, boldness: 0.75 },
      values: [{ value: 'Compassion', weight: 0.8 }, { value: 'Justice', weight: 0.6 }, { value: 'Community', weight: 0.5 }],
    }),
    garrick: makeAgent('garrick', 'Garrick', {
      inventory: { bread: 0, gold: 6 },
      personality: { conscientiousness: 0.8, neuroticism: 0.25, boldness: 0.85 },
      values: [{ value: 'Justice', weight: 0.7 }, { value: 'Honesty', weight: 0.7 }, { value: 'Loyalty', weight: 0.5 }],
    }),
  };

  // Seed one asymmetric relationship so "Tomas dislikes Mara" scenarios are
  // testable out of the box, per the prototype's own example script.
  relOf(agents.tomas, 'mara').affection = -0.3;
  relOf(agents.tomas, 'mara').trust = 0.3;

  return {
    tick: 0,
    agents,
    events: [],
    nextEventId: 1,
  };
}

// ── Shared helpers ─────────────────────────────────────────────

function getAgent(world, id) {
  const a = world.agents[id];
  if (!a) throw new Error(`Unknown agent: ${id}`);
  return a;
}

function coLocated(world, aId, bId) {
  const a = getAgent(world, aId), b = getAgent(world, bId);
  return a.location === b.location && a.location !== 'away';
}

function agentsAt(world, locationId, excludeId) {
  return Object.values(world.agents).filter(a => a.location === locationId && a.id !== excludeId && a.alive);
}

// ── Action pipeline (player and NPCs both funnel through this) ──

let reactionDepth = 0;
const MAX_REACTION_DEPTH = 4;

function performAction(world, actorId, verb, params = {}, opts = {}) {
  const actor = getAgent(world, actorId);
  if (!actor.alive) return { success: false, reason: 'actor is not able to act' };

  const check = checkPreconditions(world, actor, verb, params);
  if (!check.ok) return { success: false, reason: check.reason };

  const { data, location } = applyEffects(world, actor, verb, params);

  const event = {
    id: world.nextEventId++,
    tick: world.tick++,
    verb,
    actor: actorId,
    location,
    data,
    causedBy: opts.causedBy || null, // eventId this was a reaction to, for provenance
  };
  world.events.push(event);

  const witnesses = computeWitnesses(world, event);
  witnesses.forEach(w => perceiveEvent(world, w, event));

  return { success: true, event };
}

function checkPreconditions(world, actor, verb, params) {
  switch (verb) {
    case 'Take':
    case 'Give': {
      const target = world.agents[params.targetId];
      if (!target) return { ok: false, reason: 'no such person' };
      if (!coLocated(world, actor.id, target.id)) return { ok: false, reason: `${target.name} isn't here` };
      const qty = params.quantity || 1;
      const item = params.item || 'bread';
      const holder = verb === 'Take' ? target : actor;
      if ((holder.inventory[item] || 0) < qty) return { ok: false, reason: `not enough ${item}` };
      return { ok: true };
    }
    case 'Attack': {
      const target = world.agents[params.targetId];
      if (!target) return { ok: false, reason: 'no such person' };
      if (target.id === actor.id) return { ok: false, reason: "can't attack yourself" };
      if (!coLocated(world, actor.id, target.id)) return { ok: false, reason: `${target.name} isn't here` };
      if (!target.alive) return { ok: false, reason: `${target.name} is already down` };
      return { ok: true };
    }
    case 'Tell': {
      const target = world.agents[params.targetId];
      if (!target) return { ok: false, reason: 'no such person' };
      if (!coLocated(world, actor.id, target.id)) return { ok: false, reason: `${target.name} isn't here` };
      if (!params.claim || !params.claim.predicate) return { ok: false, reason: 'no claim to tell' };
      return { ok: true };
    }
    case 'Move': {
      const dest = params.toLocation;
      if (!LOCATIONS[dest]) return { ok: false, reason: 'no such place' };
      if (actor.location === dest) return { ok: false, reason: 'already there' };
      return { ok: true };
    }
    default:
      return { ok: false, reason: `unknown verb ${verb}` };
  }
}

function applyEffects(world, actor, verb, params) {
  switch (verb) {
    case 'Take': {
      const target = getAgent(world, params.targetId);
      const item = params.item || 'bread';
      const qty = Math.min(params.quantity || 1, target.inventory[item] || 0);
      target.inventory[item] -= qty;
      actor.inventory[item] = (actor.inventory[item] || 0) + qty;
      if (!target.isPlayer && item === 'bread' && target.inventory.bread === 0) {
        adjustNeed(target, 'sustenance', -0.4);
        upsertGoal(target, 'ReplenishFood', null, 0.4, world.tick, 'future');
      }
      return { location: actor.location, data: { targetId: target.id, item, quantity: qty, consented: false } };
    }
    case 'Give': {
      const target = getAgent(world, params.targetId);
      const item = params.item || 'bread';
      const qty = Math.min(params.quantity || 1, actor.inventory[item] || 0);
      actor.inventory[item] -= qty;
      target.inventory[item] = (target.inventory[item] || 0) + qty;
      return { location: actor.location, data: { targetId: target.id, item, quantity: qty, consented: true } };
    }
    case 'Attack': {
      const target = getAgent(world, params.targetId);
      const damage = 15 + Math.floor(Math.random() * 15);
      target.health = Math.max(0, target.health - damage);
      if (target.health === 0) target.alive = false;
      if (!target.isPlayer) adjustNeed(target, 'safety', -0.4);
      return { location: actor.location, data: { targetId: target.id, damage, targetSurvived: target.alive } };
    }
    case 'Tell': {
      const target = getAgent(world, params.targetId);
      return { location: actor.location, data: { targetId: target.id, claim: params.claim } };
    }
    case 'Move': {
      const from = actor.location;
      actor.location = params.toLocation;
      return { location: from === 'square' ? 'square' : params.toLocation, data: { from, to: params.toLocation } };
    }
  }
}

function computeWitnesses(world, event) {
  if (event.location !== 'square') return [];
  return agentsAt(world, 'square', event.actor).map(a => a.id);
}

// ── Needs / Emotions / Memories / Goals helpers ─────────────────

function adjustNeed(agent, needName, delta) {
  agent.mind.needs[needName] = clamp((agent.mind.needs[needName] ?? 1) + delta, 0, 1);
}

function pushEmotion(agent, emotion, targetId, intensity, tick) {
  agent.mind.emotions.push({ emotion, target: targetId, intensity, tick });
  if (agent.mind.emotions.length > 20) agent.mind.emotions.shift();
}

function activeEmotionIntensity(agent, emotion, targetId, currentTick) {
  return agent.mind.emotions
    .filter(e => e.emotion === emotion && e.target === targetId)
    .reduce((sum, e) => sum + e.intensity * Math.pow(0.5, (currentTick - e.tick) / EMOTION_HALFLIFE_TICKS), 0);
}

function addMemory(agent, eventId, tick, importance) {
  agent.mind.memories.push({ id: `${agent.id}-mem${eventId}`, eventId, tick, importance });
  if (agent.mind.memories.length > 40) agent.mind.memories.shift();
}

function upsertGoal(agent, type, targetId, priority, tick, bucket = 'current') {
  const list = agent.mind.goals[bucket];
  const existing = list.find(g => g.type === type && g.target === targetId);
  if (existing) { existing.priority = Math.max(existing.priority, priority); existing.tick = tick; return existing; }
  const goal = { id: `${agent.id}-goal-${type}-${targetId}-${tick}`, type, target: targetId, priority, tick };
  list.push(goal);
  return goal;
}

function resolveGoal(agent, type, targetId) {
  agent.mind.goals.current = agent.mind.goals.current.filter(g => !(g.type === type && g.target === targetId));
}

// ── Perception → belief formation ────────────────────────────

function perceiveEvent(world, witnessId, event) {
  const witness = getAgent(world, witnessId);
  if (witness.isPlayer) return; // player forms their own beliefs implicitly via the UI/event log

  const appraisal = appraiseEvent(world, witness, event);
  addMemory(witness, event.id, event.tick, clamp(Math.abs(appraisal.impact), 0.1, 1));

  witness.mind.beliefs.push({
    id: `${witnessId}-ev${event.id}`,
    subject: event.actor,
    predicate: `did:${event.verb}`,
    data: event.data,
    confidence: 1.0,
    source: 'witnessed',
    tick: event.tick,
    eventId: event.id,
  });

  applyAppraisal(world, witness, event, appraisal);

  if (event.verb === 'Tell' && event.data.targetId === witnessId) {
    const trust = relOf(witness, event.actor).trust;
    applyClaimBelief(witness, event.actor, event.data.claim, 0.4 + trust * 0.5, `told:${event.actor}`, event.tick, event.id);
  } else if (event.verb === 'Tell') {
    // overheard secondhand — weaker confidence than being told directly
    const trust = relOf(witness, event.actor).trust;
    applyClaimBelief(witness, event.actor, event.data.claim, 0.2 + trust * 0.3, `overheard:${event.actor}`, event.tick, event.id);
  }

  if (!witness.mind.reactedEventIds.has(event.id) && reactionDepth < MAX_REACTION_DEPTH) {
    witness.mind.reactedEventIds.add(event.id);
    reactionDepth++;
    try {
      decideAndAct(world, witness, event, appraisal);
    } finally {
      reactionDepth--;
    }
  }
}

function appraiseEvent(world, witness, event) {
  const isVictim = event.data && event.data.targetId === witness.id;
  const victimAffection = (!isVictim && event.data && event.data.targetId) ? relOf(witness, event.data.targetId).affection : 0;
  const scale = event.data && event.data.quantity ? clamp(event.data.quantity / 2, 1, 3) : 1;
  let impact = 0;

  if (event.verb === 'Take' && event.data.consented === false) {
    const justiceWeight = getValueWeight(witness, 'Justice');
    const offense = clamp(0.5 + justiceWeight * 0.5, 0, 1); // absent Justice value -> moderate baseline offense
    impact = -1 * offense * scale;
  } else if (event.verb === 'Attack') {
    impact = -1.2;
  } else if (event.verb === 'Give') {
    impact = 0.4 * scale;
  }

  if (!isVictim) {
    // General willingness to care about a wrong done to someone else — driven by
    // temperament (Agreeableness) and, on top of that, an explicit Compassion value.
    const generalCare = clamp(0.15 + witness.mind.personality.agreeableness * 0.3 + getValueWeight(witness, 'Compassion') * 0.3, 0, 1);
    impact *= victimAffection > 0 ? victimAffection * generalCare * 1.5 : generalCare * 0.3;
  }

  return { isVictim, impact, event };
}

function applyAppraisal(world, witness, event, appraisal) {
  const { impact } = appraisal;
  if (impact === 0) return;
  const rel = relOf(witness, event.actor);

  rel.trust = clamp(rel.trust + impact * 0.3, 0, 1);
  rel.affection = clamp(rel.affection + impact * 0.25, -1, 1);

  if (impact < 0) {
    rel.grievance = clamp(rel.grievance - impact * 0.4, 0, 5);
    if (event.verb === 'Attack') {
      rel.fear = clamp(rel.fear - impact * 0.3 * (0.5 + witness.mind.personality.neuroticism * 0.5), 0, 1);
      pushEmotion(witness, 'Fear', event.actor, -impact * 0.8, event.tick);
    }
    pushEmotion(witness, appraisal.isVictim ? 'Anger' : 'Indignation', event.actor, -impact, event.tick);
    if (appraisal.isVictim) upsertGoal(witness, 'SeekRestitution', event.actor, -impact, event.tick);
  } else {
    // A kind act is still a kind act at face value (trust/affection rise above already
    // reflect that) — but whether it settles the score is gated by how forgiving this
    // person is (Agreeableness) and how much they expected in return (Wealth value).
    const wealthWeight = getValueWeight(witness, 'Wealth');
    const enoughFactor = clamp(1 - wealthWeight * 0.6, 0.25, 1.4);
    const forgiveness = clamp(0.3 + witness.mind.personality.agreeableness * 0.7, 0.1, 1);
    rel.grievance = clamp(rel.grievance - impact * enoughFactor * forgiveness * 0.5, 0, 5);
    if (appraisal.isVictim) {
      pushEmotion(witness, 'Gratitude', event.actor, impact, event.tick);
      if (rel.grievance < 0.15) resolveGoal(witness, 'SeekRestitution', event.actor);
    }
  }
}

function applyClaimBelief(witness, tellerId, claim, confidence, source, tick, eventId) {
  witness.mind.beliefs.push({
    id: `${witness.id}-claim${eventId}`,
    subject: claim.subject,
    predicate: claim.predicate,
    data: claim,
    confidence: clamp(confidence, 0, 1),
    source,
    tick,
    eventId,
  });

  if (confidence < 0.35) return; // too little trust in the source to act on it
  if (claim.subject === witness.id) return; // hearing gossip about yourself doesn't need a relationship-with-self

  if (claim.predicate === 'stole_from' || claim.predicate === 'attacked') {
    const rel = relOf(witness, claim.subject);
    rel.trust = clamp(rel.trust - 0.25 * confidence, 0, 1);
    rel.affection = clamp(rel.affection - 0.2 * confidence, -1, 1);
    const caresAboutVictim = claim.victim === witness.id ? true : (claim.victim && relOf(witness, claim.victim).affection > 0);
    rel.grievance = clamp(rel.grievance + (caresAboutVictim ? 0.5 : 0.15) * confidence, 0, 5);
  } else if (claim.predicate === 'is_trustworthy') {
    const rel = relOf(witness, claim.subject);
    rel.trust = clamp(rel.trust + 0.2 * confidence, 0, 1);
  } else if (claim.predicate === 'is_dangerous') {
    const rel = relOf(witness, claim.subject);
    rel.fear = clamp(rel.fear + 0.3 * confidence, 0, 1);
  }
}

function believesDead(agent, id) {
  return agent.mind.beliefs.some(b => b.predicate === 'is_dead' && b.subject === id && b.confidence > 0.4);
}

// ── Decide + Act: a small generic utility AI over the same 5 verbs ──

function decideAndAct(world, witness, event, appraisal) {
  if (appraisal.impact >= -0.05) {
    if (appraisal.impact < 0) {
      witness.mind.log.push({
        tick: event.tick,
        trigger: `ev#${event.id} ${event.verb} by ${event.actor}`,
        considered: [`do nothing=0.15`],
        chose: `barely noticed — didn't care enough to react`,
      });
    }
    return;
  }

  const actorId = event.actor;
  const rel = relOf(witness, actorId);
  const { boldness } = witness.mind.personality;
  const anger = activeEmotionIntensity(witness, appraisal.isVictim ? 'Anger' : 'Indignation', actorId, event.tick);
  const candidates = [];

  candidates.push({ action: null, label: 'do nothing', score: 0.15 });

  if (coLocated(world, witness.id, actorId)) {
    const confrontScore = (-appraisal.impact) * 0.5 * boldness - rel.fear * (1 - boldness) + anger * 0.15;
    candidates.push({
      action: () => performAction(world, witness.id, 'Attack', { targetId: actorId }, { causedBy: event.id }),
      label: `confront ${actorId}`,
      score: confrontScore,
    });
  }

  const confidant = pickConfidant(world, witness, actorId, event.data.targetId);
  if (confidant && !believesDead(witness, confidant)) {
    const honestyWeight = getValueWeight(witness, 'Honesty');
    const truthful = Math.random() < clamp(0.5 + honestyWeight * 0.45, 0.05, 0.97);
    const subject = truthful ? actorId : pickScapegoat(world, witness, actorId);
    const predicate = event.verb === 'Attack' ? 'attacked' : 'stole_from';
    const claim = { predicate, subject, victim: event.data.targetId, item: event.data.item };
    const generalCare = clamp(0.15 + witness.mind.personality.agreeableness * 0.3 + getValueWeight(witness, 'Compassion') * 0.3, 0, 1);
    candidates.push({
      action: () => performAction(world, witness.id, 'Tell', { targetId: confidant, claim }, { causedBy: event.id }),
      label: `tell ${confidant} about ${actorId}${truthful ? '' : ' (misattributed)'}`,
      score: (-appraisal.impact) * 0.5 + generalCare * 0.2,
    });
  }

  const fearEmotion = activeEmotionIntensity(witness, 'Fear', actorId, event.tick);
  if (rel.fear > 0.3 || witness.mind.needs.safety < 0.7 || fearEmotion > 0.2) {
    const retreatScore = (rel.fear * 0.6 + (1 - witness.mind.needs.safety) * 0.3 + fearEmotion * 0.3) * (1 - boldness);
    candidates.push({
      action: () => performAction(world, witness.id, 'Move', { toLocation: 'away' }, { causedBy: event.id }),
      label: 'retreat',
      score: retreatScore,
    });
  }

  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0];

  witness.mind.log.push({
    tick: event.tick,
    trigger: `ev#${event.id} ${event.verb} by ${actorId}`,
    considered: candidates.map(c => `${c.label}=${c.score.toFixed(2)}`),
    chose: best.label,
  });

  if (best.action) best.action();
}

function pickConfidant(world, witness, excludeId, excludeVictimId) {
  const others = agentsAt(world, 'square', witness.id).filter(a => a.id !== excludeId && a.id !== excludeVictimId && !a.isPlayer);
  if (others.length === 0) return null;
  others.sort((a, b) => relOf(witness, b.id).trust - relOf(witness, a.id).trust);
  return others[0].id;
}

function pickScapegoat(world, witness, actualActorId) {
  const others = Object.keys(world.agents).filter(id => id !== actualActorId && id !== witness.id);
  return others[Math.floor(Math.random() * others.length)] || actualActorId;
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// ── Public API ──────────────────────────────────────────────

const Sim = {
  LOCATIONS,
  VERBS,
  VALUES,
  PREDICATE_LABELS,
  createWorld,
  performAction,
  getAgent,
};

if (typeof window !== 'undefined') window.Sim = Sim;
if (typeof module !== 'undefined') module.exports = Sim;
