// Tiny Town Sim — presentation layer.
// Only this file touches the DOM. It reads Sim's world state, sends typed
// player sentences through Parser, and calls Sim.performAction(); it never
// mutates world state directly.

let world = Sim.createWorld();
let inspectedId = 'mara';

const el = (id) => document.getElementById(id);

function renderWorld() {
  el('tick').textContent = world.tick;
  const byLocation = { square: [], away: [] };
  Object.values(world.agents).forEach(a => byLocation[a.location].push(a));

  el('world-panel').innerHTML = Object.values(Sim.LOCATIONS).map(loc => `
    <div class="location">
      <h3>${loc.name}</h3>
      ${byLocation[loc.id].length === 0 ? '<p class="empty">nobody here</p>' : byLocation[loc.id].map(renderAgentCard).join('')}
    </div>
  `).join('');
}

function renderAgentCard(a) {
  const hp = a.alive ? `${a.health} hp` : `<strong>down</strong>`;
  return `
    <div class="agent-card ${a.isPlayer ? 'is-player' : ''}" data-id="${a.id}">
      <div class="agent-name">${a.name}${a.isPlayer ? ' (you)' : ''}</div>
      <div class="agent-stats">${hp} · bread ${a.inventory.bread} · gold ${a.inventory.gold}</div>
      ${!a.isPlayer ? `<button class="link-btn inspect-btn" data-inspect="${a.id}">inspect mind</button>` : ''}
    </div>
  `;
}

function renderLog() {
  const logPanel = el('log-panel');
  logPanel.innerHTML = world.events.slice().reverse().map(ev => {
    const actor = Sim.getAgent(world, ev.actor).name;
    const causedTag = ev.causedBy ? `<span class="caused-by">↳ reaction to #${ev.causedBy}</span>` : '';
    return `<div class="log-entry"><span class="log-id">#${ev.id}</span> <strong>${actor}</strong> ${describeEvent(ev)} ${causedTag}</div>`;
  }).join('') || '<p class="empty">Nothing has happened yet.</p>';
}

function describeEvent(ev) {
  const targetName = ev.data.targetId ? Sim.getAgent(world, ev.data.targetId).name : '';
  switch (ev.verb) {
    case 'Take': return `took ${ev.data.quantity} ${ev.data.item} from ${targetName}`;
    case 'Give': return `gave ${ev.data.quantity} ${ev.data.item} to ${targetName}`;
    case 'Attack': return `attacked ${targetName} for ${ev.data.damage} damage${ev.data.targetSurvived ? '' : ' — they went down'}`;
    case 'Tell': return `told ${targetName}: "${Sim.PREDICATE_LABELS[ev.data.claim.predicate](ev.data.claim)}"`;
    case 'Move': return `moved from ${ev.data.from} to ${ev.data.to}`;
    default: return '';
  }
}

function renderMind() {
  const agent = world.agents[inspectedId];
  const panel = el('mind-panel');
  if (!agent || agent.isPlayer) { panel.innerHTML = '<p class="empty">Select an NPC to inspect.</p>'; return; }

  const beliefs = agent.mind.beliefs.slice().reverse().slice(0, 12).map(b => `
    <li><span class="belief-conf">${Math.round(b.confidence * 100)}%</span>
      ${b.predicate.startsWith('did:') ? `believes ${b.subject} performed ${b.predicate.slice(4)} (#${b.eventId})` : Sim.PREDICATE_LABELS[b.predicate] ? Sim.PREDICATE_LABELS[b.predicate](b.data) : `${b.subject} ${b.predicate}`}
      <span class="belief-source">via ${b.source}</span>
    </li>`).join('') || '<li class="empty">No beliefs yet.</li>';

  const relEntries = Object.entries(agent.mind.relationships).map(([otherId, r]) => {
    const otherName = world.agents[otherId] ? world.agents[otherId].name : otherId;
    return `<li><strong>${otherName}</strong> — trust ${r.trust.toFixed(2)}, affection ${r.affection.toFixed(2)}, fear ${r.fear.toFixed(2)}, grievance ${r.grievance.toFixed(2)}</li>`;
  }).join('') || '<li class="empty">No opinions formed yet.</li>';

  const decisionLog = agent.mind.log.slice().reverse().slice(0, 6).map(d => `
    <li><em>${d.trigger}</em><br>considered: ${d.considered.join(', ')}<br>chose: <strong>${d.chose}</strong></li>
  `).join('') || '<li class="empty">No decisions made yet.</li>';

  panel.innerHTML = `
    <h3>${agent.name}'s mind</h3>
    <div class="mind-section"><h4>Beliefs</h4><ul>${beliefs}</ul></div>
    <div class="mind-section"><h4>Relationships</h4><ul>${relEntries}</ul></div>
    <div class="mind-section"><h4>Recent decisions</h4><ul class="decision-log">${decisionLog}</ul></div>
  `;
}

function renderAll() {
  renderWorld();
  renderLog();
  renderMind();
}

// ── Player command input ────────────────────────────────────

function submitCommand(e) {
  e.preventDefault();
  const input = el('command-input');
  const raw = input.value;
  if (!raw.trim()) return;

  const parsed = Parser.parseCommand(world, 'player', raw);
  const resultEl = el('action-result');

  if (parsed.error) {
    resultEl.textContent = parsed.error;
    resultEl.classList.add('is-error');
    return;
  }

  const result = Sim.performAction(world, 'player', parsed.verb, parsed.params);
  if (!result.success) {
    resultEl.textContent = `Can't: ${result.reason}`;
    resultEl.classList.add('is-error');
    return;
  }

  resultEl.textContent = '';
  resultEl.classList.remove('is-error');
  input.value = '';
  renderAll();
}

function renderExamples() {
  el('example-list').innerHTML = Parser.EXAMPLES.map(cmd => `<li><button type="button" class="link-btn" data-example="${cmd}">${cmd}</button></li>`).join('');
}

function init() {
  renderExamples();
  el('command-form').addEventListener('submit', submitCommand);
  el('reset-btn').addEventListener('click', () => { world = Sim.createWorld(); el('action-result').textContent = ''; renderAll(); });
  el('world-panel').addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-inspect');
    if (id) { inspectedId = id; renderMind(); }
  });
  el('example-list').addEventListener('click', (e) => {
    const cmd = e.target.getAttribute('data-example');
    if (cmd) { el('command-input').value = cmd; el('command-input').focus(); }
  });
  renderAll();
}

document.addEventListener('DOMContentLoaded', init);
