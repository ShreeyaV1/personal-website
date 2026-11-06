/* Shreeya Vadlamannati — personal site */

// ---------- food cursors ----------
const CUPCAKE = `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'>
<path d='M7.5 18h21l-3.2 15.2H10.7z' fill='#c9a95a' stroke='#7a5d22' stroke-width='1.2' stroke-linejoin='round'/>
<path d='M12 18.5l1.4 14.4M18 18.5v14.4M24 18.5l-1.4 14.4' stroke='#9a7b3c' stroke-width='1.1'/>
<ellipse cx='18' cy='17' rx='11.5' ry='4.6' fill='#f3b6c4' stroke='#b5566b' stroke-width='1.2'/>
<ellipse cx='18' cy='12.6' rx='8.6' ry='4' fill='#f7c7d2' stroke='#b5566b' stroke-width='1.2'/>
<ellipse cx='18' cy='8.6' rx='5.4' ry='3.1' fill='#fbd8df' stroke='#b5566b' stroke-width='1.2'/>
<rect x='11' y='14' width='3' height='1.2' rx='.6' fill='#6b7a2e' transform='rotate(-25 12 14)'/>
<rect x='21' y='11.5' width='3' height='1.2' rx='.6' fill='#c9a95a' transform='rotate(30 22 12)'/>
<rect x='15.5' y='16.5' width='3' height='1.2' rx='.6' fill='#fff' transform='rotate(10 17 17)'/>
<path d='M18 3.6c.6-1.6 1.8-2.4 3-2.6' stroke='#3d4a1f' stroke-width='1.1' fill='none' stroke-linecap='round'/>
<circle cx='18' cy='5.2' r='2.7' fill='#b8323f' stroke='#7d1f2a' stroke-width='.9'/>
<circle cx='17.1' cy='4.4' r='.7' fill='#fff' opacity='.8'/></svg>`;

const DONUT = `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'>
<circle cx='18' cy='19' r='14' fill='#d9a35f' stroke='#8a5a22' stroke-width='1.2'/>
<path d='M6.5 17c1.5-6 6-9.5 11.5-9.5S28 11 29.5 17c-1 2-2.5 1-3.5 2.5s-1 3-3 3-2-2-4-2-2.5 2.5-4.5 2-1.5-2.8-3.5-3-2.6 1.5-4-2.5z' fill='#f3b6c4' stroke='#b5566b' stroke-width='1.1'/>
<circle cx='18' cy='18' r='4.2' fill='#fffaf0' stroke='#8a5a22' stroke-width='1.1'/>
<rect x='10' y='12' width='3' height='1.2' rx='.6' fill='#6b7a2e' transform='rotate(-30 11 12)'/>
<rect x='22' y='11' width='3' height='1.2' rx='.6' fill='#fff' transform='rotate(40 23 11)'/>
<rect x='25' y='16' width='3' height='1.2' rx='.6' fill='#c9a95a' transform='rotate(-10 26 16)'/>
<rect x='14' y='9.5' width='3' height='1.2' rx='.6' fill='#b8323f' transform='rotate(15 15 10)'/></svg>`;

const svgUrl = (s) => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;
document.documentElement.style.setProperty('--cur', `${svgUrl(CUPCAKE)} 18 4, auto`);
document.documentElement.style.setProperty('--cur-pointer', `${svgUrl(DONUT)} 18 18, pointer`);

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const rand = (a, b) => a + Math.random() * (b - a);
const PETAL_COLORS = ['#ff7aa2', '#ffd36e', '#b9a6ff', '#ffad85', '#f3ecdf', '#9fc59a', '#8fd0e8'];

// =====================================================================
// Opening: a seed sprouts, blooms, then bursts into petals
// =====================================================================
const intro = $('#intro');
let introDone = false;
$('#sprout .petals').innerHTML = Array.from({ length: 8 }, (_, i) =>
  `<path d="M0 0 C-16 -14 -14 -44 0 -52 C14 -44 16 -14 0 0Z" fill="${i % 2 ? '#ffad85' : '#ff7aa2'}" style="--r:${i * 45}deg;--i:${i}"/>`).join('');

function petalBurst(layer, x, y, n, spread, size = 1) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    const w = rand(10, 18) * size;
    Object.assign(s.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: w * .72 + 'px', background: PETAL_COLORS[i % PETAL_COLORS.length] });
    layer.appendChild(s);
    const a = Math.random() * Math.PI * 2, d = rand(.35, 1) * spread;
    const dx = Math.cos(a) * d, dy = Math.sin(a) * d;
    s.animate([
      { transform: 'translate(-50%,-50%) rotate(0deg) scale(.4)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rand(-300, 300)}deg) scale(1)`, opacity: 1, offset: .7 },
      { transform: `translate(calc(-50% + ${dx * 1.1}px), calc(-50% + ${dy + spread * .25}px)) rotate(${rand(-500, 500)}deg) scale(.9)`, opacity: 0 },
    ], { duration: rand(900, 1500), easing: 'cubic-bezier(.15,.7,.3,1)' }).onfinish = () => s.remove();
  }
}

function finishIntro() {
  if (introDone) return;
  introDone = true;
  intro.classList.add('leave');
  document.body.classList.remove('intro-on');
  document.body.classList.add('ready');
  setTimeout(() => intro.remove(), 700);
}
if (reduceMotion) {
  intro.remove();
  introDone = true;
  document.body.classList.add('ready');
} else {
  document.body.classList.add('intro-on');
  setTimeout(() => {
    if (introDone) return;
    const r = $('#sprout .core').getBoundingClientRect();
    $('#sprout').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(0)', opacity: 0 }], { duration: 500, easing: 'ease-in', fill: 'forwards' });
    petalBurst($('#introBurst'), r.left + r.width / 2, r.top + r.height / 2, 70, Math.max(innerWidth, innerHeight) * .7, 1.6);
    setTimeout(finishIntro, 650);
  }, 2050);
  setTimeout(finishIntro, 4500); // never leave the page behind the opener
  $('#introSkip').addEventListener('click', finishIntro);
  intro.addEventListener('click', finishIntro);
  addEventListener('keydown', (e) => { if (!introDone && ['Escape', 'Enter', ' '].includes(e.key)) finishIntro(); });
}

// =====================================================================
// Drifting petals in the background (they shy away from the cursor)
// =====================================================================
(function petalSky() {
  if (reduceMotion) return;
  const cv = $('#petalSky'), ctx = cv.getContext('2d');
  let W, H, mouse = { x: -999, y: -999 };
  const petals = [];
  const resize = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  addEventListener('resize', resize);
  addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  const count = innerWidth < 700 ? 14 : 26;
  for (let i = 0; i < count; i++) petals.push({
    x: rand(0, W), y: rand(-H, H), s: rand(6, 13), vy: rand(14, 34), sw: rand(.4, 1.2), ph: rand(0, 6.28),
    rot: rand(0, 6.28), vr: rand(-1, 1), c: PETAL_COLORS[i % 4], a: rand(.35, .75), dx: 0,
  });
  let last = performance.now();
  (function frame(t) {
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    ctx.clearRect(0, 0, W, H);
    for (const p of petals) {
      p.ph += dt * p.sw;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      const mx = p.x - mouse.x, my = p.y - mouse.y, md = Math.hypot(mx, my);
      if (md < 120) p.dx += (mx / md) * (120 - md) * dt * 4;
      p.dx *= .95;
      p.x += Math.sin(p.ph) * 18 * dt + p.dx * dt * 10;
      if (p.y > H + 20) { p.y = -20; p.x = rand(0, W); }
      if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, .45 + Math.abs(Math.sin(p.ph)) * .55);
      ctx.globalAlpha = p.a; ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.moveTo(0, -p.s);
      ctx.bezierCurveTo(p.s, -p.s * .6, p.s * .7, p.s * .7, 0, p.s);
      ctx.bezierCurveTo(-p.s * .7, p.s * .7, -p.s, -p.s * .6, 0, -p.s);
      ctx.fill(); ctx.restore();
    }
    requestAnimationFrame(frame);
  })(last);
})();

// =====================================================================
// Hero: big name + the bloom board
// =====================================================================
const NAME = 'SHREEYA';
const heroName = $('#heroName');
heroName.innerHTML = [...NAME].map((c, i) => `<span class="ch" aria-hidden="true"><span style="--i:${i}">${c}</span></span>`).join('');
const chars = $$('.hero-name .ch');

