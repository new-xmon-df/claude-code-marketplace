# Manual web recipe

How to generate the brand manual as one web page (and later its PDF), learned from a manual the
owner approved. What the manual must contain and how it is laid out is in
`brand-manual-standard.md`; this file is how to build it. Tested pieces live in
`assets/manual-web/`; copy them into the project and adapt them, never edit them in the skill's
cache.

## Architecture

Python 3 with the standard library only (`re`, `html`, `pathlib`); HTML as f-strings, no template
engine. Four layers, each importing only from the layers above it:

1. **Data** (`build_manual.py`): reads the approved documents and writes the canonical Markdown
   manual. It is the only layer that opens a source file.
2. **Layout** (`layout.py`): the spread helpers, the reference stripping and the CSS tokens. A
   shared module, so section modules never import the assembler back (a late
   `import build_web` inside a function creates a circular import).
3. **Sections** (one module per block, e.g. `web_logo.py`, `web_system.py`, `web_use.py`,
   `web_close.py`, plus `web_nav.py`): each exports `sN() -> str` per section and one `CSS`
   string whose classes all carry the module's prefix (G53).
4. **Assembler** (`build_web.py`): concatenates cover + index + every `sN()` in the order of a
   `SECTIONS` list and writes one `index.html`: one `<style>` with the CSS of every module, the
   bar, `<main>`, the foot notes and the navigation script last.

When a generator is replaced, the old one stops writing in the same step (G56).

## Data layer: readers that fail

Generic readers, each raising when what it looks for is missing:

| Reader | Returns | Fails when |
|---|---|---|
| `read(rel)` | the file's text | the file is missing |
| `sec(rel, "## Heading")` | the body up to the next heading of the same or higher level | the heading is missing (`KeyError`) |
| `table(text)` | `(header, rows)` of the first Markdown table | there is no table |
| `bullets(text)`, `numbered(text)` | list items | — |
| `url(rel)` | the path relative to the output | the file does not exist |
| `logo(variant, treatment)` | the path of the SVG in the client package | the file does not exist |
| `icon(name, cls)` | the icon's SVG inline, `fill="currentColor"`, `aria-hidden="true"` | the icon is not in the icon list |

Section-specific extractors sit on top and assert what they expect: the number of logo variants,
the order of the incorrect uses on their approved board, at least 15 voice pairs. A count that
changes is a failure to look at, not a silent change in the manual.

**Tokens**: the data layer reads colours, type scale and spacing from the approved colour,
typography and layout documents and emits them as the `:root` variables of
`assets/manual-web/base.css`. Never type a token value into a generator (G35).

## Layout helpers

| Helper | Draws |
|---|---|
| `head(num, kicker, title, lead)` | big number, kicker, title, standfirst |
| `rule(title, text)` | a short rule with a rule line above it |
| `spread(id, side, main, extra, source)` | a numbered section: sticky side column, main column, optional full-width extra, foot note |
| `cont(...)` | continuation of a section without a number (second and later spreads) |
| `side_block(...)` | the side column of a continuation |
| `note(source)` | the discreet foot note: decision codes, paths, sources |

The grid, breakpoints and spread classes they emit are in `assets/manual-web/base.css`; the
markup contract is `assets/manual-web/skeleton.html`. Check the owner's review width (work-order
0.5) against the breakpoints: the spread must not stack at that width.

## Reference stripping

Body text comes from documents full of internal references. Strip them in the layout layer and
send the source to `note()`. The markers are per project; keep them in one list:

