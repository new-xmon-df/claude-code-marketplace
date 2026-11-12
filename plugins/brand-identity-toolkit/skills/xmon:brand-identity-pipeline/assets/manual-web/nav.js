/*
 * Brand manual web: navigation for a long single-page manual.
 * Markup contract (skeleton.html): sections are `section[data-nav="Title"][id]`; the bar is
 * `.nav-bar` with `.nav-cur`, `.nav-prev`, `.nav-next`, `.nav-progress > span` and
 * `.nav-toggle[aria-controls]` pointing to the index panel.
 * Traps it avoids (brand-manual-standard.md, «Web format: navigation»):
 * - the URL hash is not touched until the user acts (wheel, touch, key, pointer), so deep links survive;
 * - the body scroll is never locked; focus moves with preventScroll;
 * - the current-section threshold is scroll-padding-top + 16 px.
 */
(() => {
  const root = document.documentElement;
  const bar = document.querySelector('.nav-bar');
  if (!bar) return;
  const sections = [...document.querySelectorAll('section[data-nav][id]')];
  if (!sections.length) return;
  const cur = bar.querySelector('.nav-cur');
  const prev = bar.querySelector('.nav-prev');
  const next = bar.querySelector('.nav-next');
  const fill = bar.querySelector('.nav-progress span');
  const toggle = bar.querySelector('.nav-toggle');
  const panel = document.getElementById(toggle.getAttribute('aria-controls'));
  const links = [...panel.querySelectorAll('a[href^="#"]')];
  let settled = false;
  let ticking = false;
  let current = -1;

  const threshold = () => (parseFloat(getComputedStyle(root).scrollPaddingTop) || 0) + 16;

  function setArrow(a, section) {
    if (section) {
      a.href = '#' + section.id;
      a.title = section.dataset.nav;
      a.removeAttribute('aria-disabled');
    } else {
      a.removeAttribute('href');
      a.removeAttribute('title');
      a.setAttribute('aria-disabled', 'true');
    }
  }

  function update() {
    ticking = false;
    const max = root.scrollHeight - root.clientHeight;
    const y = root.scrollTop;
    if (fill) fill.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;

    let i = 0;
    if (max > 0 && y >= max - 1) {
      i = sections.length - 1; // short last section never reaches the top
    } else {
      const limit = threshold();
      sections.forEach((s, k) => { if (s.getBoundingClientRect().top <= limit) i = k; });
    }
    const section = sections[i];
    if (i !== current) {
      current = i;
      cur.textContent = section.dataset.nav;
      setArrow(prev, sections[i - 1]);
      setArrow(next, sections[i + 1]);
      links.forEach(a => {
        if (a.getAttribute('href') === '#' + section.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
    if (settled && location.hash !== '#' + section.id) {
      history.replaceState(null, '', '#' + section.id);
    }
  }

  const schedule = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  const settle = () => { settled = true; };

  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    const target = panel.querySelector('[aria-current="true"]') || links[0];
    if (target) target.focus({ preventScroll: true });
  }
  function closePanel(returnFocus) {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus({ preventScroll: true });
  }

  toggle.addEventListener('click', () => (panel.hidden ? openPanel() : closePanel(true)));
  panel.addEventListener('click', e => { if (e.target.closest('a')) closePanel(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !panel.hidden) { e.preventDefault(); closePanel(true); }
  });
  document.addEventListener('click', e => {
    if (!panel.hidden && !panel.contains(e.target) && !toggle.contains(e.target)) closePanel(false);
  });

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  // Settle on user input only: with smooth scrolling, the browser's own jump to a deep link
  // passes through earlier sections after the load event and would rewrite the hash.
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(type =>
    window.addEventListener(type, settle, { once: true, passive: true }));
  update();
})();
