# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repo

Marketplace de plugins para Claude Code publicado bajo el nombre `xmon-plugins`. No hay build, ni tests, ni runtime: el repo es 100 % markdown + JSON consumido directamente por Claude Code al instalar un plugin desde el marketplace.

Owner: Juanjo García. Source público referenciado: `https://github.com/new-xmon-df/claude-code-marketplace`.

## Arquitectura del marketplace

Dos niveles, ambos obligatorios para que un plugin sea instalable:

1. **Registro a nivel marketplace** — [.claude-plugin/marketplace.json](.claude-plugin/marketplace.json) lista todos los plugins publicados (`name`, `description`, `version`, `author`, `source`, `category`). El campo `source` es una ruta relativa al directorio del plugin dentro de `plugins/`. Si un plugin existe en `plugins/` pero no está aquí, no se publica.
2. **Definición del plugin** — cada plugin vive en [plugins/<nombre>/](plugins/) y debe tener:
   - `.claude-plugin/plugin.json` con `name`, `version`, `description`, `author`. El `name` y la `version` deben coincidir con la entrada del marketplace.
   - `commands/*.md` (opcional) — slash commands, uno por archivo, con frontmatter `name` + `description`. El nombre del archivo (sin `.md`) es el comando que invoca el usuario (ej. `/seo-check`).
   - `skills/<skill-name>/SKILL.md` (opcional) — skills invocables por Claude. El nombre del directorio del skill usa la convención `xmon:<slug>` (ej. `xmon:ui-ux`, `xmon:seo-audit`). Ese mismo identificador va en el frontmatter `name:` del SKILL.md.
   - `agents/<agent-name>.md` (opcional) — subagentes invocables vía la herramienta `Agent` o como `@<agent-name>`. Cada archivo lleva frontmatter con `name`, `description`, `model` y `tools` (lista de tools permitidas). El nombre del archivo (sin `.md`) debe coincidir con el campo `name:` del frontmatter.

Un plugin puede combinar cualquier subconjunto de `commands/`, `skills/` y `agents/`. Ejemplos vivos: `seo-toolkit` y `security-toolkit` (commands + múltiples skills), `ui-ux-explorer` (solo-skill), `langchain-toolkit` (solo-agents).

## Convenciones

- **Namespace `xmon:`** — todos los skills de este marketplace se prefijan con `xmon:` para evitar colisiones con skills de otros marketplaces. Respetar el prefijo al crear skills nuevos.
- **Commands sin prefijo** — los slash commands NO llevan namespace; se invocan tal cual (`/seo-check`, `/security-check`). Asegúrate de que el nombre no choque con commands del core de Claude Code.
- **Idioma del contenido**: español. Todo el material de plugins (descripciones, skills, commands) está en español. Mantener consistencia.
- **Estructura típica de un SKILL.md**: frontmatter (`name`, `description`) → "Cuándo usar este skill" → "Paso 0: Detectar stack/entorno (OBLIGATORIO)" → pasos numerados → checklist final. Los skills están diseñados para ser stack-agnósticos: el primer paso siempre detecta el ecosistema (package.json, composer.json, etc.) antes de decidir qué herramientas usar.
- **Versionado**: SemVer en `marketplace.json` y `plugin.json` deben coincidir. Bumpea ambos en la misma operación al publicar cambios.

## Añadir un plugin nuevo

1. Crear `plugins/<nombre>/.claude-plugin/plugin.json` con los metadatos básicos.
2. Añadir `commands/`, `skills/xmon:<slug>/SKILL.md` y/o `agents/<agent>.md` según corresponda.
3. Registrar el plugin en `.claude-plugin/marketplace.json` (entrada con `name`, `description`, `version`, `author`, `source: "./plugins/<nombre>"`, `category`).
4. Si el plugin expone slash commands, documentarlos en el `README.md` del marketplace (sección "Plugins disponibles").

## Modificar un plugin existente

- **Tocar un skill** = editar `plugins/<plugin>/skills/<xmon:slug>/SKILL.md`. No olvidar bumpear `version` en `plugin.json` y en `marketplace.json` si el cambio es publicable.
- **Tocar la descripción que ve el usuario al instalar** = vive en TRES sitios y todos deben quedar coherentes: `marketplace.json`, `plugin.json` del plugin, y `README.md`.

## Convenciones de commits (proyecto)

