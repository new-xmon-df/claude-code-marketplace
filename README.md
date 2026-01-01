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
