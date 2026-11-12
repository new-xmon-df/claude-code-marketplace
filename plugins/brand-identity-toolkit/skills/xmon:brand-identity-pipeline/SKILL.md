---
name: xmon:brand-identity-pipeline
description: "Trigger: identidad de marca, crear o rediseñar logotipo, identidad visual, manual de marca, brand identity project, logo project. Runs a brand identity project end to end (strategy, creative direction, logo, identity system, manual, brand guard) enforcing every phase, skill step and guardrail; no skipping."
license: MIT
metadata:
  author: "juanjo"
  version: "0.3"
---

## Activation Contract

Load for any logo creation or redesign, brand identity, brand manual or brand-skill work, and on resuming such a project. Stay loaded until the project closes.

## Hard Rules

1. Before anything else, read the project's `brand/00-setup/pipeline-prompt.md` (the phase contract; on a new project, create it from `assets/pipeline-prompt.md` with its placeholders filled, asking the owner for any value you do not have) and `references/guardrails.md` in full. Reread guardrails before every phase and every delivery.
2. Every line of the pipeline prompt is mandatory. Never skip, merge or reinterpret a phase, item or rule.
3. Work in the order of `references/work-order.md` (dependency order, inside and across phases). Per phase, invoke the skill named in `references/skill-map.md`, then read its `SKILL.md` AND every file in its `references/`. Execute its workflow steps in order, one by one.
4. If a skill hands off to another skill (e.g. brand-identity → brand-style-guide), install that skill (read it fully first) and follow it. Never treat a hand-off as optional.
5. Never decide alone that a step does not apply. Ask the owner one question, wait, and log the answer in `brand/decisions-log.md`.
6. Before asking for approval, fill `assets/phase-gate.md` for the phase: every requirement → evidence (file:line) or a logged owner decision. Any gap blocks the delivery.
7. End every delivery, in the file and in the reply, with `assets/delivery-footer.md`.
8. Log every owner decision, correction and rejection verbatim in `brand/decisions-log.md` the moment it happens, and update each affected document's status.
9. Keep `brand/progress.md` (from `assets/progress.md`) as the project's snapshot: read it first when resuming, and update it in the same step that writes the decisions log.

## Decision Gates

| Situation | Action |
|---|---|
| A step or section looks not applicable | Ask the owner; never skip silently |
| A skill names another skill or a `references/` file | Read or install it before producing output |
| A number, licence, metric or fact is about to be stated | Measure or verify it first, or mark it as unverified |
| Logo about to be approved | First draw the dimensioned construction drawing (SVG) of the symbol and every lockup, measured from the drawing; fix what it reveals; only then ask for approval |
| Work that uses the logo (favicon, icons, app files, motion, identity system) | Start only after the logo and its construction drawing are approved |
| Optical choice (spacing, size, weight) | Show a range of options; the owner's eye decides |
| Showing work | Show it visually and inspect the rendered board before sending |
| Owner rejects a deliverable | Log it, redo it from the skill's workflow |

## Execution Steps

1. Read the pipeline prompt, guardrails, skill map, `brand/progress.md` and `brand/decisions-log.md` (create both if missing).
2. Identify the current step from `brand/progress.md`, checked against the log and `references/work-order.md`; never start a step before everything it needs is approved and logged.
3. Load the phase skill and all its references; list its workflow steps as a checklist.
4. Execute each step; record the evidence path for each.
5. Fill the phase gate; resolve every gap or ask the owner.
6. Deliver: visual board or canvas, files, footer. Wait for approval.
7. On approval or correction: update the log, `brand/progress.md`, document statuses.

## Output Contract

Per delivery: the deliverable files, a filled phase gate, a visual board or canvas, the delivery footer, and an updated decisions log. No phase closes without all of them.

## References

- `assets/pipeline-prompt.md`: template of the owner's phase contract; each project keeps its filled copy in `brand/00-setup/pipeline-prompt.md`.
- `assets/phase-gate.md`: per-phase compliance checklist.
- `assets/delivery-footer.md`: mandatory end of every delivery.
- `assets/decisions-log-template.md`: format of `brand/decisions-log.md`.
- `assets/progress.md`: template of the project's progress snapshot, `brand/progress.md`.
- `references/work-order.md`: the order of every step, what each needs and what uses it.
- `references/skill-map.md`: phase → skill → references → hand-offs.
- `references/guardrails.md`: errors made in earlier projects and the rules that prevent them.
- `references/brand-manual-standard.md`: what a brand manual must be and how it is laid out.
- `references/manual-web-recipe.md`: how to generate the manual as a web page and its PDF; tested pieces in `assets/manual-web/` (grid, navigation, checks).
- The `brand-identity-toolkit` plugin that ships this skill also shows, above the prompt, the current step of `brand/progress.md` and any earlier step still open; `/progreso` rereads the file.