```python
import re

REF_MARKERS = [r"\bD\d+", r"\banswer \d+", r"\.md\b", r"§"]   # the project's codes and markers
_marker = "|".join(REF_MARKERS)
_PAREN = re.compile(r"\s*\((?=[^()]*(?:" + _marker + r"))[^()]*\)")  # «(D12)», «(answer 4; x.md)»
_LOOSE = re.compile(r"\s*\b(?:D\d+[;,]\s*)+(?=\s|$)")                # «D12; D14;» outside brackets
_CODE = re.compile(r"`([^`]*)`")                                       # Markdown code backticks

def clean(s: str) -> str:
    s = _PAREN.sub("", s)
    s = _LOOSE.sub("", s)
    s = _CODE.sub(r"\1", s)
    return re.sub(r"\s+([.,;:])", r"\1", s).strip()
```

A bracket without a marker survives («Minimum 32 px (screen)»). The browser check
(`check_page.js`, `refPattern`) confirms nothing is left outside the notes; give it the same markers.

## Images, icons, fonts, animation

- Logos and construction drawings: `<img src>` to the files of the client package or
  `production/`, never redrawn or copied into the manual (`brand-manual-standard.md`). Those files
  must work on their own (G54).
- Icons: inline SVG from the project's icon list, `fill="currentColor"`, `aria-hidden="true"`.
  A new icon follows G57.
- The brand animation: an `<iframe>` of the approved HTML.
- Fonts: the web font link plus a local `@font-face` fallback for **every weight used**, from the
  font files the project stores (G34); a missing weight falls back to the system font offline.
- Photographs: only approved ones with provenance (G55); otherwise `.mw-pending`.

## Checks before showing a block

Serve the project root with `python3 -m http.server`, open the page with `?v=N` (raise N on every
build to skip the cache) and, at the owner's review width and at 390 px:

1. `python3 check_classes.py <every module>`: exit 0 (G53).
2. `check_page.js` in Playwright's evaluate: `pass: true` (no overflow, no text below the
   minimum, no broken image, no internal reference outside the notes).
3. Load with a deep link (`index.html?v=N#s4`), then `check_nav.js`: `pass: true`. It reads the
   markup of `assets/manual-web/nav.js` by default; a different navigation sets its selectors in
   the script's `CONFIG`.
4. Screenshots of each section, read one by one (G13).

Paste the outputs into the Phase 5 gate.

## PDF for screen (validated in a project)

A PDF read on screen: cover, index and one page per section, each page as tall as its content.
Dependencies: `google-chrome` and `poppler-utils` (`pdfinfo`, `pdftoppm`).

1. **`print.html` from the same assembler as the web.** Each page is a `<div class="pg">` holding
   one group: the cover, the index, and each section with its continuations (split the HTML at
   every `<section … id="sN">`). `print.html` is intermediate: delete it when the PDF is built.
2. **Forced desktop layout.** Rewrite the narrow-screen media queries (the 1199 and 767 px
   breakpoints of `base.css`) to `(max-width: 0px)` in `print.html`, and render with a window as
   wide as the page (1280 px), so what is measured is what is printed.
3. **Nothing in `vh`.** A cover sized `min(52vh, 480px)` broke into two pages; give it a fixed
   height in `print.html`.
4. **One page size per page.** A script at the end of the body measures each `.pg` with
   `getBoundingClientRect().height`, sets `style.page = 'pK'` on it and injects
   `@page pK { size: 1280px <height + 2>px; margin: 0 }`. Chrome honours a different size for each
   named page.
5. **Page number on each page**: an element of its own inside each `.pg`, absolutely positioned
   at the bottom, since the pages have no margins (`margin: 0`).
6. **Index numbers known before printing**: cover 1, index 2, section N on page N + 2. Write them
   directly, then check them against the PDF: `pdfinfo -dests out.pdf` lists one named destination
   per linked id, with its page. The build fails when the page count or a destination does not
   match. Searching section titles with `pdftotext` does not work: the reading order mixes
   columns, even with `-layout`.
7. **Print**:
   `google-chrome --headless=new --disable-gpu --hide-scrollbars --window-size=1280,900 --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf=out.pdf file://<abs>/print.html`
8. **Animation as frames**, without touching the approved file: one screenshot at the last
   millisecond of each step,
   `google-chrome --headless=new --window-size=480,480 --force-device-scale-factor=2 --virtual-time-budget=<ms> --screenshot=frame-N.png file://<abs>/animation.html`.
   The frames replace the `<iframe>` in `print.html`, and any caption that only works on screen
   («click to replay») is rewritten for the page.
9. **Read it back** (G13): a contact sheet of every page (`pdftoppm` at low resolution, tiled with
   PIL) and a few pages at 40 dpi.

## PDF for paper (recipe not yet validated in a project)

A4 pages composed one by one, each a fixed spread; long sections are split on purpose into several
pages. Never the web layout printed with automatic breaks: tried in landscape and portrait, it
left lone foot notes, almost empty pages, continuations cut from their title and a cover in two,
and Chrome applied the narrow-screen media queries at the page width (G52). Known to work in
Chrome for this route: `@page` margin boxes for the folio (`@bottom-right { content:
counter(page) }`). The first project that builds a printed manual validates this and updates it
here.
