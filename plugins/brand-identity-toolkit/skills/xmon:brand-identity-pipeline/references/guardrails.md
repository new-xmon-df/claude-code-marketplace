# Guardrails

Each entry: the error that happened, the rule that prevents it, and how to verify
the rule before delivering.

This skill is generic: it serves any logo or brand project. Its text never names a
project's brand, repositories, colours or files (G24). The «Error» lines describe
what went wrong in an earlier project, without identifying it.

The first entries come from the skill's first project; its read-only compliance
audit is summarised in G15-G17.

## Process

**G1 · Skill workflow steps skipped**
- Error: logo-design step 3 (wordmarks in 3-4 registers) was skipped; only two neutral sans were shown. The owner found the result poor, with the text disconnected from the symbol.
- Rule: list the skill's workflow steps as a checklist and tick each with evidence.
- Verify: phase gate has one row per workflow step.

**G2 · Skill references never read**
- Error: none of the skills' `references/` templates were read during Phases 1-5.
- Rule: read every file listed in `skill-map.md` before the phase output.
- Verify: phase gate names each reference file and where its fields were applied.

**G3 · Hand-off skill ignored**
- Error: brand-identity says to use `brand-style-guide` to document the system; it was never installed and the manual was written without it. The owner asked whether that was really a brand manual and whether it met the prompt and the skills.
- Rule: install and follow every skill another skill hands off to.
- Verify: grep the phase skill for other skill names; each is installed and used.

**G4 · Deciding alone what applies**
- Error: parts of the prompt or a skill were treated as optional without asking. The owner pointed out that orders cannot be skipped.
- Rule: a step is only skipped after the owner says so, logged verbatim.
- Verify: every non-met row in the phase gate points to a logged owner decision.

**G5 · Missing delivery footer**
- Error: most documents lacked decisions taken / pending / next steps, which the prompt requires before each delivery.
- Rule: every document and every reply ends with `assets/delivery-footer.md`.
- Verify: each `.md` in `brand/` has the three headings.

**G6 · Stale statuses**
- Error: headers said «approved» while the pending list still asked to approve the document; a rejection was never recorded.
- Rule: on every approval or rejection, update the header, the pending list and the decisions log in the same step.
- Second case: a chained shell command failed half way and `brand/progress.md` was left out of the commit twice.
- Verify: no document says approved and pending at once; `git show --stat` of each commit lists `brand/progress.md` and `brand/decisions-log.md` when the step changed them.

## Facts and claims

**G7 · Numbers stated without measuring**
- Error: a part of the symbol was claimed to be «2.5 times» thicker than the letters before measuring (real: 0.27X vs 0.21X).
- Rule: measure first; otherwise label the figure as an unverified estimate.
- Second case: the row counts of a phase gate («48 rows, 7 partly») were counted by eye and the first figure given was wrong.
- Verify: every number in a delivery has a measurement or source; counts and totals come from a command (grep, a script), never from reading.

**G8 · Invented brand surfaces**
- Error: designed imagery for a public web, social posts and proposals that do not exist; the owner pointed out the product already had a website.
- Rule: before imagery, layout or applications, confirm with the owner where the brand actually lives.
- Verify: every application listed is a surface the owner confirmed.

## Design decisions

**G9 · Measured method over the owner's eye**
- Error: the optical spacing of a letter pair was set by a measured method to −187; the owner saw the letters far too close, an overcorrection from the previous value.
- Rule: for optical choices show a range (e.g. 0 / −40 / −80 / −110 / −140) and let the owner pick.
- Verify: the gate links the options board for each optical decision.

**G10 · Recomposing a lockup in an app**
- Error: asked an app to place the symbol and the wordmark separately, which breaks the lockup construction.
- Rule: apps use the production lockup files; never recompose a lockup.
- Verify: hand-off messages reference lockup SVGs, not separate pieces.

**G11 · Splitting the symbol until it reads as something else**
- Error: a channel cut through the symbol made it read as a different, unrelated object.
- Rule: test every symbol change at 16/32/48 px and name the risky reading explicitly.
- Verify: small-size board attached with the reading noted.

## Presentation

**G12 · Abstract or confusing boards**
- Error: abstract imagery options confused the owner; two boards compared different things (favicon cut vs main symbol) without saying so.
- Rule: explain each document by its concrete use, and label exactly what each board shows.
- Verify: every board title says what is shown and at what size.

