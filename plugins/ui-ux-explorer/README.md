# ui-ux-explorer

Plugin para Claude Code con un único skill, **`/xmon:ui-ux`**, que analiza y resuelve problemas de UI/UX en cualquier stack frontend: detecta el stack, entrega una spec implementation-ready, implementa la solución y la verifica en el navegador.

## Modos

| Modo | Cuándo | Salida |
|---|---|---|
| **Spec** | Diseñar o rediseñar flujos, o "solo análisis" | Spec sin código: Problem Analysis / Recommended Solution / Implementation Notes / Rationale |
| **Spec + implementación** | Features o cambios con varias alternativas razonables | Spec breve → eliges opción → implementación → verificación |
| **Fix directo** | Bug concreto con causa evidente | Diagnóstico corto → fix → verificación |

## Pasos

1. **Paso 0 — Detectar stack y contexto**: framework, UI library (shadcn/ui vía `components.json`), styling y design system del proyecto.
2. **Paso 1 — Comprobar MCPs**: Playwright, Context7, shadcn y Figma; sugiere instalar los que falten si aportan.
3. **Paso 2 — Diagnóstico**: capturas, consola y árbol de accesibilidad con Playwright; documentación de librerías con Context7.
4. **Paso 3 — Spec** en cuatro secciones, con estados del componente y accesibilidad WCAG 2.2 AA.
5. **Paso 4 — Implementación** con los componentes y tokens existentes.
6. **Paso 5 — Verificación** en varios viewports, teclado y foco.

## Ejemplos

```
/xmon:ui-ux el dropdown se ve cortado en móvil
/xmon:ui-ux el hover no funciona en Safari
/xmon:ui-ux solo análisis: nuestro formulario de contacto tiene 70% de abandono
/xmon:ui-ux diseña e implementa un sistema de notificaciones para el dashboard
```

## Instalación

1. Añade el marketplace (una sola vez):

   ```
   /plugin marketplace add new-xmon-df/claude-code-marketplace
   ```

2. Refresca el marketplace e instala el plugin:

   ```
   /plugin marketplace update
   /plugin install ui-ux-explorer@xmon-plugins
   ```

## MCPs opcionales

El skill funciona sin ninguno, pero detecta estos al arrancar y sugiere instalarlos si serían útiles:

| MCP | Instalación |
|---|---|
| Playwright | `claude mcp add playwright npx @playwright/mcp@latest` |
| Context7 (no viene incluido en Claude Code) | `npx ctx7 setup --claude` |
| shadcn (dentro del proyecto) | `npx shadcn@latest mcp init --client claude` |
| Figma (servidor remoto) | `claude mcp add --transport http figma https://mcp.figma.com/mcp` |

## Licencia

MIT — ver el repositorio del marketplace.
