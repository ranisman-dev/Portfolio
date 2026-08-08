// Tiny Town Sim — core engine.
// No DOM references in this file. Everything here is objective world state,
// generic verbs, perception/belief formation, and reactive agent decisions.
// presentation.js is the only thing allowed to touch the DOM.

const LOCATIONS = {
  square: { id: 'square', name: 'Town Square' },
  away:   { id: 'away',   name: 'Away' }, // abstract "not here" — no one perceives anything at 'away'
};

const VERBS = ['Take', 'Give', 'Attack', 'Tell', 'Move'];

const PREDICATE_LABELS = {
  stole_from: (c) => `${c.subject} stole ${c.item || 'something'} from ${c.victim}`,
  attacked:   (c) => `${c.subject} attacked ${c.victim}`,
  is_dead:    (c) => `${c.subject} is dead`,
  is_trustworthy: (c) => `${c.subject} is trustworthy`,
  is_dangerous:   (c) => `${c.subject} is dangerous`,
};

function makeAgent(id, name, opts = {}) {
  return {
    id,
    name,
    isPlayer: !!opts.isPlayer,
    location: opts.location || 'square',
    health: 100,
    alive: true,
    inventory: { bread: 0, gold: 0, ...(opts.inventory || {}) },
    traits: {
      courage: 0.5,       // reduces fear penalty when choosing risky reactions
      honesty: 0.9,        // chance a report is truthful vs. fabricated
      dislikeTheft: 0.6,   // how much theft offends this agent
      empathy: 0.5,        // how much they act on behalf of others they like
      ...(opts.traits || {}),
    },
    mind: opts.isPlayer ? null : {
      beliefs: [],          // {id, subject, predicate, data, confidence, source, tick}
      relationships: {},    // otherId -> {trust, affection, fear, grievance}
      reactedEventIds: new Set(),
      log: [],               // human-readable decision trail, for the mind inspector
    },
  };
}

function relOf(agent, otherId) {
  if (!agent.mind.relationships[otherId]) {
    agent.mind.relationships[otherId] = { trust: 0.5, affection: 0.3, fear: 0, grievance: 0 };
  }
  return agent.mind.relationships[otherId];
}

function createWorld() {
  const agents = {
    player: makeAgent('player', 'You', { isPlayer: true, inventory: { bread: 0, gold: 5 } }),
    mara:   makeAgent('mara', 'Mara', { inventory: { bread: 6, gold: 3 }, traits: { dislikeTheft: 0.9, courage: 0.3, honesty: 0.95 } }),
    ives:   makeAgent('ives', 'Ives', { inventory: { bread: 0, gold: 1 }, traits: { dislikeTheft: 0.2, courage: 0.7, honesty: 0.4 } }),
    tomas:  makeAgent('tomas', 'Tomas', { inventory: { bread: 1, gold: 2 }, traits: { dislikeTheft: 0.4, courage: 0.5, honesty: 0.55 } }),
    elena:  makeAgent('elena', 'Elena', { inventory: { bread: 1, gold: 4 }, traits: { dislikeTheft: 0.7, courage: 0.8, empathy: 0.8, honesty: 0.9 } }),
    garrick:makeAgent('garrick', 'Garrick', { inventory: { bread: 0, gold: 6 }, traits: { dislikeTheft: 0.8, courage: 0.9, empathy: 0.4, honesty: 0.85 } }),
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

// ── Perception → belief formation ────────────────────────────

function perceiveEvent(world, witnessId, event) {
  const witness = getAgent(world, witnessId);
  if (witness.isPlayer) return; // player forms their own beliefs implicitly via the UI/event log

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

  const appraisal = appraiseEvent(world, witness, event);
  applyAppraisal(witness, event.actor, appraisal);

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
  let impact = 0;

  const scale = event.data && event.data.quantity ? clamp(event.data.quantity / 2, 1, 3) : 1;

  if (event.verb === 'Take' && event.data.consented === false) {
    impact = -1 * witness.traits.dislikeTheft * scale;
  } else if (event.verb === 'Attack') {
    impact = -1.2;
  } else if (event.verb === 'Give') {
    impact = 0.4 * scale;
  }

  if (!isVictim) impact *= victimAffection > 0 ? victimAffection * witness.traits.empathy : 0.1;

  return { isVictim, impact, event };
}

function applyAppraisal(witness, actorId, appraisal) {
  if (appraisal.impact === 0) return;
  const rel = relOf(witness, actorId);
  rel.trust = clamp(rel.trust + appraisal.impact * 0.3, 0, 1);
  rel.affection = clamp(rel.affection + appraisal.impact * 0.25, -1, 1);
  if (appraisal.impact < 0) {
    rel.grievance = clamp(rel.grievance - appraisal.impact * 0.4, 0, 5);
    if (appraisal.event.verb === 'Attack') rel.fear = clamp(rel.fear - appraisal.impact * 0.3, 0, 1);
  } else {
    rel.grievance = clamp(rel.grievance - appraisal.impact * 0.3, 0, 5); // amends partially forgive, don't erase
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
  const candidates = [];

  candidates.push({ action: null, label: 'do nothing', score: 0.15 });

  if (coLocated(world, witness.id, actorId)) {
    const confrontScore = (-appraisal.impact) * 0.6 * witness.traits.courage - rel.fear * (1 - witness.traits.courage);
    candidates.push({
      action: () => performAction(world, witness.id, 'Attack', { targetId: actorId }, { causedBy: event.id }),
      label: `confront ${actorId}`,
      score: confrontScore,
    });
  }

  const confidant = pickConfidant(world, witness, actorId, event.data.targetId);
  if (confidant && !believesDead(witness, confidant)) {
    const truthful = Math.random() < witness.traits.honesty;
    const subject = truthful ? actorId : pickScapegoat(world, witness, actorId);
    const predicate = event.verb === 'Attack' ? 'attacked' : 'stole_from';
    const claim = { predicate, subject, victim: event.data.targetId, item: event.data.item };
    candidates.push({
      action: () => performAction(world, witness.id, 'Tell', { targetId: confidant, claim }, { causedBy: event.id }),
      label: `tell ${confidant} about ${actorId}${truthful ? '' : ' (misattributed)'}`,
      score: (-appraisal.impact) * 0.5 + witness.traits.empathy * 0.2,
    });
  }

  if (rel.fear > 0.4) {
    candidates.push({
      action: () => performAction(world, witness.id, 'Move', { toLocation: 'away' }, { causedBy: event.id }),
      label: 'retreat',
      score: rel.fear * (1 - witness.traits.courage) * 0.8,
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
  PREDICATE_LABELS,
  createWorld,
  performAction,
  getAgent,
};

if (typeof window !== 'undefined') window.Sim = Sim;