const hero = $('#home');
if (!reduceMotion) {
  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    chars.forEach((c) => {
      const r = c.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy), reach = 240;
      c.style.transform = d < reach ? `translate(${(-dx / d) * (reach - d) / reach * 24}px, ${(-dy / d) * (reach - d) / reach * 30}px) rotate(${(-dx / d) * (reach - d) / reach * 8}deg)` : '';
    });
  });
  hero.addEventListener('pointerleave', () => chars.forEach((c) => (c.style.transform = '')));
}

const KEY_COLORS = [['#ff7aa2', '#c44c74'], ['#ffd36e', '#c49a3a'], ['#b9a6ff', '#8170c9'], ['#9fc59a', '#6c9468'], ['#ffad85', '#c97a55'], ['#8fd0e8', '#5c9ab2'], ['#f3ecdf', '#b9ad98']];
const KEY_GLYPHS = ['✿', '❀', '✾', '❁', '✽', '❃', '✻'];
$('#nameKeys').innerHTML = [...NAME].map((c, i) =>
  `<button class="key key-letter" data-i="${i}" aria-label="Plant a flower: ${c}" style="--top:${KEY_COLORS[i][0]};--side:${KEY_COLORS[i][1]}">${c}<i>${KEY_GLYPHS[i]}</i></button>`).join('');
// nav keys type a word on the screen, then go
$$('.keys-nav [data-nav]').forEach((k) => { k.dataset.go = k.dataset.nav; delete k.dataset.nav; });

// the little screen
const screenText = $('#screenText');
const LINES = ['hi, i’m shreeya ✿', 'honours math @ uwaterloo', 'quantum-fair juries ⚛', 'a cursor you move with your head', 'taught 350 kids to code', 'press a key to plant ✿'];
let typing = { line: 0, char: 0, dir: 1, hold: 0, override: null };
setInterval(() => {
  if (typing.override) return;
  const L = LINES[typing.line];
  if (typing.hold > 0) { typing.hold--; return; }
  typing.char += typing.dir;
  screenText.textContent = L.slice(0, typing.char);
  if (typing.char >= L.length) { typing.dir = -1; typing.hold = 26; }
  else if (typing.char <= 0) { typing.dir = 1; typing.line = (typing.line + 1) % LINES.length; typing.hold = 4; }
}, 70);
let overrideTimer;
function sayOnScreen(text) {
  typing.override = text;
  screenText.textContent = text;
  clearTimeout(overrideTimer);
  overrideTimer = setTimeout(() => { typing.override = null; typing.char = 0; typing.dir = 1; }, 2200);
}

// garden of flowers along the bottom of the hero
const garden = $('#garden');
function flowerSVG(color, kind, h) {
  const w = 60;
  const stem = `<path d="M30 ${h} C26 ${h * .7} 34 ${h * .45} 30 34" stroke="#5d8a5a" stroke-width="3" fill="none"/>
    <path d="M30 ${h * .72} C18 ${h * .7} 12 ${h * .62} 10 ${h * .54} C20 ${h * .54} 27 ${h * .6} 30 ${h * .72}Z" fill="#7fae79"/>
    <path d="M30 ${h * .6} C42 ${h * .58} 48 ${h * .5} 50 ${h * .42} C40 ${h * .42} 33 ${h * .48} 30 ${h * .6}Z" fill="#6c9468"/>`;
  let head;
  if (kind === 0) head = Array.from({ length: 10 }, (_, i) => `<ellipse cx="30" cy="20" rx="4.5" ry="12" fill="${color}" transform="rotate(${i * 36} 30 32)"/>`).join('') + `<circle cx="30" cy="32" r="6" fill="#ffd36e"/>`;
  else if (kind === 1) head = `<path d="M17 36 Q14 14 24 6 L30 20 L36 6 Q46 14 43 36 Q30 44 17 36Z" fill="${color}"/><path d="M30 20 L36 6 Q46 14 43 36 Q36 40 30 40Z" fill="#000" opacity=".12"/>`;
  else head = Array.from({ length: 5 }, (_, i) => `<circle cx="30" cy="20" r="9" fill="${color}" transform="rotate(${i * 72} 30 32)"/>`).join('') + `<circle cx="30" cy="32" r="5.5" fill="#fff3c9"/>`;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g class="sway" style="animation-delay:${rand(-4, 0).toFixed(2)}s">${stem}${head}</g></svg>`;
}
function plant(xFrac = Math.random(), color = PETAL_COLORS[Math.floor(Math.random() * 4)]) {
  const h = Math.round(rand(80, 170) * (innerWidth < 700 ? .7 : 1));
  const wrap = document.createElement('div');
  wrap.innerHTML = flowerSVG(color, Math.floor(Math.random() * 3), h);
  const svg = wrap.firstChild;
  svg.style.left = `calc(${(xFrac * 100).toFixed(2)}% - 30px)`;
  svg.style.zIndex = Math.round(200 - h);
  garden.appendChild(svg);
  const all = garden.children;
  if (all.length > 46) all[0].remove();
}
for (let i = 0; i < 11; i++) plant((i + rand(.1, .9)) / 11);

function pressLetter(i) {
  const key = $(`#nameKeys [data-i="${i}"]`);
  key.classList.add('down');
  setTimeout(() => key.classList.remove('down'), 140);
  chars[i].classList.add('lit');
  setTimeout(() => chars[i].classList.remove('lit'), 500);
  const r = key.getBoundingClientRect();
  plant(clamp((r.left + r.width / 2) / innerWidth + rand(-.08, .08), .02, .98), KEY_COLORS[i][0]);
  if (!reduceMotion) petalBurst($('#burst'), r.left + r.width / 2, r.top, 8, 60, .8);
  const shown = typing.override && typing.override.length < 18 ? typing.override : '';
  sayOnScreen((shown + NAME[i].toLowerCase()).slice(-18));
}
$('#nameKeys').addEventListener('click', (e) => { const k = e.target.closest('[data-i]'); if (k) pressLetter(+k.dataset.i); });
$$('.keys-nav [data-go]').forEach((k) => k.addEventListener('click', () => {
  sayOnScreen('→ ' + k.dataset.say);
  setTimeout(() => (k.dataset.go === 'blog' ? show('blog') : show('home', { section: k.dataset.go })), 260);
}));
let eToggle = 0;
addEventListener('keydown', (e) => {
  if (!introDone || current.view !== 'home' || scrollY > innerHeight * .8 || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.target.closest?.('input, textarea, select') || sprint.running()) return;
  const c = e.key.toUpperCase();
  if (c.length !== 1 || !NAME.includes(c)) return;
  const idx = c === 'E' ? (eToggle ^= 1) ? 3 : 4 : NAME.indexOf(c);
  pressLetter(idx);
});

// =====================================================================
// About: a pressed-flower specimen
// =====================================================================
$('#specimenArt').innerHTML = `<svg viewBox="0 0 220 320">
  <path d="M112 318 C108 260 118 210 106 150 C98 110 110 80 108 56" stroke="#6f7f4e" stroke-width="3" fill="none"/>
  <path d="M110 250 C80 246 60 226 54 200 C82 204 102 222 110 250Z" fill="#8c9a62"/>
  <path d="M112 214 C142 210 160 190 166 166 C138 170 120 188 112 214Z" fill="#7b8a55"/>
  <path d="M106 160 C84 150 74 130 74 110 C94 118 104 136 106 160Z" fill="#94a36b"/>
  <path d="M108 250 L84 232 M112 214 L140 194 M106 160 L88 130" stroke="#5d6b3f" stroke-width="1.2"/>
  <g transform="translate(108 56)">
    ${Array.from({ length: 12 }, (_, i) => `<path d="M0 0 C-10 -10 -9 -36 0 -42 C9 -36 10 -10 0 0Z" fill="${i % 2 ? '#d7889c' : '#c66b84'}" opacity=".92" transform="rotate(${i * 30})"/>`).join('')}
    <circle r="11" fill="#d9b453"/><circle r="11" fill="none" stroke="#a9852f" stroke-dasharray="2 3"/>
  </g>
  <g transform="translate(168 120) rotate(30)">
    ${Array.from({ length: 5 }, (_, i) => `<ellipse cx="0" cy="-10" rx="6" ry="10" fill="#a99bd6" transform="rotate(${i * 72})"/>`).join('')}<circle r="4" fill="#efe1a8"/>
  </g>
  <path d="M168 120 C160 160 140 190 118 210" stroke="#6f7f4e" stroke-width="2" fill="none"/>
</svg>`;

