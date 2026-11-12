/*
 * Brand manual web: navigation checks for nav.js. Paste the whole function into Playwright's
 * evaluate (MCP browser_evaluate `function`, or page.evaluate). Load the page with a deep link
 * (e.g. index.html?v=3#s4), wait for the load, then run it once at each width.
 * Every entry of `failures` names a trap from brand-manual-standard.md «Web format: navigation».
 * The selectors default to the markup of nav.js (skeleton.html); edit CONFIG for another navigation.
 */
async () => {
  const CONFIG = {
    bar: '.nav-bar',
    current: '.nav-cur',         // element whose text names the current section
    prev: '.nav-prev',
    next: '.nav-next',
    toggle: '.nav-toggle',       // index button; its aria-controls names the panel
    sections: 'section[data-nav][id]',
    title: s => s.dataset.nav,   // text the bar shows for a section
  };
  const frame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  // Smooth scrolling to a deep link can still be running: wait until the page stands still.
  const still = async () => {
    for (let same = 0, last = -1, n = 0; same < 5 && n < 300; n++) {
      await frame();
      same = window.scrollY === last ? same + 1 : 0;
      last = window.scrollY;
    }
  };
  const failures = [];
  await still();
  const bar = document.querySelector(CONFIG.bar);
  const cur = bar.querySelector(CONFIG.current);
  const prev = bar.querySelector(CONFIG.prev);
  const next = bar.querySelector(CONFIG.next);
  const toggle = bar.querySelector(CONFIG.toggle);
  const panel = document.getElementById(toggle.getAttribute('aria-controls'));
  const sections = [...document.querySelectorAll(CONFIG.sections)];

  // 1. Deep link kept on load
  const initial = location.hash;
  if (initial) {
    const target = document.querySelector(initial);
    if (!target) failures.push(`deep link ${initial}: no such section`);
    else if (cur.textContent !== CONFIG.title(target)) failures.push(`deep link ${initial}: bar shows «${cur.textContent}»`);
  }

  // 2. Bar controls at the same height
  const boxes = [prev, next, toggle].map(el => el.getBoundingClientRect());
  if (new Set(boxes.map(b => Math.round(b.top))).size > 1 || new Set(boxes.map(b => Math.round(b.height))).size > 1) {
    failures.push(`bar controls misaligned: ${boxes.map(b => `${Math.round(b.top)}+${Math.round(b.height)}`).join(' ')}`);
  }

  // 3. Jump to a middle section: bar text, arrows, hash, section start below the bar
  const k = Math.floor(sections.length / 2);
  const s = sections[k];
  window.dispatchEvent(new Event('wheel')); // the user acts: the hash may follow from now on
  s.scrollIntoView({ behavior: 'instant', block: 'start' });
  await still(); await wait(50); await frame();
  if (cur.textContent !== CONFIG.title(s)) failures.push(`after jump to #${s.id}: bar shows «${cur.textContent}»`);
  if (location.hash !== '#' + s.id) failures.push(`after jump to #${s.id}: hash is «${location.hash}»`);
  if (prev.getAttribute('href') !== '#' + sections[k - 1]?.id) failures.push(`prev arrow points to ${prev.getAttribute('href')}`);
  if (next.getAttribute('href') !== (sections[k + 1] ? '#' + sections[k + 1].id : null)) failures.push(`next arrow points to ${next.getAttribute('href')}`);
  // The section's own top, not its title: the spread's padding would hide a missing scroll-padding.
  if (s.getBoundingClientRect().top < bar.getBoundingClientRect().bottom - 0.5) failures.push(`start of #${s.id} hidden under the bar`);

  // 4. Index opens and closes without moving the page; focus goes in and comes back
  const y = window.scrollY;
  toggle.click(); await frame();
  if (panel.hidden) failures.push('index did not open');
  if (!panel.contains(document.activeElement)) failures.push('focus did not move into the index');
  if (window.scrollY !== y) failures.push(`page moved ${window.scrollY - y}px when the index opened`);
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await frame();
  if (!panel.hidden) failures.push('Escape did not close the index');
  if (document.activeElement !== toggle) failures.push('focus did not return to the index button');
  if (window.scrollY !== y) failures.push(`page moved ${window.scrollY - y}px when the index closed`);

  // 5. Threshold >= scroll-padding-top: checked through the jump in step 3.
  return { width: document.documentElement.clientWidth, deepLink: initial || null, failures, pass: !failures.length };
}
