# Work order

The order of work inside and across phases. It is a dependency order: anything that
another piece of work uses is done, and approved, before that work starts. Following it
avoids redoing approved work, which is the most expensive mistake in a brand project (G33, G35).

Rules that apply to every step:

- A step starts only when everything listed in its «Needs» is approved and logged.
- Anything the owner has to decide is asked as early as the step that needs it, never later,
  and only once: what several steps need from the owner is collected in one step.
- Every file that repeats a shape or a value (logo, icons, animation, app files, tokens)
  is generated from one source of truth by a script, never copied by hand. A change then
  costs one regeneration.
- Each identity document (Phase 4) fills every field that the manual's skill asks for its
  section (`brand-style-guide` §2-§8 and `references/style-guide-template.md`), so the manual
  finds no gaps; a field left empty is an owner decision, logged.
- Every rule is written in one document only. The logo's rules (clear space, minimum sizes,
  colour versions, incorrect uses) live in the project's logo guidelines; the client package
  and the manual take them from there and never restate them.
- When an approved item has to change, list first everything that uses it (this file shows
  it under «Used by»), show the owner the cost, and regenerate all of it in one pass.

## Phase 0 · Setup (everything later steps will need from the owner)

| # | Step | Needs | Used by |
|---|---|---|---|
| 0.1 | Install every phase skill **and every skill they hand off to** (read each in full); record source commits (G3, G21) | — | all phases |
| 0.2 | Create the decisions log, the project's filled pipeline prompt and `brand/progress.md` (from `assets/pipeline-prompt.md` and `assets/progress.md`) | — | all phases |
| 0.3 | Ask where the brand really lives: products, surfaces, print or not, who applies it (G8); who owns the brand and which contact channel the manual gives for questions and change requests | — | 1.2, 3 tests, 4 package, imagery, layout, motion, applications, 5 governance and contact |
| 0.4 | Collect, in one pass, the liked and disliked references the later skills ask for: brands, logos and voices, each with what the owner likes or dislikes about it | — | 1.2, 2.1, 3 inputs, 4.5 voice |
| 0.5 | Confirm the manual's format (canvas, web page, PDF, document), the width at which the owner reviews pages on screen, and whether the PDF is to be read on screen or printed; record the three in `brand/progress.md` | — | every board is built so it can go into it; 5.3-5.5 |
| 0.6 | Analyse the sketch, if there is one | 0.3 | 2, 3 |

## Phase 1 · Strategy