// =====================================================================
// Experience: a vine that grows as you scroll
// =====================================================================
const EXPERIENCE = [
  {
    when: 'Jun 2025 – Jun 2026', role: 'International Youth Advisory Board Member', org: 'Youth Volunteer Corps · Calgary, AB',
    points: [
      'Selected as one of 20–30 youth leaders worldwide to advise Youth Volunteer Corps headquarters on programs and community initiatives',
      'Advised headquarters on youth recruitment strategies across 12 monthly virtual meetings, helping shape volunteer programs that appeal to young people',
      'Organized and ran the International Youth Advisory Board, coordinating youth leaders across Canada, the U.S., and Uganda',
      'Awarded $2,500 in grants to youth environmental and disaster-relief projects across 3 countries',
    ],
    stats: [['20–30', 'leaders chosen worldwide'], ['12', 'monthly meetings'], ['$2,500', 'in grants awarded']],
    color: '#ff7aa2',
  },
  {
    when: 'Jan 2025 – Mar 2026', role: 'Instructor', org: 'Calgary Public Library · Calgary, AB',
    points: [
      "Introduced 350 young learners to coding concepts through the library's digital skills programs, contributing 40+ hours",
      "Taught reading, math, and coding concepts in interactive sessions, strengthening children's literacy, numeracy, and digital skills",
      'Designed a fun and supportive learning environment in each session, building confidence and keeping learners engaged',
    ],
    stats: [['350', 'young learners'], ['40+', 'hours taught']],
    color: '#ffd36e',
  },
  {
    when: 'Dec 2024 – Jan 2026', role: 'Volunteer', org: 'Youth Central · Calgary, AB',
    points: [
      'Contributed 250+ volunteer hours to organizing and planning special events and programs for youth across Calgary, keeping them running smoothly and on schedule',
      'Used strong interpersonal communication skills to share information about organized activities with participants',
    ],
    stats: [['250+', 'volunteer hours']],
    color: '#b9a6ff',
  },
];
$('#seasons').innerHTML = EXPERIENCE.map((x, i) => `
  <li class="season${i === 0 ? ' open' : ''}">
    <span class="season-leaf" aria-hidden="true"><svg viewBox="0 0 40 40">${Array.from({ length: 5 }, (_, k) => `<ellipse cx="20" cy="11" rx="6" ry="9" fill="${x.color}" transform="rotate(${k * 72} 20 20)"/>`).join('')}<circle cx="20" cy="20" r="5" fill="#fff3c9"/></svg></span>
    <div class="season-card">
      <button class="season-head" aria-expanded="${i === 0}">
        <span class="season-when">${x.when}</span>
        <span class="season-role">${x.role}</span>
        <span class="season-org">${x.org}</span>
        <span class="season-plus" aria-hidden="true">+</span>
      </button>
      <div class="season-body"><div><div class="season-inner">
        <ul>${x.points.map((p) => `<li>${p}</li>`).join('')}</ul>
        <div class="season-stats">${x.stats.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join('')}</div>
      </div></div></div>
    </div>
  </li>`).join('');
$$('.season-head').forEach((h) => h.addEventListener('click', () => {
  const s = h.closest('.season');
  const open = !s.classList.contains('open');
  s.classList.toggle('open', open);
  h.setAttribute('aria-expanded', open);
}));
const vinePath = $('#vinePath');
const vineLen = vinePath.getTotalLength();
vinePath.style.strokeDasharray = vineLen;
function growVine() {
  const r = $('.vine-wrap').getBoundingClientRect();
  const k = clamp((innerHeight * .8 - r.top) / (r.height || 1), 0, 1);
  vinePath.style.strokeDashoffset = vineLen * (1 - (reduceMotion ? 1 : k));
}

// =====================================================================
// Toolkit: seed packets that flip over
// =====================================================================
const PACKETS = [
  ['Programming', 'Python, C++, Racket and HTML/CSS: from quick scripts to problem sets.', ['Python', 'C++', 'Racket', 'HTML/CSS', 'Testing & debugging'], '#ffd36e', 0],
  ['Web & apps', 'Front ends, APIs and quick apps, like the requests behind mentor matching.', ['React', 'REST APIs', 'Postman', 'Streamlit'], '#ff7aa2', 1],
  ['Quantum & vision', 'Quantum circuits for QuBench and face tracking for Face Control.', ['Qiskit', 'QAOA', 'OpenCV', 'MediaPipe', 'PyAutoGUI'], '#8fd0e8', 2],
  ['3D & tools', 'Modelling environments in Maya, and getting from idea to prototype.', ['Autodesk Maya', '3D modelling', 'Rapid prototyping', 'Microsoft Office'], '#9fc59a', 0],
  ['Leadership', 'Running boards, sessions and events with people across three countries.', ['Team leadership', 'Mentorship', 'Collaboration'], '#b9a6ff', 1],
  ['People', 'Teaching kids, sharing information and solving problems together.', ['Communication', 'Problem solving', 'English', 'Hindi'], '#ffad85', 2],
];
$('#packets').innerHTML = PACKETS.map(([t, d, chips, c, kind], i) => `
  <button class="packet" style="--pc:${c}" aria-label="${esc(t)} seed packet">
    <div class="packet-inner">
      <div class="packet-face packet-front">
        <div class="packet-art">${flowerSVG(['#ff7aa2', '#2a3d31', '#f3ecdf', '#b9a6ff', '#ffd36e', '#ff7aa2'][i], kind, 150)}</div>
        <div class="packet-name"><small>Variety No. 0${i + 1}</small><b>${esc(t)}</b></div>
      </div>
      <div class="packet-face packet-back">
        <h3>${esc(t)}</h3>
        <p>${esc(d)}</p>
        <div class="chips">${chips.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>
        <span class="packet-tip">Plant in a team · water with coffee</span>
      </div>
    </div>
  </button>`).join('');
$$('.packet').forEach((p) => p.addEventListener('click', () => p.classList.toggle('flip')));