Este repo sigue Conventional Commits con scope por plugin. Ejemplos del historial:
- `feat(seo-toolkit): añade detección i18n, herramientas automáticas y guía de contenido AI`
- `feat(marketplace): registra seo-toolkit en el marketplace`
- `chore: añade .gitignore para macOS, editores y logs`

Usar el nombre del plugin como scope (`seo-toolkit`, `security-toolkit`, `ui-ux-explorer`) o `marketplace` para cambios en `.claude-plugin/marketplace.json` y README.

## Instalación (referencia)

Los usuarios instalan plugins con `/plugin install <plugin-name>@xmon-plugins` (sintaxis oficial de Claude Code) después de añadir el marketplace a `~/.claude/settings.json` mediante el campo top-level `extraKnownMarketplaces`. Detalle completo en [README.md](README.md).

## Probar un plugin tras publicar

- Tras `git push`, los usuarios necesitan `/plugin marketplace update` antes de `/plugin install <plugin>@xmon-plugins`, porque el marketplace está cacheado localmente y no ve cambios hasta refrescar.
- Las instalaciones reales se trackean en `~/.claude/plugins/installed_plugins.json` con `scope: user | project | local` y `projectPath`. Si una desinstalación falla con "is enabled at project scope" pero el `settings.json` ya no contiene la entrada, ese archivo interno está desincronizado y hay que editarlo a mano (ningún comando `claude plugin` lo arregla).
- El Plugin Manager presenta 3 opciones al instalar y cada una escribe en un sitio: **Install for you** → `~/.claude/settings.json` (user, global); **Install for this project** → `<proyecto>/.claude/settings.json` (shared con equipo); **Install locally** → `<proyecto>/.claude/settings.local.json` (gitignored personal).

## Convención de cross-refs entre plugins

Los agentes del marketplace **sugieren** especialistas de otros plugins cuando un problema sale de su scope, pero **nunca invocan** otro agente directamente. La regla y el porqué:

- **Patrón estándar**: cada agente lleva una sección "Cuándo delegar" (o equivalente) con una tabla `cuándo derivar → a quién → comando de instalación si falta`. Al final de la respuesta, si aplica, emite un bloque del tipo:
  ```
  💡 Para <tarea> te recomiendo `@<agente>` del plugin `<plugin>@xmon-plugins`.
  Si no lo tienes instalado: /plugin install <plugin>@xmon-plugins
  ```
- **NO se invoca otro agente directamente** (vía la tool `Task`/`Agent`). Razones: el agente no puede saber con fiabilidad qué plugins están instalados (no hay API), el control queda en manos del usuario, evita bucles A→B→A, y mantiene predecibles los tokens.
- **Antes de derivar**, el agente da una respuesta razonable dentro de su scope. La sugerencia es para profundizar, no para evadir trabajo.
- **Naming de delegación**: en la prosa, los agentes se citan con `@<nombre>`, los skills con `xmon:<slug>` o `/xmon:<slug>` según contexto, los slash commands con `/<nombre>`.

Cross-refs válidos hoy (mantener actualizado al añadir plugins):

| Plugin | Pieza | Cómo citarlo en cross-refs |
|---|---|---|
| `git-toolkit` | command `/commit` | `/commit` |
| `git-toolkit` | agent `git-workflow-manager` | `@git-workflow-manager` |
| `ui-ux-explorer` | skill `xmon:ui-ux` | `/xmon:ui-ux` |
| `ui-ux-explorer` | agent `ux-consultant` | `@ux-consultant` |
| `seo-toolkit` | command `/seo-check` | `/seo-check` |
| `seo-toolkit` | skills `xmon:seo-audit`, `xmon:seo-content` | `xmon:seo-audit`, `xmon:seo-content` |
| `security-toolkit` | command `/security-check` | `/security-check` |
| `security-toolkit` | skills `xmon:security-audit`, `xmon:hardening` | `xmon:security-audit`, `xmon:hardening` |
| `langchain-toolkit` | agents `langchain-js-expert`, `langgraph-js-expert` | `@langchain-js-expert`, `@langgraph-js-expert` |
| `symfony-toolkit` | agents `symfony-expert`, `api-platform-pro` | `@symfony-expert`, `@api-platform-pro` |
| `code-quality-toolkit` | agent `code-reviewer` | `@code-reviewer` |

Al publicar un plugin nuevo, ampliar esta tabla y revisar si los agentes existentes deberían añadirlo a sus cross-refs (sin propagación automática, decisión consciente por cada agente).