| # | Step | Needs | Used by |
|---|---|---|---|
| 1.1 | Name and trademark search, or the owner's logged deferral (G20). First, because a name that cannot be used voids everything after it | — | everything that uses the name |
| 1.2 | Discovery with every section of its template, including values, origin story and anti-personas (the manual's story needs them) | 0.3, 0.4, 1.1 | 2, 4.5 voice, manual story |

## Phase 2 · Creative direction

| # | Step | Needs | Used by |
|---|---|---|---|
| 2.1 | The four axes, one at a time with the owner, calibrated with the references from 0.4 | 1, 0.4 | 3, 4, 4.5 voice (tone register) |
| 2.2 | Acceptance and rejection criteria | 2.1 | every later approval |

## Phase 3 · Logo, shape only, in black and white (nothing that uses the logo starts before 3.9)

| # | Step | Needs | Used by |
|---|---|---|---|
| 3.1 | Architecture | 2 | 3.2-3.9 |
| 3.2 | Wordmark registers (3-4), then the owner's choice | 3.1 | 3.4, 4.3 typography |
| 3.3 | Symbol approaches, then the owner's choice | 3.1 | 3.4 |
| 3.4 | **Pick the unit** (a letter measure of the wordmark, such as cap height) and a module tied to it (G32) | 3.2, 3.3 | 3.5-3.9 |
| 3.5 | Build the symbol on the module, in a generator script | 3.4 | 3.6-3.9, 4.2 package, motion |
| 3.6 | Lockups and clear space in the unit; optical spacing as a range the owner picks (G9) | 3.5 | 3.9 |
| 3.7 | Small-size cut (favicon), **shape only**, on the same module, tested at 16/32/48 px (G11). Coloured icons are made in 4.2 | 3.5 | 4.2 package |
| 3.8 | Construction drawing over the generated files, every figure measured (G30) | 3.5-3.7 | manual board 2 |
| 3.9 | Test matrix and restraint tests in one ink and over photographs; figurative trademark search; **then** the logo approval, with the drawing attached. No client package, variant specs or production specs here: they carry colour (4.2) | 3.5-3.8 | everything below |

## Phase 4 · Identity system

| # | Step | Needs | Used by |
|---|---|---|---|
| 4.1 | Colour, the full checklist in one pass: primary, **1 to 3 secondary colours with a hue of their own** (greys are neutrals, not secondaries; zero only as a logged owner decision), neutral scale, semantic colours including info, dark mode, colour-blindness, text variants, **the logo's colour versions** (mark colour, reverse, accent, one-colour brand version), and, **only if the product shows charts**, a data palette drawn from those colours: every series tells apart from the others in light, dark and the three colour-blindness types, and none looks like a colour that already means something (error, success, the logo) | 3.9 | everything below |
| 4.2 | Logo package, from one generator: client package (formats, folders, naming, usage guide, colours, licence), the 9 fields per variant and the production specs, coloured icons, and the app files for the consumers. Only files for surfaces confirmed in 0.3 | 3.9, 4.1, 0.3 | 4.8, 4.9, 5, hand-off to consumers |
| 4.3 | Typography, with every field of `brand-style-guide` §4: families, scale, weights, line height, **letter spacing**, fallbacks, open-source alternatives, forbidden treatments | 3.2, 4.1 | 4.4-4.9 |
| 4.4 | Iconography | 4.1, 4.3 | 4.7, 4.9 |
| 4.5 | Voice, with the voice skill the identity skills hand off to (not after the manual). In the same pass, update the tone examples written in 1.2 so they match | 1.2, 2.1, 0.4 | 4.9, manual |
| 4.6 | Layout | 4.1, 4.3 | 4.9 |
| 4.7 | Imagery, only for surfaces confirmed in 0.3 | 0.3, 4.1 | 4.9 |
| 4.8 | Motion: product rules and brand moments, built from the approved symbol's generator | 3.9, 4.1, 4.2 | 4.9, app files |
| 4.9 | Applications: stress test on 3-5 confirmed surfaces, using the files from 4.2 | 4.1-4.8 | 5, hand-off to consumers |

## Phase 5 · Manual

| # | Step | Needs | Used by |
|---|---|---|---|
| 5.1 | Data layer: readers that fail on a missing heading, table or file; the canonical Markdown manual; CSS tokens generated from the approved documents (`brand-manual-standard.md`, `manual-web-recipe.md`) | 1-4 approved | 5.3-5.6 |
| 5.2 | Check that `production/` and the client package work on their own (G54) before the manual links them | 4.2 | 5.4 |
| 5.3 | Layout directions board: 2-3 directions, each with cover, two sample sections and navigation, at the owner's review width and 390 px; the owner picks | 5.1, 0.5 | 5.4 |
| 5.4 | Core before the first section: spread helpers, prefixed CSS (G53), reference stripping, navigation and the check scripts (`assets/manual-web/`) | 5.3 | 5.5 |
| 5.5 | Sections in blocks of 3-4; each block passes the browser checks at both widths and is committed with its log (G6) | 5.4 | 5.6 |
| 5.6 | Before asking: phase gate with counts by command (G7), no «pending» placeholder left except hatched photo slots, no contradiction between the manual and its sources (G44, G45). Approval of the whole web manual; then the PDF | 5.5 | 6 |

## Phase 6 · Brand guard

| # | Step | Needs | Used by |
|---|---|---|---|
| 6.1 | The brand-check skill with the real tokens, rules and checklist; the values are generated from the source documents by a script, never copied by hand, and the script fails when a copied heading is missing | 5.6 | every later delivery |

## Before resuming a project that did not follow this order

Map what is approved against this table and write the result to `brand/progress.md`, find the earliest step that is missing or was
done after something that uses it, and fix from there, in order. Tell the owner which
approved items that will make you regenerate before starting.