// =====================================================================
// Work
// =====================================================================
const ART = {
  mentor: `<svg viewBox="0 0 430 210" preserveAspectRatio="xMidYMid slice">
    <rect width="430" height="210" fill="#1d3226"/>
    <circle cx="215" cy="105" r="120" fill="#ff7aa2" opacity=".12"/>
    <g transform="translate(160 172)"><circle cy="-82" r="22" fill="#ffd3df"/><path d="M-38 0c3-34 18-52 38-52s35 18 38 52z" fill="#ff7aa2"/></g>
    <g transform="translate(270 172)"><circle cy="-82" r="22" fill="#f3ecdf"/><path d="M-38 0c3-34 18-52 38-52s35 18 38 52z" fill="#9fc59a"/></g>
    <path d="M186 122q29-26 58 0" stroke="#ffd36e" stroke-width="4" fill="none" stroke-dasharray="6 8" stroke-linecap="round"/>
    <path d="M215 66c-5-10-19-8-18 4 1 9 18 17 18 17s17-8 18-17c1-12-13-14-18-4z" fill="#ffd36e"/>
  </svg>`,
  mood: `<svg viewBox="0 0 430 210" preserveAspectRatio="xMidYMid slice">
    <rect width="430" height="210" fill="#2a2440"/>
    <g transform="translate(150 105)"><g stroke="#ffd36e" stroke-width="5" stroke-linecap="round">
      ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="-54" x2="0" y2="-70" transform="rotate(${i * 45})"/>`).join('')}</g>
      <circle r="44" fill="#ffd36e"/><circle cx="-14" cy="-6" r="5" fill="#2a2440"/><circle cx="14" cy="-6" r="5" fill="#2a2440"/>
      <path d="M-16 12q16 16 32 0" stroke="#2a2440" stroke-width="4" fill="none" stroke-linecap="round"/></g>
    <g transform="translate(290 118)"><path d="M-62 30a30 30 0 0 1 8-57 40 40 0 0 1 76-8 30 30 0 0 1 40 35 24 24 0 0 1-10 30z" fill="#f3ecdf"/>
      <circle cx="-10" cy="4" r="4" fill="#2a2440"/><circle cx="16" cy="4" r="4" fill="#2a2440"/><path d="M-8 18h22" stroke="#2a2440" stroke-width="4" stroke-linecap="round"/></g>
  </svg>`,
  pirate: `<img src="assets/pirate-den.webp" alt="Rendered 3D pirate den diorama built in Autodesk Maya" loading="lazy">`,
  qubench: `<svg viewBox="0 0 430 210" preserveAspectRatio="xMidYMid slice">
    <rect width="430" height="210" fill="#221f3a"/>
    <circle cx="215" cy="92" r="110" fill="#b9a6ff" opacity=".1"/>
    <path d="M215 36v120M180 160h70" stroke="#f3ecdf" stroke-width="4" stroke-linecap="round"/>
    <path d="M120 62h190" stroke="#f3ecdf" stroke-width="4" stroke-linecap="round"/>
    <path d="M132 62l-26 54h52zM298 62l-26 54h52z" fill="none" stroke="#f3ecdf" stroke-width="2" opacity=".6"/>
    <path d="M100 116a32 10 0 0 0 64 0z" fill="#b9a6ff"/><path d="M266 116a32 10 0 0 0 64 0z" fill="#b9a6ff"/>
    <g fill="#ff7aa2"><circle cx="122" cy="108" r="6"/><circle cx="134" cy="102" r="6"/><circle cx="146" cy="108" r="6"/></g>
    <g transform="translate(298 92)" fill="none" stroke="#ffd36e" stroke-width="2"><circle r="16"/><ellipse rx="16" ry="5"/><path d="M0 0l8-11" stroke-linecap="round"/></g>
    <circle cx="215" cy="32" r="7" fill="#ffd36e"/>
    ${Array.from({ length: 8 }, (_, i) => `<circle cx="${131 + i * 24}" cy="190" r="7" fill="${[1, 4, 6].includes(i) ? '#ff7aa2' : 'rgba(243,236,223,.25)'}"/>`).join('')}
  </svg>`,
  face: (() => {
    const r = rng(7), dots = [];
    for (let y = 40; y <= 172; y += 8) for (let x = 92; x <= 210; x += 8) {
      const dx = (x - 151) / 56, dy = (y - 106) / 70;
      if (dx * dx + dy * dy < 1) dots.push(`<circle cx="${(x + (r() - .5) * 4).toFixed(1)}" cy="${(y + (r() - .5) * 4).toFixed(1)}" r="1.6"/>`);
    }
    return `<svg viewBox="0 0 430 210" preserveAspectRatio="xMidYMid slice">
      <rect width="430" height="210" fill="#13282a"/>
      <g fill="#7fe08a" opacity=".85">${dots.join('')}</g>
      <rect x="133" y="96" width="36" height="26" rx="3" fill="none" stroke="#ffd36e" stroke-width="1.6" stroke-dasharray="4 3"/>
      <circle cx="151" cy="108" r="5" fill="#ff4d4d"/>
      <path d="M176 108 C210 108 228 100 262 96" stroke="#ffd36e" stroke-width="2" fill="none" stroke-dasharray="5 5"/>
      <rect x="262" y="44" width="140" height="96" rx="8" fill="#0d1c1d" stroke="#f3ecdf" stroke-width="2" opacity=".9"/>
      <path d="M318 164h28M332 140v24" stroke="#f3ecdf" stroke-width="3" opacity=".6"/>
      <path d="M344 78l0 26 7-7 5 11 5-2-5-11 10 0z" fill="#f3ecdf" stroke="#13282a" stroke-width="1.5"/>
    </svg>`;
  })(),
};
function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }

const PROJECTS = [
  {
    key: 'qubench', badge: 'Qiskit Fall Fest 2026', title: 'QuBench', meta: 'Team project · Quantum · 2026',
    blurb: 'Quantum-fair jury selection: picks a jury that looks like the community, and checks that the quantum algorithm itself plays fair.',
    points: [
      'Built with a team for IBM Qiskit Fall Fest 2026 (UW Quantum Club)',
      'Turns “pick a jury that looks like the community” into a quantum optimization problem: each juror is one qubit, and the cost measures how far a jury is from the community’s makeup by neighbourhood, age group and gender',
      'Found that standard QAOA quietly favours some equally fair juries over others, up to 3.2× more often on a 12-juror pool',
      'A Grover-mixer QAOA that starts from a Dicke state gives every equally fair jury exactly the same chance, and lands on a fair jury far more often (82% vs 21% on 8 jurors)',
      'A Streamlit app lets a jury administrator with no quantum knowledge load a juror list, draw a jury and get an audit receipt',
      'On a noisy simulation of a real IBM chip, the fair circuit needs about 400 two-qubit gates versus 46, and today’s noise erases its advantage: the algorithm is provably fair, the hardware isn’t ready yet',
    ],
    tags: ['Qiskit', 'Python', 'QAOA', 'Streamlit'],
    demo: 'qubench',
  },
  {
    key: 'face', badge: 'In progress', title: 'Face Control', meta: 'Solo build · Accessibility · 2026',
    blurb: 'Move your computer’s cursor with your head, using only a webcam. Built for people who can’t use a mouse or trackpad.',
    points: [
      'A Python program that moves the cursor with your head, for people who are quadriplegic or otherwise unable to use their hands',
      'Reads webcam frames with OpenCV and uses Google’s MediaPipe face model to find 478 points on the face, following the tip of the nose',
      'Maps a small box in the middle of the camera frame to the whole screen, so a small head movement can reach every edge; PyAutoGUI moves the cursor',
      'Calibrates itself: the screen goes dark and you point your nose at five dots, then mouse control turns on, with no keys to press',
      'Click by closing both eyes for about half a second; a longer close double-clicks, and normal blinks are ignored',
      'Smooths the cursor over the last few frames so it doesn’t jitter',
    ],
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
    demo: 'face',
  },
  {
    key: 'mentor', badge: '~200 users', title: 'Newcomer Mentor-Matching Platform', meta: 'Product lead · 2025',
    blurb: 'A platform connecting newcomers in Calgary with peer mentors, inspired by my own experience navigating a new community.',
    points: [
      'Conceived and led a digital platform connecting newcomers in Calgary with peer mentors, inspired by personal experience navigating a new community',
      'Designed the mentor-matching feature and site content, directing the product from idea to launch',
      'Tested and validated the API integration with Postman to confirm mentor-matching requests returned correct results',
      'Reached an estimated 200 users following recognition through the Power of Voice program',
    ],
    tags: ['React', 'REST APIs', 'Postman'],
    demo: `<div class="demo"><p class="demo-label">Try a sample match</p>
      <div class="match"><select id="matchInterest" aria-label="What would you like help with?">
        <option value="school">Finding my way at school</option><option value="city">Getting around the city</option><option value="friends">Making new friends</option>
      </select><button class="pill pill-solid" id="matchBtn">Match me</button></div>
      <p class="demo-out" id="matchOut">Pick what you'd like help with.</p></div>`,
  },
  {
    key: 'mood', title: 'Mental Health Checker', meta: 'Solo build · 2025',
    blurb: 'An app that helps users keep track of their emotions so they can avoid feeling overwhelmed.',
    points: [
      'Created a mental health checker that helps users keep track of their emotions to avoid feeling overwhelmed',
      'Built the app with HTML/CSS and Python, turning the idea into a working product',
    ],
    tags: ['Python', 'HTML/CSS'],
    demo: `<div class="demo"><p class="demo-label">A tiny check-in</p>
      <div class="mood" id="mood">
        <button data-mood="Glad to hear it. Keep the good streak going." aria-label="Great">😊</button>
        <button data-mood="Steady days count too. Maybe take a short walk." aria-label="Okay">😐</button>
        <button data-mood="That's okay. Take a breath and do one small thing." aria-label="Low">😔</button>
        <button data-mood="Write down just the next step. Nothing more yet." aria-label="Overwhelmed">😩</button>
      </div><p class="demo-out" id="moodOut">How are you today? Tap a face.</p></div>`,
  },
  {
    key: 'pirate', badge: 'Featured', title: 'Pirate Den 3D Environment', meta: 'Autodesk Maya · 3D',
    blurb: 'A 3D model of a pirate den environment, taken from concept to finished model.',
    points: [
      'Designed and built a 3D model of a pirate den environment in Autodesk Maya, taking the scene from concept to finished model',
      'The scene: a stilted house with a ship’s wheel, wooden docks with barrels and cannons, two rowing boats, palm trees and a ring of cliffs around a green cove',
    ],
    tags: ['Autodesk Maya', '3D modelling', 'Rendering'],
    demo: '',
  },
];
$('.feature').dataset.project = PROJECTS.findIndex((p) => p.key === 'pirate');
$('#projects').innerHTML = PROJECTS.map((p, i) => p.key === 'pirate' ? '' : `
  <button class="card" data-project="${i}">
    <div class="card-art">${ART[p.key]}${p.badge ? `<span class="card-badge">${esc(p.badge)}</span>` : ''}</div>
    <div class="card-body">
      <p class="card-meta">${esc(p.meta)}</p>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.blurb)}</p>
      <div class="chips">${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
      <span class="card-open">Open project <b>+</b></span>
    </div>
  </button>`).join('');

