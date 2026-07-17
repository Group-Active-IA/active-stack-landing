import { content } from '../i18n/content.js';

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function applyLang(lang) {
  document.documentElement.setAttribute('lang', lang);
  const dict = content[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = getByPath(dict, el.getAttribute('data-i18n'));
    if (typeof value === 'string') el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const value = getByPath(dict, el.getAttribute('data-i18n-title'));
    if (typeof value === 'string') el.setAttribute('title', value);
  });
  document.querySelectorAll('[data-copy-label]').forEach((el) => {
    el.textContent = dict.copy.copy;
  });
  localStorage.setItem('as-lang', lang);
}

function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es';
    applyLang(current === 'es' ? 'en' : 'es');
  });
  applyLang(document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es');
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('as-theme', next);
  });
}

function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    const targetId = btn.getAttribute('data-copy-target');
    const target = targetId && document.getElementById(targetId);
    const label = btn.querySelector('[data-copy-label]');
    if (!target || !label) return;

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(target.textContent || '');
      } catch (e) {
        return;
      }
      const lang = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es';
      label.textContent = content[lang].copy.copied;
      window.clearTimeout(btn._copyTimer);
      btn._copyTimer = window.setTimeout(() => {
        label.textContent = content[lang].copy.copy;
      }, 1600);
    });
  });
}

initLangToggle();
initThemeToggle();
initCopyButtons();
