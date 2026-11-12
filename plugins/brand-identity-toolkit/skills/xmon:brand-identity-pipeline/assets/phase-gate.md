# Phase gate: Phase {N} · {name}

Fill before asking for approval. Status: met / partly / not met / owner decision.
Every row needs evidence (file:line, board path) or a decision-log entry (D#).
Any row not «met» and without an owner decision blocks the delivery.
Row counts and totals of this gate come from a command over the filled file, never by eye (G7).

## A. Pipeline prompt items (copy every bullet of this phase from `pipeline-prompt.md`)

| # | Requirement (verbatim) | Status | Evidence / D# |
|---|---|---|---|
| A1 | | | |

## B. Skill workflow steps (one row per step of the phase skill's Workflow)

| # | Step | Status | Evidence / D# |
|---|---|---|---|
| B1 | | | |

## C. Skill reference templates (one row per section or field of each file in `skill-map.md`)

| # | File · section | Status | Evidence / D# |
|---|---|---|---|
| C1 | | | |

## D. Hand-off skills named by the phase skill

| # | Skill | Installed (path) | Followed (evidence) |
|---|---|---|---|
| D1 | | | |

## E. Work rules (pipeline prompt, «Reglas de trabajo») and guardrails

| # | Rule | Status | Evidence |
|---|---|---|---|
| E1 | Delivery footer in every new or changed file and in the reply | | |
| E2 | Deliverables in Markdown and SVG (other formats logged as owner decision) | | |
| E3 | Licences verified for fonts, images and icons used; every image of the deliverable listed with provenance, none marked «test only» (G55) | | |
| E4 | Every number measured or marked unverified (G7) | | |
| E5 | Every board rendered and read back after its last change (G13) | | |
| E6 | Document statuses and decisions log updated (G6) | | |
| E7 | Guardrails reread before this delivery (rule 1) | | |
| E8 | Every approval asked states what is approved; logged with the answer (G19) | | |
| E9 | External research claims used here are verified or marked unverified (G22) | | |
| E10 | Consumer repositories read at their default branch, or the branch named (G23) | | |
| E11 | Every question carried the expert's recommendation with a source read in the same step and quoted for what it says (G36, G46), said in plain words what changes and who notices for each option (G25), and offered «not now» when it added something new (G48) | | |
| E12 | Every value taken from a consumer product names its token, role, file:line and commit (G50) | | |
| E13 | Every SVG and HTML in `production/` and the client package works on its own: each `href`/`src` resolves inside the package; production copies identical to the generated files (G54) | | |
| E14 | Each deliverable path is written by one generator only; a replaced generator's output retired (G56) | | |
| E15 | The commit of this step lists `brand/progress.md` and `brand/decisions-log.md` (`git show --stat`, G6) | | |

## Phase-specific minimum rows (learned from past audits)

- Phase 0: liked and disliked references (brands, logos, voices) collected once, with what the owner likes about each; brand owner and contact channel for the manual (G45).
- Phase 1: discovery template (executive summary, audience profiles, competitor fields: positioning, pricing, strengths/weaknesses, recent moves; category map: conventions, shifts, moats, vocabulary; territories with competitors and evidence; brand truths; strategic implications; methodology; sign-off); visual references; name and trademark search (OEPM, EUIPO, WIPO, domains) or logged owner deferral (G20).
- Phase 1 · positioning: the owner was asked which strengths matter most; each differentiator cites that answer, its product evidence and which competitors share it (G49).
- Phase 2: the 4 axes chosen WITH the owner, calibrated with the references from 0.4; rejection list; open questions.
- Phase 3 (shape only, black and white): logo-design steps 1-6 and 9; 3-5 mockups per top candidate; restraint tests (silhouette, distinctiveness, two-second, sketchability, single colour, 1-inch print, lockup at 200/100/50/25 %); prompt test matrix for each of the 6 variants (16, 32, light, dark, black, white, real photo); physical-use tests if the owner asks for them; construction drawing in SVG of the symbol and each lockup, dimensioned and measured from the drawing, written construction matching it (blocks the logo approval, G30); figurative trademark search or logged deferral. No row here needs colour.
- Phase 4 · step 4.2 (logo package): logo-design step 7 (9 fields per variant, colour tokens included) and step 8 (production specs); client package (formats, folders, naming, usage guide taken from the logo guidelines, colours, licence, one-colour brand version); coloured icons; app files from the same generator; only surfaces confirmed in 0.3.
- Phase 4 · step 4.1 (colour): primary; 1 to 3 secondary colours with their own hue, or a logged owner decision for none; neutral scale; semantic colours incl. info; dark mode; colour-blindness check; text variants; logo colour versions; data palette if the product shows charts (each pair of series distinct in light, dark and deutan, protan and tritan simulation; none close to error, success or logo colours).
- Phase 4 · step 4.4 (iconography): every icon in use listed with source and version; any icon added later follows G57.
- Phase 4: each of the 7 files has rules, correct/incorrect examples, tokens, accessibility; identity-system-spec fields (HSL, neutral scale, semantic tokens incl. info, metadata, sign-off); full contrast checklist (colour blindness, dark mode, semantic on dark); motion; stress-test on 3-5 confirmed applications.
- Phase 4 · close: every field of `brand-style-guide` §2-§8 is filled in some Phase 4 document or deferred by a logged owner decision; no two documents contradict each other (grep the terms of every rule changed during the phase).
- Phase 4 · sizes: every size given for the logo, the symbol or an animation of them (icons, loaders, buttons, emails) is at or above the logo's minimum, or names the small-size cut it uses (G51); every «never» rule cites the decision that asked it directly (G47).
- Phase 5: one row per section of `brand-manual-standard.md` (the prompt's Phase 5 list crossed with `brand-style-guide`), each with its source document or the owner's logged decision; rules shown with real examples; approved files, not redrawn; version history; maintenance (governance); format and review width confirmed with the owner; PDF only after approval of the whole web manual.
- Phase 5 · generators: duplicate-class check exits 0 (G53); token values read from the approved documents, none typed (G35).
- Phase 5 · layout (G52): layout directions board and the owner's choice (D#); one row per item of `brand-manual-standard.md` «How it is laid out»; browser checks at the review width and 390 px with their output (no horizontal overflow, no text below the minimum size, no broken image, no internal reference outside the foot notes); one row per navigation trap of «Web format: navigation» (deep link kept on load, scroll position unchanged when the index opens and closes, title below the bar after a jump).
- Phase 5 · PDF: every section on a new page; no figure split across pages; page numbers in the index match the pages; page numbers in the footer; animation shown as frames.
- Phase 6: on-brand reads production and brand-system files; real token values; logo rules; contrast check; warn/reject behaviour; pre-delivery checklist.