// the featured render tilts like a little diorama
const fm = $('#featureMedia');
if (!reduceMotion) {
  fm.addEventListener('pointermove', (e) => {
    const r = fm.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    fm.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    fm.querySelector('img').style.transform = `scale(1.06) translate(${-x * 14}px, ${-y * 10}px)`;
  });
  fm.addEventListener('pointerleave', () => { fm.style.transform = ''; fm.querySelector('img').style.transform = ''; });
}

const sheet = $('#sheet');
function openProject(i) {
  const p = PROJECTS[i];
  $('#sheetBody').innerHTML = `
    <div class="sheet-art">${p.key === 'pirate' ? `<img src="assets/pirate-den.webp" alt="Rendered 3D pirate den diorama built in Autodesk Maya">` : ART[p.key]}</div>
    <p class="eyebrow mono">${esc(p.meta)}</p>
    <h3 id="sheetTitle">${esc(p.title)}</h3>
    <div class="chips">${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
    <ul>${p.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    ${DEMOS[p.demo] || p.demo}`;
  sheet.hidden = false;
  document.body.style.overflow = 'hidden';
  wireDemos();
  $('.sheet-close').focus();
}
function closeSheet() {
  if (sheet.hidden) return;
  sheet.hidden = true;
  document.body.style.overflow = '';
}
document.addEventListener('click', (e) => {
  const c = e.target.closest('[data-project]');
  if (c) openProject(+c.dataset.project);
  if (e.target.closest('[data-close]')) closeSheet();
});
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });

// ----- QuBench: real results + a fair-draw illustration -----
const QB_JURORS = [
  ['J01', 'South', '35-54', 'Man'], ['J02', 'West', '55+', 'Man'], ['J03', 'North', '35-54', 'Woman'], ['J04', 'North', '55+', 'Woman'],
  ['J05', 'East', '18-34', 'Man'], ['J06', 'West', '55+', 'Woman'], ['J07', 'North', '55+', 'Man'], ['J08', 'South', '18-34', 'Woman'],
];
const QB_TARGET = { North: .25, South: .25, East: .25, West: .25, '18-34': .3, '35-54': .35, '55+': .35, Woman: .5, Man: .5 };
// every 3-person jury, scored like QuBench: sum over groups of (picked − target)²
const QB_FAIR = (() => {
  const all = [];
  for (let a = 0; a < 8; a++) for (let b = a + 1; b < 8; b++) for (let c = b + 1; c < 8; c++) {
    const pick = [a, b, c], count = {};
    pick.forEach((i) => QB_JURORS[i].slice(1).forEach((g) => (count[g] = (count[g] || 0) + 1)));
    const cost = Object.entries(QB_TARGET).reduce((s, [g, share]) => s + ((count[g] || 0) - share * 3) ** 2, 0);
    all.push({ pick, cost: Math.round(cost * 1000) / 1000 });
  }
  const best = Math.min(...all.map((j) => j.cost));
  return all.filter((j) => j.cost === best);
})();
function qbChart() {
  const groups = [['8 jurors, choose 3', 21, 82, '1.26×', '1.00×'], ['12 jurors, choose 4', 4, 15, '3.17×', '1.00×']];
  const H = 150, top = 20, x0 = 44;
  let g = `<line x1="${x0}" y1="${top + H}" x2="420" y2="${top + H}" stroke="rgba(243,236,223,.3)"/>`;
  [0, 50, 100].forEach((v) => {
    const y = top + H - v / 100 * H;
    g += `<line x1="${x0}" y1="${y}" x2="420" y2="${y}" stroke="rgba(243,236,223,.08)"/><text x="${x0 - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="#a9b3a5">${v}%</text>`;
  });
  groups.forEach(([label, std, fair, fs, ff], i) => {
    const cx = 130 + i * 180;
    [[std, '#ffd36e', fs, -34], [fair, '#ff7aa2', ff, 4]].forEach(([v, c, fav, dx]) => {
      const h = v / 100 * H;
      g += `<rect x="${cx + dx}" y="${top + H - h}" width="30" height="${h}" rx="4" fill="${c}"/>`;
      g += `<text x="${cx + dx + 15}" y="${top + H - h - 6}" text-anchor="middle" font-size="12" font-weight="600" fill="#f3ecdf">${v}%</text>`;
      g += `<text x="${cx + dx + 15}" y="${top + H + 34}" text-anchor="middle" font-size="11" fill="${c}">${fav}</text>`;
    });
    g += `<text x="${cx}" y="${top + H + 18}" text-anchor="middle" font-size="12" fill="#a9b3a5">${label}</text>`;
  });
  return `<svg viewBox="0 0 430 220" role="img" aria-label="Fair QAOA lands on a fair jury 82% of the time versus 21% for standard QAOA with 8 jurors, and 15% versus 4% with 12 jurors. Favouritism is 1.00 times for fair QAOA versus 1.26 and 3.17 times for standard.">${g}</svg>`;
}
const DEMOS = {
  qubench: `<div class="demo">
      <p class="demo-label">Results · ideal simulator, 3 QAOA layers</p>
      <div class="qb-legend"><span><i style="background:#ffd36e"></i>Standard QAOA</span><span><i style="background:#ff7aa2"></i>Fair QAOA (Grover mixer)</span></div>
      ${qbChart()}
      <p class="demo-note">Bars: how often it lands on a fair jury. Below: favouritism, most-picked ÷ least-picked fair jury (1.00× is perfectly even).</p>
    </div>
    <div class="demo" style="margin-top:16px">
      <p class="demo-label">Try it · 8 sample jurors, choose 3</p>
      <div class="jurors" id="jurors">${QB_JURORS.map(([id, n, a, g], i) => `<span class="juror" data-j="${i}"><b>${id}</b>${n} · ${a} · ${g}</span>`).join('')}</div>
      <div class="match" style="margin-top:14px"><button class="pill pill-solid" id="drawJury">Draw a jury</button><button class="pill" id="drawMany">Draw 500 times</button></div>
      <p class="demo-out" id="juryOut">${QB_FAIR.length} juries tie for most balanced. A fair draw should give each one the same chance.</p>
      <div class="tally" id="tally"></div>
      <p class="demo-note">This picks at random in your browser to show what the Grover-mixer circuit guarantees; it doesn't run the quantum circuit.</p>
    </div>`,
  face: `<div class="demo">
      <p class="demo-label">How the mapping works · move your pointer in the camera</p>
      <div class="fc">
        <div class="fc-cam" id="fcCam"><span class="fc-box" id="fcBox"></span><i class="fc-nose" id="fcNose"></i><small>camera</small></div>
        <div class="fc-screen"><i class="fc-cursor" id="fcCursor">➤</i><small>screen</small></div>
      </div>
      <p class="demo-note">Your pointer stands in for the tip of your nose. Moving inside the small dashed box sweeps the cursor across the whole screen, which is why a small head turn is enough.</p>
    </div>`,
};
const tallyCounts = new Array(QB_FAIR.length).fill(0);
function drawJury(n = 1) {
  let last;
  for (let i = 0; i < n; i++) { last = Math.floor(Math.random() * QB_FAIR.length); tallyCounts[last]++; }
  const pick = QB_FAIR[last].pick;
  $$('#jurors .juror').forEach((el) => el.classList.toggle('on', pick.includes(+el.dataset.j)));
  const total = tallyCounts.reduce((a, b) => a + b, 0), max = Math.max(...tallyCounts);
  $('#juryOut').textContent = `Picked ${pick.map((i) => QB_JURORS[i][0]).join(', ')}: fair jury ${last + 1} of ${QB_FAIR.length}. ${total} draws so far.`;
  $('#tally').innerHTML = tallyCounts.map((c, i) => `<div><span>Jury ${i + 1}</span><i style="width:${(c / max) * 100}%"></i><b>${Math.round((c / total) * 100)}%</b></div>`).join('');
}

