# xmon-plugins

Marketplace de plugins personalizados para Claude Code.

## Instalación

Para instalar plugins de este marketplace, usa el comando:

```bash
claude /install-plugin xmon-plugins/<plugin-name>
```

Por ejemplo:

```bash
claude /install-plugin xmon-plugins/ui-ux-explorer
```

## Plugins disponibles

### ui-ux-explorer

**Skill**: `/xmon:ui-ux`

Skill para explorar soluciones UI/UX, diagnosticar problemas de interfaz, y encontrar alternativas de diseño.

**Casos de uso**:
- Problemas visuales o de interacción en tu UI
- Explorar alternativas de diseño para componentes
- Resolver problemas de responsive design
- Bugs específicos de navegadores
- Mejorar la UX de funcionalidades existentes

**Ejemplos**:

```
/xmon:ui-ux el dropdown se ve cortado en móvil
/xmon:ui-ux quiero mejorar la UX del formulario de login
/xmon:ui-ux el hover no funciona en Safari
```

### git-toolkit

**Comando**: `/commit`

Slash command para generar commits siguiendo Conventional Commits en español. Detecta automáticamente la configuración del proyecto:

- Si existe `commit-prompt.txt`, lo usa tal cual como prompt principal.
- Si existe `commitlint.config.js` / `.commitlintrc.js`, extrae `type-enum`, `scope-enum`, `scope-empty` y `header-max-length` como overrides.
- Si no hay nada, aplica reglas embebidas: español imperativo, scope opcional, subject ≤ 72 chars, sin firma de Claude.

**Casos de uso**:

- Estandarizar mensajes de commit entre todos tus proyectos sin copiar archivos.
- Respetar las convenciones específicas de cada repo (scopes cerrados, prompts custom).
- Garantizar que ningún commit lleve firma de Claude Code.

**Ejemplos**:

```
# Prepara los archivos primero
git add src/api/users.ts

# Lanza el comando
/commit
```

## Configuración del marketplace

Para añadir este marketplace a tu Claude Code, edita `~/.claude/settings.json`:

```json
{
  "plugins": {
    "marketplaces": [
      "https://github.com/new-xmon-df/claude-code-marketplace"
    ]
  }
}
```

## Estructura

```
xmon-plugins/
├── marketplace.json
├── README.md
└── plugins/
    └── ui-ux-explorer/
        ├── .claude-plugin/
        │   └── plugin.json
        └── skills/
            └── ui-ux-explorer.md
```

## Contribuir

¿Quieres añadir tu propio plugin? Crea un PR siguiendo la estructura de los plugins existentes.

## Licencia

MIT
