# Progress: {brand name}

The project's snapshot of where it stands. Copy to `brand/progress.md` at step 0.2 and keep it
current. It lists every step of `references/work-order.md`, in that order, with its sub-tasks.

Rules:
- Read it first when resuming; it replaces rebuilding the state from the log.
- Update it in the same step that writes `brand/decisions-log.md`, never later.
- It holds status and evidence only (D# or file:line). Decisions live in the log; never copy them here.
- Status: ✅ done and approved · ⚠️ done with something pending (say what) · ⬜ not done ·
  ⏸ deferred by the owner (D#).
- `Current step` names the step being worked on; change it when work moves to another step.
- Never mark a step ✅ without evidence. A step done out of order is ⚠️ until what it needs is approved.

Current step: {step}
Last updated: {YYYY-MM-DD} · last decision: D{n}

## Phase 0 · Setup
- ⬜ 0.1 Phase skills and their hand-offs installed, source commit recorded
- ⬜ 0.2 Decisions log, filled pipeline prompt and this file created
- ⬜ 0.3 Where the brand lives (products, surfaces, print, who applies it)
- ⬜ 0.4 Liked and disliked references (brands, logos, voices), each with what the owner likes or dislikes about it
- ⬜ 0.5 Manual format and the owner's review width confirmed (width: {px})
- ⬜ 0.6 Sketch analysis (if there is a sketch)

## Phase 1 · Strategy
- ⬜ 1.1 Name and trademark search, or logged deferral
- ⬜ 1.2 Discovery with every template section
  - ⬜ Executive summary, metadata, methodology, sign-off
  - ⬜ Audience profiles (with quotes, or the gap declared)
  - ⬜ Competitor fields (positioning, pricing, strengths, weaknesses, recent moves)
  - ⬜ Category map (conventions, shifts, moats, vocabulary)
  - ⬜ Territories with competitors and evidence
  - ⬜ Brand truths and strategic implications
  - ⬜ Story: origin, values, what we are not, anti-personas

## Phase 2 · Creative direction
- ⬜ 2.1 Four axes, walked one at a time with the owner, calibrated with the 0.4 references
- ⬜ 2.2 Acceptance and rejection criteria

## Phase 3 · Logo (shape only, black and white)
- ⬜ 3.1 Architecture
- ⬜ 3.2 Wordmark registers (3-4) and the owner's choice
- ⬜ 3.3 Symbol approaches and the owner's choice
- ⬜ 3.4 Unit and module
- ⬜ 3.5 Symbol built on the module, in a generator
- ⬜ 3.6 Lockups, clear space and optical spacing (range picked by the owner)
- ⬜ 3.7 Small-size cut, shape only, tested at 16/32/48 px
- ⬜ 3.8 Construction drawing, every figure measured
- ⬜ 3.9 Tests and logo approval
  - ⬜ Prompt test matrix for every variant (16, 32, light, dark, black, white, real photo)
  - ⬜ Restraint tests (silhouette, distinctiveness, two-second, sketchability, single colour, 1-inch print, lockup at 200/100/50/25 %)
  - ⬜ Figurative trademark search (similar symbols)
  - ⬜ Print minimums tested
  - ⬜ One-colour versions of every variant
  - ⬜ Logo approval, with the construction drawing

## Phase 4 · Identity system
- ⬜ 4.1 Colour, full checklist in one pass, including the logo's colour versions
- ⬜ 4.2 Logo package, from one generator
  - ⬜ 9 fields per final variant (logo-design step 7) and production specs (step 8)
  - ⬜ Client package (formats, folders, naming, usage guide from the logo guidelines, colours, licence, one-colour brand version)
  - ⬜ Coloured icons and app files for the consumers (only confirmed surfaces)
- ⬜ 4.3 Typography
- ⬜ 4.4 Iconography
- ⬜ 4.5 Voice (with the voice skill), updating the brief's tone examples
- ⬜ 4.6 Layout
- ⬜ 4.7 Imagery (only for confirmed surfaces)
- ⬜ 4.8 Motion
- ⬜ 4.9 Applications
  - ⬜ Rules, correct and incorrect examples, tokens, accessibility
  - ⬜ Stress test on 3-5 confirmed surfaces, with the 4.2 files
  - ⬜ Files handed to their consumers

## Phase 5 · Manual
- ⬜ 5.1 Data layer, canonical Markdown and generated CSS tokens
- ⬜ 5.2 `production/` and client package work on their own (G54)
- ⬜ 5.3 Layout directions board and the owner's choice
- ⬜ 5.4 Core: spread helpers, prefixed CSS, reference stripping, navigation, check scripts
- ⬜ 5.5 Sections built in blocks, each checked at both widths and committed
- ⬜ 5.6 Gate, approval of the whole web manual, then the PDF

## Phase 6 · Brand guard
- ⬜ 6.1 Brand-check skill with real tokens, rules and checklist

## Cross-cutting
- ⬜ Delivery footer in every document
- ⬜ No document says approved and pending at once (G6)

## Summary
{done} done · {partial} with something pending · {todo} not done · next step: {step}