const MATCHES = {
  school: 'Matched with a university student who has taken the same courses and can share study tips. (Sample)',
  city: 'Matched with a mentor who knows the transit routes, libraries and community centres nearby. (Sample)',
  friends: 'Matched with a mentor who runs a weekend youth club and can introduce you around. (Sample)',
};
function wireDemos() {
  $('#drawJury')?.addEventListener('click', () => drawJury(1));
  $('#drawMany')?.addEventListener('click', () => drawJury(500));
  const cam = $('#fcCam');
  if (cam) {
    const move = (e) => {
      const r = cam.getBoundingClientRect(), b = $('#fcBox').getBoundingClientRect();
      const nx = clamp((e.clientX - r.left) / r.width, 0, 1), ny = clamp((e.clientY - r.top) / r.height, 0, 1);
      $('#fcNose').style.left = nx * 100 + '%';
      $('#fcNose').style.top = ny * 100 + '%';
      const sx = clamp((e.clientX - b.left) / b.width, 0, 1), sy = clamp((e.clientY - b.top) / b.height, 0, 1);
      $('#fcCursor').style.left = sx * 100 + '%';
      $('#fcCursor').style.top = sy * 100 + '%';
    };
    cam.addEventListener('pointermove', move);
    cam.addEventListener('pointerdown', move);
  }
  $('#matchBtn')?.addEventListener('click', () => {
    const out = $('#matchOut');
    out.textContent = 'Looking for a good match…';
    setTimeout(() => (out.textContent = MATCHES[$('#matchInterest').value]), 550);
  });
  $$('#mood button').forEach((b) => b.addEventListener('click', () => {
    $$('#mood button').forEach((x) => x.classList.toggle('on', x === b));
    $('#moodOut').textContent = b.dataset.mood;
  }));
}

// =====================================================================
// Play: Sum Sprint — every right answer adds a petal
// =====================================================================
const sprint = (() => {
  const DURATION = 45;
  const LEVELS = [
    { at: 0, name: 'seedling' }, { at: 5, name: 'sprout' }, { at: 10, name: 'times tables' },
    { at: 16, name: 'two digits' }, { at: 24, name: 'full bloom' },
  ];
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  let st = null, raf = 0, best = +(store.get('sv-sprint-best') || 0);
  const el = { score: $('#sScore'), streak: $('#sStreak'), solved: $('#sSolved'), best: $('#sBest'), time: $('#sTime'), level: $('#sLevel'), q: $('#sQ'), a: $('#sA'), input: $('#sInput'), flash: $('#sFlash'), overlay: $('#sOverlay') };
  el.best.textContent = best;

  const FLOWER_COLORS = ['#ff7aa2', '#ffd36e', '#b9a6ff', '#ffad85', '#8fd0e8'];
  $('#sFlower').innerHTML = `<svg viewBox="0 0 180 230">
    <path d="M90 230 C86 190 96 150 90 96" stroke="#5d8a5a" stroke-width="5" fill="none"/>
    <path d="M90 180 C64 178 50 160 46 140 C70 142 86 158 90 180Z" fill="#7fae79"/>
    <path d="M91 150 C116 148 130 130 134 110 C110 112 95 128 91 150Z" fill="#6c9468"/>
    <g id="sPetals">${Array.from({ length: 12 }, (_, i) => `<path class="p" d="M90 80 C78 68 80 36 90 28 C100 36 102 68 90 80Z" style="--r:${i * 30}deg"/>`).join('')}</g>
    <circle cx="90" cy="80" r="15" fill="#fff3c9"/><circle cx="90" cy="80" r="15" fill="none" stroke="#e0c46e" stroke-dasharray="2 3"/>
  </svg>`;
  const petalsEl = $$('#sPetals .p');
  function paintFlower() {
    const blooms = Math.floor(st.solved / 12), n = st.solved % 12;
    const col = FLOWER_COLORS[blooms % FLOWER_COLORS.length];
    petalsEl.forEach((p, i) => { p.setAttribute('fill', col); p.classList.toggle('on', i < n || (st.solved > 0 && n === 0)); });
  }

  $('#keypad').innerHTML = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'skip']
    .map((k) => `<button class="key${k.length > 1 ? ' k-alt' : ''}" data-k="${k}">${k === 'clear' ? '⌫' : k === 'skip' ? 'Skip' : k}</button>`).join('');

  const levelIdx = () => LEVELS.reduce((acc, l, i) => (st.solved >= l.at ? i : acc), 0);
  const mult = () => Math.min(5, 1 + Math.floor(st.streak / 3));

  function make() {
    const L = levelIdx();
    let a, b, op, ans;
    const pick = L === 4 ? R(0, 3) : L;
    if (pick === 0) { a = R(2, 12); b = R(2, 12); op = '+'; ans = a + b; }
    else if (pick === 1) { if (Math.random() < .5) { a = R(12, 40); b = R(2, a - 2); op = '−'; ans = a - b; } else { a = R(11, 39); b = R(5, 25); op = '+'; ans = a + b; } }
    else if (pick === 2) { a = R(2, 9); b = R(2, 9); op = '×'; ans = a * b; }
    else if (Math.random() < .5) { a = R(6, 15); b = R(3, 9); op = '×'; ans = a * b; }
    else { a = R(40, 99); b = R(11, a - 5); op = '−'; ans = a - b; }
    st.q = { text: `${a} ${op} ${b}`, ans: String(ans) };
    st.typed = '';
    el.q.textContent = st.q.text;
    el.input.textContent = '?';
    el.level.textContent = `Level ${L + 1} · ${LEVELS[L].name}`;
  }
  function hud() {
    el.score.textContent = st.score;
    el.streak.textContent = '×' + mult();
    el.solved.textContent = st.solved;
    paintFlower();
  }
  function mark(cls, msg) {
    el.a.classList.remove('good', 'bad');
    void el.a.offsetWidth;
    el.a.classList.add(cls);
    el.flash.textContent = msg;
    el.flash.style.color = cls === 'good' ? 'var(--sage)' : '#ff6b6b';
  }
  function press(k) {
    if (!st?.running) return;
    if (k === 'clear') { st.typed = st.typed.slice(0, -1); el.input.textContent = st.typed || '?'; return; }
    if (k === 'skip') { st.streak = 0; hud(); mark('bad', `Skipped · it was ${st.q.ans}`); make(); return; }
    if (st.typed.length >= 4) return;
    st.typed += k;
    el.input.textContent = st.typed;
    if (st.typed === st.q.ans) {
      st.streak++; st.solved++;
      const pts = (levelIdx() + 1) * 5 * mult();
      st.score += pts;
      hud();
      mark('good', `+${pts}${mult() > 1 ? ` · streak ×${mult()}` : ''}`);
      setTimeout(make, 140);
    } else if (st.typed.length >= st.q.ans.length) {
      st.streak = 0; st.end -= 2000;
      hud();
      mark('bad', `−2s · it was ${st.q.ans}`);
      setTimeout(make, 380);
    }
  }
  function loop() {
    const left = Math.max(0, st.end - performance.now());
    el.time.style.transform = `scaleX(${left / (DURATION * 1000)})`;
    el.time.parentElement.classList.toggle('low', left < 8000);
    if (left <= 0) return finish();
    raf = requestAnimationFrame(loop);
  }
  function start() {
    st = { running: true, score: 0, streak: 0, solved: 0, end: performance.now() + DURATION * 1000 };
    hud(); make();
    el.flash.textContent = ' ';
    el.overlay.hidden = true;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }
  function finish() {
    st.running = false;
    el.time.parentElement.classList.remove('low');
    const newBest = st.score > best;
    if (newBest) { best = st.score; store.set('sv-sprint-best', best); el.best.textContent = best; }
    const blooms = Math.floor(st.solved / 12);
    const rank = st.score >= 600 ? 'Full bloom' : st.score >= 300 ? 'Blossoming' : st.score >= 100 ? 'Budding' : 'Seedling';
    $('#sTag').textContent = newBest ? 'Time! · New best' : 'Time!';
    $('#sTitle').innerHTML = `<em>${rank}</em>`;
    $('#sSub').textContent = `You solved ${st.solved} in ${DURATION} seconds${blooms ? ` and grew ${blooms} full flower${blooms > 1 ? 's' : ''}` : ''}. Score ${st.score}, best ${best}.`;
    $('#sStart').textContent = 'Grow another';
    el.overlay.hidden = false;
  }
  $('#sStart').addEventListener('click', start);
  $('#keypad').addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b) press(b.dataset.k); });
  addEventListener('keydown', (e) => {
    if (!st?.running || e.target.closest?.('input, textarea, select')) return;
    let k = null;
    if (/^[0-9]$/.test(e.key)) k = e.key;
    else if (e.key === 'Backspace') k = 'clear';
    else if (e.key === 'Enter' || e.key === 'Tab') k = 'skip';
    if (!k) return;
    e.preventDefault();
    press(k);
    const btn = $(`#keypad [data-k="${k}"]`);
    btn?.classList.add('down');
    setTimeout(() => btn?.classList.remove('down'), 110);
  });
  return { running: () => !!st?.running, stop() { if (st?.running) { cancelAnimationFrame(raf); finish(); } } };
})();