**G13 · Broken boards**
- Error: missing glyphs (✓ ✗ ō), overlapping labels, clipped descenders and captions.
- Rule: render every board and look at it before showing it; fix glyphs, overlap and clipping.
- How to capture with a browser (Playwright): set fixed and sticky elements (bars, sticky columns) to `position: static` before an element screenshot; add `?v=N` to the URL so a local server does not serve a cached version; wait for animations and iframes to finish; screenshots can take a moment to appear on disk, so check the file exists before reading it.
- Verify: the board was read back after its last change.

**G14 · Text instead of visuals**
- Error: the brand manual was a text index with pasted screenshots; the owner did not recognise it as a brand manual.
- Rule: follow `brand-manual-standard.md`.
- Verify: the manual is a visual guide (artboards), not a Markdown index.

**G18 · Bundled open questions**
- Error: a reply listed five pending decisions and closed with one open question covering several of them. The owner asked to be asked one question at a time, with options.
- Rule: ask the owner one decision at a time, with closed options (the question tool when available), and wait for the answer before the next one.
- Verify: each reply that asks the owner something contains exactly one question, and it offers options.

## Rules learned from a compliance audit

**G15 · Skill output templates unused**
- brand-discovery template sections, identity-system-spec fields and logo-design client-package were not produced.
- Rule: each template's sections become rows of the phase gate.

**G16 · Incomplete test matrices**
- Simulated photo, untested print sizes, no restraint tests (distinctiveness, two-second, sketchability, 1-inch print, lockup at 200/100/50/25 %), no trademark search.
- Rule: run every test the skill lists, or log the owner's decision to defer it.

**G17 · on-brand left as a placeholder**
- Rule: Phase 6 encodes the real tokens, logo rules and checklist from production files.

## Added on the owner's request

**G19 · Approvals without context**
- Error: three bare «yes» answers could not be traced to what they approved; one decision stayed unverified because the owner no longer remembered it.
- Rule: before asking for an approval, state in one line exactly what is being approved; log that line next to the owner's answer in `brand/decisions-log.md` (template: `assets/decisions-log-template.md`).
- Verify: every approval row in the log names the object approved, not only the answer.

**G20 · Logo before name clearance**
- Error: two tech companies with the same name as the brand surfaced after the logo was approved.
- Rule: a name and trademark search (OEPM, EUIPO, WIPO Global Brand Database, plus domains) is a Phase 1 gate row: done with evidence, or explicitly deferred by the owner and logged.
- Verify: the Phase 1 gate has the name-clearance row filled.

**G21 · Unpinned skill versions**
- Error: Phase 0 installed skills at one commit; a later install found the repository at a newer commit, with no record of whether installed skills had changed.
- Rule: record the source commit of every installed skill in `brand/00-setup/skills-setup.md`; when installing another skill later, diff the already-installed skills against the new commit and report changes to the owner.
- Verify: skills-setup lists one commit per skill and the result of the last diff.

**G22 · External research taken as fact**
- Error risk: owner-supplied research from an AI search tool mixes sourced and unsourced claims (prices, logo colours).
- Rule: log external research as an unverified input; verify every claim that will support a decision before stating it, and label the rest as unverified.
- Verify: each claim from external research used in a deliverable cites a checked source or carries «unverified».

**G23 · Reading a consumer repository on the wrong branch**
- Error: the app's UI texts were read from a working tree that another session had on a feature branch, not from the default branch; counts and «real» quotes did not match the default branch.
- Rule: when the brand is consumed by other repositories, read them at their default branch (`git show <branch>:<path>`), or state the branch read; check every quote labelled «real» against the default branch.
- Verify: each audit of a consumer repository names the branch and commit it read.

**G25 · Jargon in owner questions**
- Error: a question asked the owner to approve a «neutral scale 0-1000 interpolated in OKLab»; the owner did not understand the question.
- Rule: every question to the owner first says, in plain words, what the thing is, what problem it solves and where it will be used; technical terms (OKLab, tokens, 0-1000) go after that, or not at all.
- Second case: a question about a colour error listed hex values and contrast ratios; the owner did not understand the problem, what was happening or what each decision implied. Each option must also say what changes, where, and who will notice it.
- Third case: a question about a chart series cited token names, decision numbers and a skill line before showing the chart; the owner understood neither the question nor the suggestion. Lead with the screen and what the person sees ("the green bars in the weekly chart"), then the choice; codes and sources last.
- Verify: read the question as a non-designer; if any term needs a definition, rewrite it.

