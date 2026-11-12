# Brand manual standard

What a brand manual must contain and how it is shown. Every requirement here cites its source:
the phase contract template (`assets/pipeline-prompt.md`, Phase 5) or the `brand-style-guide` skill
(`SKILL.md`, `references/style-guide-template.md`, `references/maintenance-playbook.md`). Nothing
here comes from a particular project.

## How it is shown

- **Visual: the image carries the rule, short text explains it.** A text index that points to other
  documents is not a manual (G14). Source: `brand-style-guide` failure patterns «Document with no
  examples» and «Document with only examples» (a rule needs both its statement and its example).
- **Every rule with a real example** of the brand in use. Source: `brand-style-guide` workflow step 4.
- **Format confirmed with the owner** before building (work-order step 0.5). Source: `brand-style-guide`
  workflow step 2 and step 7 («publish in the format the team will actually open»).
- **The approved files, never redrawn**; the manual is a view of the source documents, which stay
  canonical. Source: `brand-style-guide` «Output format» («The source files are canonical. The
  presentation is a view of them»).
- **Data and layout are two layers.** A data layer reads the approved documents (by heading or
  table), fails when a heading, table or file is missing, and writes the canonical Markdown manual.
  The layout layer imports that data layer and never reads a source on its own. Recipe:
  `references/manual-web-recipe.md`.
- **The PDF comes after the whole web manual is approved**, with a clean design, index, cover,
  numbered sections and visual examples. Source: `assets/pipeline-prompt.md` Phase 5 (last
  paragraph). It is laid out for paper, not printed from the screen layout: every section starts
  on a new page; no figure, card or drawing is split across pages; page numbers in the index and
  in the footer; an animation is shown as a sequence of frames.

## How it is laid out

Contents are not layout. A manual that stacks the approved documents one after another, with long
tables and decision codes in the body, was rejected as having no layout work at all (G52).

- **Layout direction first.** Before building, show a board with 2 or 3 truly different layout
  directions, each with the cover, two sample sections (e.g. logo and colour) and its navigation,
  rendered at the owner's review width and at 390 px. Recommended direction first, with its source
  (G36). The owner picks; navigation decided later means rebuilding the bar.
- **Each section is a spread**: number, title, standfirst and short rules in a narrow column
  (4 of 12), the hero image large beside it (8 of 12); on tablet 3 of 8 and 5 of 8, so the spread
  does not stack at the owner's review width (asked in work-order step 0.5).
- **No long tables dumped from the sources**: visual lists, drawn swatches, scales at real size,
  «do / don't» cards.
- **Decision codes, paths and sources only in a discreet note at the foot of each spread.** The
  generator strips internal references from the body text, and a browser check confirms none is
  left outside the notes.
- **The manual uses the brand's own system**: its typography and scale, spacing, grid, colour
  proportions, icons and voice, and the minimum text size of the typography document. Token
  values come from the approved documents, never hand copies (G35).
- **Sample copy is quoted verbatim** from the approved voice document (headlines, buttons,
  notices); no invented interface text.
- **Missing photographs are hatched placeholders labelled [pending]**, never stock or AI images.
- **Built in blocks** of 3 or 4 sections. Each block is rendered and checked at the owner's review
  width and at 390 px before it is shown. The owner may allow building on without confirming each
  block while the approved direction and content hold; the whole web manual is still approved
  before the PDF.

### Web format: navigation

A long single-page manual needs more than an «Index» link. The approved pattern: a fixed bar with
the current section, arrows to the previous and next section, a progress line and an index grouped
by block (side panel on desktop, bottom sheet on mobile). Requirements (Vercel Web Interface
Guidelines): real links; the URL hash follows the section; `scroll-padding-top` so the bar never
covers a title; visible focus; Escape closes the index and focus returns to its button;
`prefers-reduced-motion`. Each trap below is a Phase 5 gate row:

- Updating the hash on the first pass wipes deep links (`#s9`): leave the URL alone until the user
  scrolls or the page has loaded.
- Locking the body scroll when the index opens removes the scrollbar and the page jumps: use
  `overscroll-behavior: contain` on the panel and `focus({preventScroll: true})`.
- The threshold that detects the current section is equal to or greater than
  `scroll-padding-top`.

Tested implementation: `assets/manual-web/nav.js` and `nav.css`.

## Contents: the phase contract crossed with `brand-style-guide`

Each row is one section of the manual (one or more artboards or pages). Column «Prompt» is the
numbered list of `assets/pipeline-prompt.md` Phase 5; column «Style guide» is the section of
`brand-style-guide/SKILL.md` and its template.

| # | Section | Prompt | Style guide | Must show |
|---|---|---|---|---|
| 1 | Introduction and purpose | 1 | template «How to use this guide» | what the manual is for, who uses it, quick links |
| 2 | Strategy and personality | 2 | §1 Story | origin, mission, vision, values with practice, positioning, audience, anti-personas, what we are not |
| 3 | Logo: versions and files | 3, 12 | §2 Logo system, «Logo files» | primary, wordmark, symbol, lockups, monogram; file table |
| 4 | Logo: construction | 3 | §2 «Construction» | the construction grid and proportions, drawn |
| 5 | Logo: clear space and minimum sizes | 3 | §2 «Clear space», «Minimum sizes» | clear space drawn; minimums for screen and print |
| 6 | Logo: colour treatments and incorrect uses | 3 | §2 «Color treatments», §8 Logo | allowed versions (including one-colour) and forbidden uses, drawn |
| 7 | Colour | 4 | §3 Color | primary, secondary, neutrals, semantic, dark mode; HEX, RGB, HSL, CMYK, Pantone or why not; contrast; allowed and forbidden pairings; usage hierarchy |
| 8 | Typography | 5 | §4 Typography | display and body specimens, scale, weights, line height, letter spacing, fallbacks, open-source alternatives, forbidden treatments |
| 9 | Iconography | 6 | §5 «Iconography» | style, grid, stroke, the set or how to add to it |
| 10 | Imagery and photography | 7 | §5 «Photography», «Illustration» | direction, treatment, forbidden imagery, examples; or the owner's logged decision to defer it |
| 11 | Composition and visual hierarchy | 8 | §8 «Composition» | layout patterns that work and that do not; or the owner's logged decision |
| 12 | Motion (when the identity has it) | — | «Required inputs» (motion principles) | the brand's motion rules and moments |
| 13 | Applications, digital and physical | 9 | §7 Applications | the brand on each confirmed surface, at real size |
| 14 | Voice and tone | 10 | §6 Voice and tone (from `brand-voice`) | attributes «we are / we are not», tone by context, vocabulary, good and bad copy |
| 15 | Dos and don'ts | — | §8 Dos and don'ts | logo, colour, type, composition and voice, side by side; the easiest section to scan |
| 16 | Governance | 11 | `maintenance-playbook.md` | owner, what can change, what needs approval (change tiers), update cadence |
| 17 | Resources and delivery files | 12 | §2 «Logo files», «Contact» | where every file lives, formats, licences, contact |
| 18 | Version history | — | workflow step 6, template «Version history» | version, date, changes |

Rows 12, 15 and 18 are not in the prompt's list; `brand-style-guide` requires them. A section the
owner has deferred or scoped down still appears, saying so and citing the decision.