// =====================================================================
// Scroll-driven bits
// =====================================================================
const topbar = $('#topbar');
function onScroll() {
  topbar.classList.toggle('solid', scrollY > 40);
  growVine();
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

const counted = new WeakSet();
const countIO = new IntersectionObserver((entries) => entries.forEach((en) => {
  const c = en.target;
  if (!en.isIntersecting || counted.has(c) || reduceMotion) return;
  counted.add(c);
  const to = +c.dataset.to, pre = c.dataset.prefix || '', suf = c.dataset.suffix || '';
  const t0 = performance.now();
  const tick = (t) => {
    const k = Math.min(1, (t - t0) / 1300);
    c.textContent = pre + Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString() + suf;
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}), { threshold: .6 });
$$('.count').forEach((c) => countIO.observe(c));

if (!reduceMotion) {
  const revIO = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); revIO.unobserve(en.target); }
  }), { threshold: .12 });
  $$('.title, .specimen, .about-copy p, .stats, .season, .packet, .feature, .card, .sprint, .post-grid, .contact-row').forEach((n) => {
    if (n.getBoundingClientRect().top > innerHeight) { n.classList.add('reveal'); revIO.observe(n); }
  });
}

// ---------- contact ----------
$('#copyEmail').addEventListener('click', async () => {
  const btn = $('#copyEmail');
  try {
    await navigator.clipboard.writeText('s2vadlam@uwaterloo.ca');
    btn.textContent = 'Copied ✓';
  } catch {
    getSelection().selectAllChildren($('#emailText'));
    btn.textContent = 'Selected';
  }
  setTimeout(() => (btn.textContent = 'Copy email'), 1800);
});

// ---------- petals on click ----------
document.addEventListener('pointerdown', (e) => {
  if (reduceMotion || !introDone || e.target.closest('input, textarea, select, #keypad, #nameKeys')) return;
  petalBurst($('#burst'), e.clientX, e.clientY, 10, 70, .7);
});

// =====================================================================
// Journal (blog) — posts live in the artifact's database; only the owner can write
// =====================================================================
const blog = { mode: 'loading', owner: false, posts: [], loaded: false, db: null, editingId: null, loadError: null };
const LOCAL_KEY = 'sv-posts-preview';
const isLocalHost = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);

const fmtDate = (iso, opts = { year: 'numeric', month: 'long', day: 'numeric' }) => {
  const d = new Date(iso);
  return isNaN(d) ? '' : d.toLocaleDateString('en-CA', opts);
};
const plain = (md) => String(md || '').replace(/[#>*_`\[\]()-]/g, ' ').replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim();
const excerpt = (md, n = 160) => { const t = plain(md); return t.length > n ? t.slice(0, n).replace(/\s\S*$/, '') + '…' : t; };
const readMins = (md) => Math.max(1, Math.round(plain(md).split(' ').length / 200));

function inline(s) {
  return s
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}
function renderMarkdown(md) {
  return esc(md).split(/\n\s*\n/).map((block) => {
    const b = block.trim();
    if (!b) return '';
    if (b.startsWith('### ')) return `<h3>${inline(b.slice(4))}</h3>`;
    if (b.startsWith('## ')) return `<h3>${inline(b.slice(3))}</h3>`;
    if (b.startsWith('# ')) return `<h2>${inline(b.slice(2))}</h2>`;
    const lines = b.split('\n');
    if (lines.every((l) => /^\s*[-*] /.test(l))) return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^\s*[-*] /, ''))}</li>`).join('')}</ul>`;
    if (lines.every((l) => l.startsWith('&gt; '))) return `<blockquote>${inline(lines.map((l) => l.slice(5)).join('<br>'))}</blockquote>`;
    return `<p>${inline(lines.join('<br>'))}</p>`;
  }).join('');
}
const tagsHTML = (tags) => (tags?.length ? `<div class="post-tags">${tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : '');

function emptyState() {
  if (!blog.loaded && blog.mode !== 'none') return `<div class="empty"><strong>Loading posts…</strong>One moment.</div>`;
  if (blog.mode === 'none') return `<div class="empty"><strong>No entries here yet</strong>Posts show up on the published version of this site.</div>`;
  if (blog.loadError) return `<div class="empty"><strong>Posts can't be reached</strong>${esc(blog.loadError)}</div>`;
  return blog.owner
    ? `<div class="empty"><strong>Your journal is ready</strong>Open the journal and press “New post” to write your first entry.</div>`
    : `<div class="empty"><strong>Nothing has bloomed yet</strong>The first entry is on its way.</div>`;
}

function renderPosts() {
  const latest = blog.posts.slice(0, 3);
  $('#latestPosts').innerHTML = latest.length ? latest.map((p) => `
    <button class="post-card" data-post="${esc(p.id)}">
      <span class="post-meta">${fmtDate(p.createdAt)} · ${readMins(p.body)} min read</span>
      <h3>${esc(p.title)}</h3>
      <p>${esc(excerpt(p.body, 130))}</p>
      ${tagsHTML(p.tags)}
    </button>`).join('') : emptyState();

  $('#postList').innerHTML = blog.posts.length ? blog.posts.map((p) => `
    <button class="post-card" data-post="${esc(p.id)}">
      <span class="post-date-badge"><b>${fmtDate(p.createdAt, { day: 'numeric' })}</b><span>${fmtDate(p.createdAt, { month: 'short' }).toUpperCase()} ${fmtDate(p.createdAt, { year: 'numeric' })}</span></span>
      <div>
        <span class="post-meta">${readMins(p.body)} min read</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(excerpt(p.body))}</p>
        ${tagsHTML(p.tags)}
      </div>
    </button>`).join('') : emptyState();

  $('#newPostBtn').hidden = !blog.owner || !editor.hidden;
  if (current.view === 'post') renderPost(current.id);
}

function renderPost(id) {
  const p = blog.posts.find((x) => x.id === id);
  const box = $('#postFull');
  if (!p) {
    box.innerHTML = blog.loaded || blog.mode === 'none'
      ? `<div class="empty"><strong>This post isn't here</strong>It may have been removed.</div>`
      : `<div class="empty"><strong>Loading post…</strong></div>`;
    return;
  }
  box.innerHTML = `
    <div class="post-full">
      <p class="post-meta">${fmtDate(p.createdAt)} · ${readMins(p.body)} min read${p.updatedAt && p.updatedAt !== p.createdAt ? ' · edited' : ''}</p>
      <h1>${esc(p.title)}</h1>
      ${tagsHTML(p.tags)}
      ${blog.owner ? `<div class="post-owner" id="postOwner">
        <button class="pill" data-edit="${esc(p.id)}">Edit</button>
        <button class="pill" data-askdelete>Delete</button>
      </div>` : '<div style="height:28px"></div>'}
      <div class="post-body">${renderMarkdown(p.body)}</div>
      <p class="post-divider">✿ ✿ ✿</p>
      <button class="pill" data-nav="blog">← More posts</button>
    </div>`;
}