**G26 · Asking about a board the owner cannot see**
- Error: a question pointed the owner to a part of a board that was only named by a path in an earlier message; the owner could not tell which board was meant.
- Rule: a question about a board carries, inside the question itself, the board's full absolute path (or link) and the exact part to look at; open the board for the owner when the environment allows it.
- Verify: the question text alone is enough to find and read the board.

**G27 · Visual decisions asked in words**
- Error: the owner was asked to pick the colour of an information notice from text descriptions only, and had to ask for an image.
- Rule: any decision about something that is seen (colour, shape, size, spacing, layout) is asked with a board that shows every option in a realistic use, rendered and checked before the question (G13, G26).
- Verify: each visual question names its board and the board shows every option.

**G24 · Project facts inside the skill**
- Error: a proposed guardrail named the project's own repositories; the owner pointed out that the skill is not specific to one project and will be used in many others.
- Rule: the skill's rules, templates and checklists stay project-agnostic; project facts (brand, repositories, colours, file paths, decisions) live in the project's files (`brand/`, the decisions log, the project's CLAUDE.md).
- Verify: grep the skill for the current project's name, repositories and brand values, and for any link, file or example the owner supplied (they belong to the project); there are no matches.

**G28 · Options the eye cannot tell apart**
- Error: the owner was asked to choose between animation speeds of 120, 160 and 240 ms; the owner saw no noticeable difference between them.
- Rule: before asking the owner to choose, check that the options differ visibly to a non-designer at normal viewing (same distance, real speed, no measuring). If they do not, do not ask: propose one value with its reason and include it in what the owner approves at the end of the deliverable.
- Verify: each optical question's board was viewed side by side at real size and speed, and the differences were noticeable without labels.

**G29 · Timid ranges for a brand moment**
- Error: three loader animations for the brand symbol were all small, quiet variations; the owner found them poor and asked for more expressive attempts.
- Rule: when exploring a signature or brand moment (animation, mark, illustration), span the range from restrained to expressive; include at least one bold option, then let the owner pull it back.
- Verify: the options board has at least one option a non-designer would call expressive, and its caption says so.

**G30 · Construction drawn after the logo was approved**
- Error: the logo was approved with its construction only as coordinates in text; the dimensioned drawing was made phases later, after the favicon, app files and animations had been built on the logo, and it found figures in the text that did not match the drawing. The owner asked to change the skill so this step happens at the right moment.
- Rule: the construction drawing is a check, not paperwork. Draw it in Phase 3, over the production files, measure every figure from the drawing, fix what it reveals, and ask for the logo approval with the drawing attached. Nothing that uses the logo starts before that approval.
- Verify: the Phase 3 gate links the construction SVGs, and the logo approval in the decisions log is dated after them.

**G31 · Saying a board is open without checking where it opened**
- Error: three SVG files were sent to the system opener and the owner was told they were open in the browser; the system opened SVG with another application, and the owner could not find them.
- Rule: open boards as one HTML page in the browser (check the system's default handler for the file type first), confirm the page loads every image, and say in the question exactly what was opened and with which application, plus the path to open it by hand.
- Verify: the default handler for the opened file type is the browser, and the page's images all loaded before the question was asked.

**G32 · Measuring the drawing instead of constructing it**
- Error: the construction drawing of the symbol measured the existing coordinates and presented them as its construction, with no unit shared by the whole logo. The owner pointed out that the measures had been fitted to the existing drawing instead of the other way round: a construction picks one element of the logo (usually a letter) as the unit and derives spaces and sizes from it.
- Rule: pick the unit first (usually a letter measure of the wordmark, such as cap height or x-height, or a module of the symbol tied to it) and derive the symbol's parts, the lockup spacing and the clear space from it. Express every dimension in that unit. If an approved drawing does not fit the unit, report it as a finding with a board and let the owner decide; never present a survey of the drawing as its construction.
- Verify: the construction drawing names one unit, and every dimension on it is a stated multiple of that unit or is flagged as not fitting.

**G33 · Work done in an order that forced rework**
- Error: the skill fixed only the order of phases. Inside them, work that uses the logo (favicon, app files, an animation) was built before the logo had a unit and a construction drawing; colour was extended in pieces after approval; voice was redone after the manual was drafted. Each late fix cascaded into approved work. The owner asked for a logical, optimal order for every piece of work, given the time and tokens lost.
- Rule: follow `work-order.md`: a step starts only when everything it needs is approved; owner inputs are asked in Phase 0; shared shapes and values come from generator scripts, never hand copies.
- Verify: each delivery names its step number in `work-order.md`, and every step it needs is approved in the decisions log.

**G34 · Generator inputs kept in a temporary folder**
- Error: the font and the Python environment the logo generator needs lived in a session's temporary folder; it vanished and the logo could not be rebuilt until both were fetched again. The owner expected the font to be stored in the repository.
- Rule: everything a generator needs to rebuild the brand files lives in the project: fonts with their licence (only when the licence allows redistribution; otherwise the exact source URL and a checksum), and a pinned dependency list. Only the environment built from that list lives outside.
- Verify: from a fresh clone, the documented commands rebuild the production files byte for byte.

**G35 · A step that needs a later step**
- Error: the work order put the client package in the logo step, before colour; the package was built with the wrong icon colour and had to be redone. A second review found more: the name search after discovery although it needs nothing from it, references asked for three times, the logo's rules written in two documents. The owner had asked several times for the task list to be reordered so that whatever a task needs comes before it.
- Rule: before starting a step, check each thing it produces against its «Needs»: if any output carries something decided later (colour, type, voice, a surface), that output belongs to the later step. Ask the owner each input once, in the earliest step that needs it. Write each rule in one document.
- Third case: the manual's CSS carried the brand's colour, type scale and spacing values typed by hand into a string; any later change to the source documents would leave the manual wrong. Token values in any generator are read from the approved documents, never typed.
- Verify: for every step in `work-order.md`, every input of every output is in its «Needs» or an earlier step; no owner question appears in two steps; no rule appears in two documents.

**G36 · Options without the expert's recommendation**
- Error: the owner was asked which colour versions of the logo to add, with four options and no recommendation; the owner ticked contradictory options and asked for expert advice.
- Rule: every design question carries the recommendation of the phase skill acting as the expert: which option, why, and the source (the skill's file:line, an approved rule or decision). Mark it as recommended and put it first. Options the skill makes mandatory are stated as such, not offered as a choice.
- Verify: each design question names one recommended option and cites where the recommendation comes from.

**G37 · Stating a consumer repository's state from an old read**
- Error: the owner was told a consumer app's default branch still had the framework's default icon and that the brand branch was unmerged; the read was taken earlier in the session, and the branch had moved since. The owner corrected it: the brand branch was merged.
- Rule: right before stating what a consumer repository holds, re-read its default branch in the same step and name the commit read; never reuse a read from earlier in the session. When another session works on that repository, ask it instead of guessing.
- Verify: every claim about a consumer repository names the commit, read in the same step as the claim.

**G38 · Application decisions shown out of context**
- Error: the owner was asked which drawing of the symbol to use in an app header, with the symbols shown alone on plain tiles; the owner could not tell where they would appear and asked to see them in the real website.
- Rule: when the product already exists, a decision about how the brand sits in it is shown on screenshots of the real screen (taken from the product's default branch, or by its own session), with each option in place; a schematic mock-up only when no real screen exists, and labelled as such.
- Verify: the board of each application decision contains a real screenshot of the screen it affects, with the branch and commit it was taken from.

**G39 · Mock-ups that merge screens**
- Error: a schematic mock-up of an app put the welcome screen and the connected screen's header in one window, so the logo looked duplicated; in the app they are two states that never show together.
- Rule: before drawing a mock-up of a product screen, read in the product's code which elements show together in each state, and draw one mock-up per state, labelled with the state. Never compose a screen from parts of different states.
- Verify: each mock-up's caption names the state and the file and lines that render it.

**G40 · Working past an open question**
- Error: the owner was asked whether to continue; without waiting for the answer, work went on with a request from another session, and a second question was left open on top. The owner could not follow the alternation of questions and work.
- Rule: once a question is asked, stop: no further work and no second question until the owner answers. A request from another session or tool that needs the owner's input waits until the open question is answered, and is then asked as its own question.
- Verify: no reply asks more than one question, and no work happens between a question and its answer.

**G41 · Colour options that are variations of one idea**
- Error: to recolour one chart series, the owner was shown two greys and one amber that merged with a neighbour series; the owner rejected all three.
- Rule: when a colour is chosen, the options cover different directions (another hue, another lightness of the same family, a neutral, a pattern or texture, or reworking the set it belongs to), not near variants of one. If the owner rejects them, ask which direction to explore before drawing new options.
- Verify: the options board names the direction of each option, and no two options share one.

**G42 · A palette with no secondary colours**
- Error: the colour step closed with one brand colour and two greys labelled «secondary»; the expert skill asks for 1 to 3 secondary colours that extend the palette. When the product's charts needed colours, there was nothing in the brand to draw them from, and two rounds of chart options were rejected. The owner asked to fix the corporate colours first, adding secondary and further colours as part of the brand.
- Second case: the brand's ink and paper colours were grouped as «primary» next to the one signature colour, contradicting the owner's later decision that the signature colour alone is the primary; found while building the manual.
- Rule: the colour step defines secondary colours with a hue of their own (greys, and the brand's ink and paper tones, are neutrals; the primary is the one signature colour), or logs the owner's decision to have none; if the product shows charts, it also defines the data palette from the brand colours, tested in light, dark and colour-blindness simulation.
- Verify: the colour document lists each secondary colour with its use, and, when there are charts, a data palette with its separation figures.

**G43 · Colours chosen without design principles, and shown in too much at once**
- Error: secondary brand colours were proposed from technical checks only (contrast, colour-blindness separation, distance from error colours), with no stated design principle; each option came with dark-mode variants and chart screenshots before any colour had been chosen. The owner asked for simple palettes, chosen on light first, each argued with the design and composition principles it rests on, and no charts.
- Rule: propose brand colours as plain swatches on the light background first, each option argued by named design principles (colour harmony relative to the existing colours, proportion, the approved creative direction) with their source; technical checks are a filter, not the argument. Dark variants and applications come only after a colour is chosen. Use a skill with a colour method when one exists; if none does, say so before proposing.
- Verify: each colour option on the board states its principle and source, and the board shows only swatches on light.

**G44 · Contradictions left behind when a rule changes**
- Error: building the manual found two documents contradicting each other: a logo entry animation described in the logo guidelines while the motion document says the logo is not animated, and the colour document labelling three colours «primary» after the owner had set one primary. Each came from a later decision that updated one document and not the others.
- Rule: in the same step that logs a decision, grep every project document for the old rule, its labels and its values, and update or flag each hit; then log which files changed.
- Verify: each decision row in the log names every file it changed, and a grep for the old wording returns no live rule.

**G45 · Identity documents missing fields the manual needs**
- Error: the manual had gaps (letter spacing, a contact channel) because the typography document and the setup step never asked for them, although the manual's skill lists both.
- Rule: each identity document fills every field of its section in the manual skill's template; the owner and contact channel are asked in setup. A field left empty is an owner decision, logged.
- Verify: the Phase 4 gate has one row per template field, and the manual has no «pending» placeholder.

**G46 · Recommendation sources quoted beyond what they say**
- Error: a question cited a template line as allowing the logo knocked out «on colour backgrounds»; the line says «on dark backgrounds».
- Rule: before citing a source in a question, read the cited lines in the same step and paraphrase only what they say; when the source does not cover the case, say so and name what the recommendation rests on instead.
- Verify: each file:line cited in a question says what the question claims, read in the same step.

**G47 · A prohibition decided as a side effect**
- Error: «never the logo on the brand colour background» entered the rules as a discarded option inside another approval, justified by a colour principle the agent wrote; the owner disagreed with the prohibition when it appeared in the manual.
- Second case: an approval of «motion rules plus an animated loader» was written down as «the logo never animates»; the owner wanted an animated logo signature for corporate videos and saw no reason to limit it while building the brand.
- Rule: every «never» rule about the logo, the palette or motion is asked as its own question, with a board showing the forbidden use in a real piece next to the allowed alternatives and the expert's recommendation; it is never inferred from a principle or bundled into another approval.
- Verify: each forbidden use in the logo guidelines and the colour document cites the decision that asked it directly.

**G48 · Options with no «leave it open» choice**
- Error: asked where an animated logo signature would be used, the owner was offered two places to use it; the owner wanted neither defined now, only the possibility kept open, and had to write a custom answer.
- Rule: when a question is about adding something new (an animation, a variant, a colour, a surface), include «don't define it now, leave it possible» as an option, unless the phase skill makes it mandatory, in which case say so.
- Verify: each question that adds something new has a «not now» option, or cites the line of the skill that makes it mandatory.

**G49 · Positioning written from the product docs only**
- Error: the positioning and its differentiators were condensed from the product's README; when the scope grew, the draft still missed a feature the owner sees as one of the product's main strengths.
- Rule: before drafting or rewriting positioning, mission or differentiators, ask the owner which strengths matter most and why; then verify each one in the product and state which competitors share it.
- Verify: each differentiator cites the owner's answer and the product evidence, and says whether a competitor offers it too.

**G50 · A consumer's value recorded without its role**
- Error: the brand recorded the colour an app uses on dark backgrounds as the value of the app's menu and chart token; the app's buttons use another token with another value. The owner approved a rule built on that wrong premise, and the manual stated it.
- Rule: when a brand document takes a value from a consumer product, record the token or variable name, its role (what it paints), file:line and commit, not the value alone; before approving a rule built on it, check the role in the product.
- Verify: every value labelled as coming from a product cites token, role, file:line and commit.

**G51 · A brand element used below its own minimum size**
- Error: the motion rules put the animated symbol inside buttons at 16 px, while the logo guidelines set the symbol's minimum at 32 px; at 16-24 px the animation read as a blur. The owner reverted to a spinner below 32 px.
- Rule: every rule that places the logo, the symbol or an animation of them at a size (icons, loaders, buttons, emails) checks that size against the logo's minimum sizes; below the minimum, use the small-size cut or a neutral element, never the full symbol.

**G52 · A manual with no layout work**
- Error: the first web manual put the approved documents one after another, with long tables and decision codes in the body. The owner rejected it: there was no layout work anywhere in the guide, only one thing after another.
- Rule: follow `brand-manual-standard.md` «How it is laid out» and work-order steps 5.1-5.6: layout directions first, spreads, the brand's own system, built and checked in blocks.
- Verify: the Phase 5 gate links the directions board with the owner's choice, and the browser checks of every block at the review width and 390 px.

**G53 · CSS classes clashing between generator modules**
- Error: modules of the manual generator reused the same unscoped class names; texts and a title turned grey, a button came out 4 px shorter and a colour bar stayed fixed on screen.
- Rule: one class prefix per section or component module; before delivering, run the duplicate-class check (`assets/manual-web/check_classes.py`) over every module.
- Verify: the check exits 0, and its output is in the gate.

**G54 · Production files that do not work on their own**
- Error: the construction drawings in `production/` linked a sibling folder that does not exist next to them; the working copy and the `production/` copy were kept in sync by hand.
- Rule: every SVG or HTML file in `production/` and in the client package is self-contained: resources embedded, or paths that exist inside the package itself. Production copies are written by the same generator run as the working files, or checked identical byte for byte.
- Verify: every `href` and `src` of those files resolves inside the package (list them with a command), and the copies compare equal.

**G55 · Test images leaking into deliverables**
- Error: reference photographs of other organisations, used only for a test in the logo phase, ended up in an example of the manual.
- Rule: every image brought in for a test or as a reference is stored with its provenance and marked «test only»; no deliverable uses it.
- Verify: the licence row of the gate lists every image of the deliverable with its provenance and licence, and none is marked «test only».

**G56 · A rejected generator still writing the deliverable**
- Error: after the manual was rebuilt with a new generator, the old one still wrote the same `index.html` and could overwrite the new version.
- Rule: when a deliverable is redone, retire the old generator's output in the same step (delete it, or point it elsewhere and log it).
- Verify: only one generator writes each deliverable path (grep the generators for the output path).

**G57 · Icons added from another source or by transforming an existing one**
- Error risk: the manual needed an arrow pointing left that the icon set in use did not have; flipping the right arrow or fetching it elsewhere would break the set's consistency.
- Rule: a new icon comes from the same source and version as the rest of the set (check that an icon already in use, downloaded again from there, matches byte for byte), is added to the list of icons in use and to their generator, and an existing icon is never rotated or mirrored to make it.
- Verify: the icon list names source and version for each icon, and the byte-for-byte check is logged.
