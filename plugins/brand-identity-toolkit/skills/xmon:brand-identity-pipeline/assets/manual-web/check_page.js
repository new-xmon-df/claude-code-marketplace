/*
 * Brand manual web: static page checks. Paste the whole function into Playwright's
 * evaluate (MCP browser_evaluate `function`, or page.evaluate) at the owner's review width
 * and again at 390 px. Edit CONFIG for the project. Every list in the result must be empty.
 */
() => {
  const CONFIG = {
    minText: 16,                       // floor from the typography document
    noteSelector: '.mw-note',          // where decision codes and sources may appear
    overflowOk: '[data-overflow-ok]',  // deliberate overflow, e.g. a stretched logo in a «don't»
    // Internal references that must not appear in the body: the project's decision codes and markers.
    refPattern: /\bD\d{1,3}\b|\.md\b|§/,
  };
  const root = document.documentElement;
  const width = root.clientWidth;
  const label = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
    (el.classList.length ? '.' + [...el.classList].join('.') : '');
  const visible = el => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
  };
  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (n.textContent.trim() && n.parentElement && !n.parentElement.closest('script,style,[hidden]')) textNodes.push(n);
  }

  // a) no horizontal overflow
  const overflow = [...document.body.querySelectorAll('*')]
    .filter(el => !el.closest(CONFIG.overflowOk) && !el.closest('[hidden]') && visible(el))
    .filter(el => el.getBoundingClientRect().right > width + 0.5)
    .map(label);

  // b) no text below the minimum size
  const small = [...new Set(textNodes.map(n => n.parentElement))]
    .filter(el => visible(el) && parseFloat(getComputedStyle(el).fontSize) < CONFIG.minText)
    .map(el => `${label(el)} ${getComputedStyle(el).fontSize}`);

  // c) no broken image
  const broken = [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.src);

  // d) no internal reference outside the notes
  const refs = textNodes
    .filter(n => !n.parentElement.closest(CONFIG.noteSelector) && CONFIG.refPattern.test(n.textContent))
    .map(n => n.textContent.trim().slice(0, 80));

  return {
    width,
    pageOverflow: root.scrollWidth > width ? root.scrollWidth - width : 0,
    overflow: overflow.slice(0, 20),
    small: small.slice(0, 20),
    broken,
    refs: refs.slice(0, 20),
    pass: root.scrollWidth <= width && !overflow.length && !small.length && !broken.length && !refs.length,
  };
}