$('#postFull').addEventListener('click', async (e) => {
  const edit = e.target.closest('[data-edit]');
  if (edit) { show('blog'); openEditor(blog.posts.find((p) => p.id === edit.dataset.edit)); return; }
  if (e.target.closest('[data-askdelete]')) {
    $('#postOwner').innerHTML = `<span>Delete this post for good?</span>
      <button class="pill pill-danger" data-confirmdelete>Yes, delete</button>
      <button class="pill" data-canceldelete>Keep it</button>`;
    return;
  }
  if (e.target.closest('[data-canceldelete]')) { renderPost(current.id); return; }
  if (e.target.closest('[data-confirmdelete]')) {
    try {
      await removePost(current.id);
      show('blog');
    } catch (err) {
      $('#postOwner').innerHTML = `<span class="editor-status">Couldn't delete: ${esc(err?.message || 'try again')}</span>`;
    }
  }
});

document.addEventListener('click', (e) => {
  const card = e.target.closest('[data-post]');
  if (card) show('post', { id: card.dataset.post });
});

// ----- editor -----
const editor = $('#editor');
function openEditor(post) {
  blog.editingId = post?.id || null;
  $('#editorMode').textContent = post ? 'Edit post' : 'New post';
  $('#savePost').textContent = post ? 'Save changes' : 'Publish post';
  $('#postTitle').value = post?.title || store.get('sv-draft-title') || '';
  $('#postTags').value = post ? (post.tags || []).join(', ') : store.get('sv-draft-tags') || '';
  $('#postBody').value = post?.body || store.get('sv-draft-body') || '';
  $('#editorStatus').textContent = '';
  $('#previewBox').hidden = true;
  $('#previewBtn').textContent = 'Preview';
  editor.hidden = false;
  $('#newPostBtn').hidden = true;
  setTimeout(() => $('#postTitle').focus(), 50);
}
function closeEditor() {
  editor.hidden = true;
  blog.editingId = null;
  $('#newPostBtn').hidden = !blog.owner;
}
function renderPreview() {
  $('#previewBox').innerHTML = `<h2 style="margin:0 0 12px;font-family:var(--serif);font-weight:400;font-size:44px;line-height:1">${esc($('#postTitle').value || 'Untitled')}</h2>` + renderMarkdown($('#postBody').value);
}
$('#newPostBtn').addEventListener('click', () => openEditor(null));
$('#cancelEdit').addEventListener('click', closeEditor);
$('#previewBtn').addEventListener('click', () => {
  const box = $('#previewBox');
  box.hidden = !box.hidden;
  $('#previewBtn').textContent = box.hidden ? 'Preview' : 'Hide preview';
  if (!box.hidden) renderPreview();
});
['postTitle', 'postTags', 'postBody'].forEach((id) => $('#' + id).addEventListener('input', () => {
  if (!blog.editingId) store.set('sv-draft-' + id.replace('post', '').toLowerCase(), $('#' + id).value);
  if (!$('#previewBox').hidden) renderPreview();
}));

editor.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = $('#postTitle').value.trim(), body = $('#postBody').value.trim();
  if (!title || !body) { $('#editorStatus').textContent = 'Add a title and some writing first.'; return; }
  const tags = $('#postTags').value.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 6);
  const now = new Date().toISOString();
  const btn = $('#savePost');
  btn.disabled = true;
  $('#editorStatus').textContent = 'Saving…';
  try {
    const existing = blog.posts.find((p) => p.id === blog.editingId);
    const id = await savePost(blog.editingId, { title, body, tags, createdAt: existing?.createdAt || now, updatedAt: now });
    if (!blog.editingId) ['title', 'tags', 'body'].forEach((k) => store.set('sv-draft-' + k, ''));
    closeEditor();
    show('post', { id });
  } catch (err) {
    $('#editorStatus').textContent = err?.code === 'quota_exceeded'
      ? 'The journal is full. Delete an old post to make room.'
      : `Couldn't save: ${err?.message || 'please try again.'}`;
  } finally {
    btn.disabled = false;
  }
});

// ----- storage backends -----
async function savePost(id, data) {
  if (blog.mode === 'db') {
    const ref = id ? blog.db.doc('posts/' + id) : blog.db.collection('posts').doc();
    await ref.set(data);
    return ref.id;
  }
  if (blog.mode === 'local') {
    const all = readLocal();
    const pid = id || 'p' + Date.now().toString(36);
    const i = all.findIndex((p) => p.id === pid);
    i >= 0 ? (all[i] = { id: pid, ...data }) : all.push({ id: pid, ...data });
    writeLocal(all);
    return pid;
  }
  throw new Error('Posting is only available on the published site.');
}
async function removePost(id) {
  if (blog.mode === 'db') return blog.db.doc('posts/' + id).delete();
  if (blog.mode === 'local') return writeLocal(readLocal().filter((p) => p.id !== id));
}
function readLocal() { try { return JSON.parse(store.get(LOCAL_KEY) || '[]'); } catch { return []; } }
function writeLocal(all) { store.set(LOCAL_KEY, JSON.stringify(all)); setPosts(all); }
function setPosts(list) {
  blog.posts = [...list].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  blog.loaded = true;
  renderPosts();
}

async function initBlog() {
  let db = null, user = null;
  if (window.claude?.use) [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
  if (db) {
    blog.mode = 'db';
    blog.db = db;
    blog.owner = user ? !!(await user.isOwner()) : false;
    renderPosts();
    const timer = setTimeout(() => {
      if (!blog.loaded) { blog.loadError = 'Check your connection and reload the page.'; blog.loaded = true; renderPosts(); }
    }, 10000);
    db.collection('posts').onSnapshot((snap) => {
      if (!snap.metadata.fromCache) clearTimeout(timer);
      blog.loadError = null;
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }, (err) => {
      clearTimeout(timer);
      blog.loadError = err.code === 'revoked' ? 'Access to the posts changed.' : 'Reload the page to try again.';
      blog.loaded = true;
      renderPosts();
    });
  } else if (isLocalHost) {
    // local preview: posts are saved in this browser only, so the editor can be tried out
    blog.mode = 'local';
    blog.owner = true;
    $('#blogIntro').textContent = 'Local preview: posts you write here are saved only in this browser.';
    setPosts(readLocal());
  } else {
    blog.mode = 'none';
    renderPosts();
  }
}

// =====================================================================
// Views + navigation
// =====================================================================
const SECTIONS = ['about', 'experience', 'toolkit', 'work', 'play', 'latest', 'contact'];
const current = { view: 'home', id: null };

function show(view, { id = null, section = null } = {}) {
  if (view !== 'home') sprint.stop();
  closeSheet();
  current.view = view; current.id = id;
  $('#homeView').hidden = view !== 'home';
  $('#blogView').hidden = view !== 'blog';
  $('#postView').hidden = view !== 'post';
  if (view !== 'blog') closeEditor();
  if (view === 'post') renderPost(id);

  const hash = view === 'blog' ? '#blog' : view === 'post' ? '#post-' + id : section ? '#' + section : '';
  try { history.replaceState(null, '', hash || location.pathname); } catch { /* sandboxed */ }

  if (view === 'home') {
    if (section) requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }));
    else scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  } else scrollTo({ top: 0, behavior: 'auto' });
  setActive(view === 'home' ? section : 'blog');
  $('#mainNav').classList.remove('open');
  $('#menuBtn').setAttribute('aria-expanded', 'false');
}
function setActive(name) {
  $$('.mainnav button').forEach((b) => b.classList.toggle('active', b.dataset.nav === (name === 'latest' ? 'blog' : name)));
}
document.addEventListener('click', (e) => {
  const n = e.target.closest('[data-nav]');
  if (!n) return;
  const t = n.dataset.nav;
  if (t === 'blog') show('blog');
  else if (t === 'home') show('home');
  else show('home', { section: t });
});
$('#menuBtn').addEventListener('click', () => {
  const open = $('#mainNav').classList.toggle('open');
  $('#menuBtn').setAttribute('aria-expanded', open);
});
const secIO = new IntersectionObserver((entries) => {
  if (current.view !== 'home') return;
  entries.forEach((en) => en.isIntersecting && setActive(en.target.id));
}, { rootMargin: '-45% 0px -50% 0px' });
['home', ...SECTIONS].forEach((id) => secIO.observe(document.getElementById(id)));

(function route() {
  const h = location.hash.slice(1);
  if (h === 'blog') { finishIntro(); show('blog'); }
  else if (h.startsWith('post-')) { finishIntro(); show('post', { id: h.slice(5) }); }
  else if (SECTIONS.includes(h)) {
    finishIntro();
    show('home', { section: h });
    setTimeout(() => document.getElementById(h).scrollIntoView(), 400);
  }
})();

initBlog();
