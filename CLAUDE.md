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

Un plugin puede tener solo commands, solo skills, o ambos. Ver `seo-toolkit` y `security-toolkit` como ejemplos de plugins con commands + múltiples skills; `ui-ux-explorer` como ejemplo de plugin solo-skill.

## Convenciones

- **Namespace `xmon:`** — todos los skills de este marketplace se prefijan con `xmon:` para evitar colisiones con skills de otros marketplaces. Respetar el prefijo al crear skills nuevos.
- **Commands sin prefijo** — los slash commands NO llevan namespace; se invocan tal cual (`/seo-check`, `/security-check`). Asegúrate de que el nombre no choque con commands del core de Claude Code.
- **Idioma del contenido**: español. Todo el material de plugins (descripciones, skills, commands) está en español. Mantener consistencia.
- **Estructura típica de un SKILL.md**: frontmatter (`name`, `description`) → "Cuándo usar este skill" → "Paso 0: Detectar stack/entorno (OBLIGATORIO)" → pasos numerados → checklist final. Los skills están diseñados para ser stack-agnósticos: el primer paso siempre detecta el ecosistema (package.json, composer.json, etc.) antes de decidir qué herramientas usar.
- **Versionado**: SemVer en `marketplace.json` y `plugin.json` deben coincidir. Bumpea ambos en la misma operación al publicar cambios.

## Añadir un plugin nuevo

1. Crear `plugins/<nombre>/.claude-plugin/plugin.json` con los metadatos básicos.
2. Añadir `commands/` y/o `skills/xmon:<slug>/SKILL.md` según corresponda.
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

Los usuarios instalan plugins con `claude /install-plugin xmon-plugins/<plugin-name>` después de añadir el marketplace a `~/.claude/settings.json`. Detalle completo en [README.md](README.md).
