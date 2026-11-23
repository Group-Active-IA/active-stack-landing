import { content } from '../i18n/content.js';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const path = (obj, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), obj);
const getLang = () => (document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es');

/* Idioma y tema */
function applyLang(lang) {
  document.documentElement.setAttribute('lang', lang);
  const dict = content[lang];
  $$('[data-i18n]').forEach((el) => {
    const v = path(dict, el.getAttribute('data-i18n'));
    if (typeof v === 'string') el.textContent = v;
  });
  $$('[data-i18n-title]').forEach((el) => {
    const v = path(dict, el.getAttribute('data-i18n-title'));
    if (typeof v === 'string') {
      el.setAttribute('title', v);
      el.setAttribute('aria-label', v);
    }
  });
  document.title = dict.meta.title;
  const btn = $('#lang-toggle');
  if (btn) btn.textContent = lang.toUpperCase();
  try { localStorage.setItem('as-lang', lang); } catch (e) {}
  placeThumb();
}
$('#lang-toggle')?.addEventListener('click', () => applyLang(getLang() === 'es' ? 'en' : 'es'));
$('#theme-toggle')?.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('as-theme', next); } catch (e) {}
});

/* Aparición al hacer scroll */
const rvObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        e.target.closest('.tile')?.classList.add('vis');
        rvObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
$$('.rv').forEach((el) => rvObserver.observe(el));
$$('.tile').forEach((t) => {
  new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { t.classList.add('vis'); o.disconnect(); } }), { threshold: 0.3 }).observe(t);
  t.addEventListener('pointermove', (ev) => {
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', ev.clientX - r.left + 'px');
    t.style.setProperty('--my', ev.clientY - r.top + 'px');
  });
});

/* Terminal animada */
const script = [
  ['p', 'active-stack install'],
  ['d', 'agentes detectados: claude, codex, opencode'],
  ['k', 'respaldo de configuración creado'],
  ['k', 'harness engram (memoria)'],
  ['k', 'harness openspec + sdd-orchestrator'],
  ['k', 'harness permissions (main protegido)'],
  ['k', 'harness active-orchestrator (fundación)'],
  ['k', 'harness engram-cloud (memoria de equipo)'],
  ['d', 'verify: 0 avisos'],
  ['p', 'listo. abrí tu agente y escribí qué querés construir'],
];
const term = $('#term');
let termTimer;
function drawTerm() {
  if (!term) return;
  term.innerHTML = '';
  let i = 0;
  const next = () => {
    if (i >= script.length) {
      termTimer = setTimeout(drawTerm, 4200);
      return;
    }
    const [kind, text] = script[i++];
    const line = document.createElement('div');
    line.className = 't-line';
    const mark = document.createElement('span');
    mark.className = kind === 'p' ? 't-prompt' : kind === 'k' ? 't-ok' : 't-dim';
    mark.textContent = kind === 'p' ? '$' : kind === 'k' ? 'ok' : '--';
    const body = document.createElement('span');
    body.className = kind === 'd' ? 't-dim' : '';
    line.append(mark, body);
    term.append(line);
    requestAnimationFrame(() => line.classList.add('on'));
    let c = 0;
    const speed = kind === 'p' ? 28 : 11;
    const type = () => {
      body.textContent = text.slice(0, ++c);
      if (c < text.length) termTimer = setTimeout(type, reduce ? 0 : speed);
      else termTimer = setTimeout(next, reduce ? 0 : kind === 'p' ? 420 : 170);
    };
    type();
  };
  next();
}
if (term) {
  const caret = document.createElement('span');
  caret.className = 'caret';
  new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !term.dataset.started) { term.dataset.started = '1'; drawTerm(); } })).observe(term);
}

/* Modos de instalación */
$$('.mode-tab').forEach((tab) =>
  tab.addEventListener('click', () => {
    $$('.mode-tab').forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
    $$('.mode-panel').forEach((p) => p.classList.toggle('on', p.dataset.modePanel === tab.dataset.mode));
  })
);

/* Fundación: paso activo según el scroll */
const steps = $$('.step');
const nEl = $('#found-n');
const stepsBox = $('#steps');
if (steps.length) {
  const io = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const idx = steps.indexOf(e.target);
        steps.forEach((s, i) => s.classList.toggle('is-active', i === idx));
        if (nEl) nEl.textContent = String(idx + 1).padStart(2, '0');
        stepsBox?.style.setProperty('--p', String((idx + 1) / steps.length));
      });
    },
    { rootMargin: '-42% 0px -42% 0px' }
  );
  steps.forEach((s) => io.observe(s));
}

/* ODD / SDD */
const seg = $('#seg');
const thumb = $('#seg-thumb');
function placeThumb() {
  if (!seg || !thumb) return;
  const cur = $('button[aria-selected="true"]', seg);
  if (!cur) return;
  thumb.style.width = cur.offsetWidth + 'px';
  thumb.style.transform = `translateX(${cur.offsetLeft - 5}px)`;
}
$$('button', seg || document).forEach((b) =>
  b.addEventListener('click', () => {
    if (!b.dataset.sdd) return;
    $$('button[data-sdd]').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    $$('.sdd-body').forEach((p) => p.classList.toggle('on', p.dataset.sddPanel === b.dataset.sdd));
    placeThumb();
  })
);
window.addEventListener('resize', placeThumb);
document.fonts?.ready.then(placeThumb);
placeThumb();

/* Ciclo OPSX: avanza solo y se puede elegir */
const cyc = $$('.cyc');
const fill = $('#cycle-fill');
let cur = 0;
let auto;
function setCycle(i) {
  cur = i;
  cyc.forEach((c, k) => {
    c.classList.toggle('is-active', k === i);
    c.classList.toggle('is-done', k < i);
  });
  if (fill) fill.style.width = (i / (cyc.length - 1)) * 80 + '%';
}
function startAuto() {
  clearInterval(auto);
  if (reduce) return;
  auto = setInterval(() => setCycle((cur + 1) % cyc.length), 2400);
}
if (cyc.length) {
  setCycle(0);
  cyc.forEach((c, k) => c.addEventListener('click', () => { setCycle(k); startAuto(); }));
  new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? startAuto() : clearInterval(auto)))).observe($('#cycle'));
}

/* Descarga: pestañas y copiar */
$$('[data-dl]').forEach((b) =>
  b.addEventListener('click', () => {
    $$('[data-dl]').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    $$('.dl-panel').forEach((p) => p.classList.toggle('on', p.dataset.dlPanel === b.dataset.dl));
  })
);
$$('.copy').forEach((btn) =>
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copy);
    try { await navigator.clipboard.writeText(target?.textContent || ''); } catch (e) { return; }
    btn.textContent = content[getLang()].download.copied;
    clearTimeout(btn._t);
    btn._t = setTimeout(() => (btn.textContent = content[getLang()].download.copy), 1600);
  })
);

/* Navegación: sección actual */
const links = $$('.nav a');
const secs = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const navIo = new IntersectionObserver(
  (es) => es.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id));
  }),
  { rootMargin: '-45% 0px -50% 0px' }
);
secs.forEach((s) => navIo.observe(s));

applyLang(getLang());
