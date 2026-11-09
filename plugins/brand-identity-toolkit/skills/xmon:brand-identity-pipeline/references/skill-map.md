# Skill map: phase → skill → files to read → hand-offs

Read every listed file in full before producing any output for the phase. The order of the
steps inside each phase is in `work-order.md`.
Paths are relative to the project's `.claude/skills/`.

| Phase | Skill | Must read | Hand-offs to follow |
|---|---|---|---|
| 0 Setup + sketch | (pipeline prompt) | project `brand/00-setup/pipeline-prompt.md` (from `assets/pipeline-prompt.md`) | Install brand-discovery, creative-direction, logo-design, brand-identity, brand-style-guide, on-brand |
| 1 Strategy | `brand-discovery` | `SKILL.md`, `references/discovery-report-template.md`, `references/interview-guide.md` | Template sections are mandatory (executive summary, brand truths, strategic implications, competitor fields, category map, sign-off) |
| 2 Creative direction | `creative-direction` | `SKILL.md`, `references/axes-explained.md`, `references/brief-template.md`, `references/example-aesthetic-brief.md` | Walk the 4 axes one at a time WITH the owner; calibrate them with the references collected in step 0.4 (workflow step 3 is covered there, not asked again) |
| 3 Logo | `logo-design` | `SKILL.md`, `references/architectures-explained.md`, `references/typographic-registers.md`, `references/symbol-approaches.md`, `references/application-contexts.md`, `references/category-conventions.md`, `references/example-variant-spec.md`, `references/client-package.md` | Steps 1-10 in order: step 3 (3-4 wordmarks in different registers), step 9 (3-5 mockups per top candidate) and the restraint and application-context tests in one ink; **before asking for logo approval**: dimensioned construction drawing in SVG of the symbol and each lockup, drawn over the production files and measured from them, with the written construction matching it (G30) |
| 4 Identity system | `brand-identity` | `SKILL.md`, `references/identity-system-spec.md`, `references/contrast-and-accessibility.md` | The logo's colour versions in step 4.1; then, in step 4.2, `logo-design` step 7 (9 fields per variant), step 8 (production specs) and `references/client-package.md` (formats, folders, naming, usage guide, colours, licence), with the app files from the same generator; motion element; stress-test on 3-5 mock applications; full contrast checklist; hands off to `brand-style-guide` |
| 5 Manual | `brand-style-guide` | `SKILL.md`, `references/style-guide-template.md`, `references/maintenance-playbook.md` | Hands off voice to `brand-voice` (`SKILL.md`, `references/voice-document-template.md`, `references/voice-frameworks.md`): 4 layers, 15+ paired examples, stress test; 8 sections; confirm the format with the owner; a real example for every rule; version history; Dos and Don'ts; plus `references/brand-manual-standard.md` (this skill) |
| 6 Brand guard | `on-brand` | the approved `brand/03-logo/production/` and `brand/04-brand-system/` files | Must encode the real token values, rules and checklist (pipeline prompt, Phase 6) |

Phase 1 also requires a name and trademark search, or the owner's logged deferral (G20).

Phase 3 works on shape only, in black and white, and closes with the construction drawing approved
together with the logo. Phase 4 and any work that uses the logo (coloured icons, client package,
app exports, motion) starts after that, because a construction fix found later cascades into all
of it (G30), and anything that carries colour waits for step 4.1 (G35).

Source of skills: github.com/rampstackco/claude-skills (`skills/<name>/`). Record the
commit of each install and diff earlier installs against it (G21). Read
every file of a skill before copying it into `.claude/skills/`.
