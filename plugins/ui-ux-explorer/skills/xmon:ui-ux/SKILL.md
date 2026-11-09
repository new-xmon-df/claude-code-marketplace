---
name: xmon:ui-ux
description: Analiza y resuelve problemas de UI/UX en cualquier stack frontend. Detecta el stack, entrega una spec implementation-ready (Problem Analysis / Recommended Solution / Implementation Notes / Rationale) y, si se pide, la implementa y la verifica en el navegador con Playwright. Úsalo para bugs visuales o de navegador, responsive, accesibilidad, alternativas de diseño de componentes y diseño de flujos antes de implementar.
---

# UI/UX Explorer

## Cuándo usar este skill

- Problema visual, de interacción, responsive o específico de un navegador.
- Comparar alternativas de diseño para un componente o flujo.
- Diseñar o rediseñar un flujo (onboarding, formulario con abandono, dashboard) antes de escribir código.
- Implementar una spec de UX ya existente.

## Modos de trabajo

Decide el modo según la petición; si es ambiguo, pregunta.

| Modo | Cuándo | Salida |
|---|---|---|
| **Spec** | Diseño de flujos, rediseños, cambios sobre flujos que los usuarios ya conocen, o el usuario pide "solo análisis" | Spec en el formato de abajo, sin código. Pide confirmación antes de implementar. |
| **Spec + implementación** | Por defecto para features o cambios con más de una alternativa razonable | Spec breve → el usuario elige → implementación → verificación |
| **Fix directo** | Bug concreto con causa evidente (cortes en móvil, hover en Safari) | Diagnóstico corto → fix → verificación |

---

## Paso 0: Detectar stack y contexto (OBLIGATORIO)

1. Busca en la raíz: `package.json`, `composer.json`, `components.json`, `tailwind.config.*`, `astro.config.*`, `next.config.*`, `nuxt.config.*`, `vite.config.*`, `angular.json`.
2. En `package.json` identifica framework (`next`, `react`, `astro`, `vue`, `nuxt`, `@angular/core`, `svelte`), librería de componentes (`@radix-ui/*`, `@mui/material`, `antd`, `@chakra-ui/react`, `bootstrap`) y styling (`tailwindcss`, CSS Modules, styled-components).
3. **shadcn/ui**: la señal fiable es `components.json` en la raíz. El CLI actual es el paquete `shadcn` (`npx shadcn@latest ...`); `@shadcn/ui` es un paquete antiguo y no indica nada.
4. Busca un design system propio (tokens, `theme`, componentes base, breakpoints) y respétalo antes de proponer nada.
5. En modo Spec, si faltan datos que cambian la recomendación (tipo de producto, perfil de usuario, restricciones de marca o de accesibilidad), pregunta antes de proponer.

Registra el resultado:

```
Stack: [framework] · UI lib: [lib] · Styling: [sistema] · Design system: [ruta o "no"]
Contexto UX: [producto, usuarios, restricciones relevantes]
```

## Paso 1: Comprobar MCPs disponibles

| MCP | Uso | Cómo detectarlo |
|---|---|---|
| Playwright | Capturas, viewports, verificación visual, consola | tools `mcp__playwright__*` o `mcp__plugin_playwright_playwright__*` |
| Context7 | Documentación actualizada de librerías | tools `mcp__context7__*` o `mcp__plugin_context7_context7__*` |
| shadcn | Listar, buscar y añadir componentes del registry | tools `mcp__shadcn__*` |
| Figma | Leer diseños y variables de Figma | tools `mcp__figma__*` o `mcp__plugin_figma_*` |

Si falta uno que sería útil para la tarea, sugiere instalarlo y pregunta si continuar sin él:

- Playwright: `claude mcp add playwright npx @playwright/mcp@latest`
- Context7 (no viene incluido en Claude Code): `npx ctx7 setup --claude`
- shadcn (en el proyecto): `npx shadcn@latest mcp init --client claude`
- Figma (servidor remoto): `claude mcp add --transport http figma https://mcp.figma.com/mcp` o el plugin `claude plugin install figma@claude-plugins-official`

## Paso 2: Diagnóstico

- Localiza el componente y los estilos implicados.
- Con Playwright: captura el estado actual en los viewports afectados, revisa consola y el árbol de accesibilidad (`browser_snapshot`).
- Sin Playwright: pide capturas o una descripción precisa (navegador, dispositivo, pasos).
- Compatibilidad entre navegadores: consulta caniuse.com o MDN con WebFetch; no afirmes soporte de memoria.
- Para cualquier API de librería (Radix, Tailwind, Next, etc.), consulta Context7 antes de recomendarla; las versiones cambian.

## Paso 3: Spec (formato obligatorio en modos Spec y Spec + implementación)

### Problem Analysis
- Qué falla o qué hay que lograr, impacto en usuarios y causa raíz (no solo síntomas).

### Recommended Solution
- Approach y comportamiento. Si hay varias opciones razonables, 2-3 alternativas con pros/contras y la recomendada marcada.
- Estados: default, hover, focus, active, disabled, loading, error, empty, success (los que apliquen).
- Microcopy donde aplique y jerarquía visual.

### Implementation Notes
- Desglose de componentes adaptado al stack detectado (qué componente de la UI lib usar, cuál falta instalar).
- Interacciones (click, teclado, focus), comportamiento responsive con los breakpoints del proyecto y animaciones si aplica.

### Rationale
- Por qué funciona, criterios de accesibilidad que cumple (WCAG 2.2 AA como mínimo) y alternativas descartadas con su motivo.

En modo Spec no escribas código. Si el cambio altera un flujo que los usuarios ya conocen, explica el coste de re-aprendizaje.

## Paso 4: Implementación

- Usa los componentes y tokens existentes del proyecto antes de crear nuevos; con shadcn, añade componentes vía MCP o CLI en lugar de copiarlos a mano.
- Cubre todos los estados especificados en la spec.

## Paso 5: Verificación

- Con Playwright: capturas antes/después en móvil, tablet y escritorio; navegación por teclado y foco visible; consola sin errores nuevos.
- Accesibilidad WCAG 2.2 AA: contraste, nombres accesibles, foco no oculto (2.4.11) y tamaño de objetivo (2.5.8).
- Sin Playwright: indica qué no has podido verificar.

## Cuándo sugerir otros plugins

Sugiere, no invoques. Solo si aplica, al final de la respuesta:

| Necesidad | Sugerencia | Instalación |
|---|---|---|
| SEO de la página (meta, datos estructurados, contenido) | `xmon:seo-audit` / `xmon:seo-content` | `/plugin install seo-toolkit@xmon-plugins` |
| Seguridad de flujos de auth o datos expuestos en la UI | `xmon:security-audit` | `/plugin install security-toolkit@xmon-plugins` |
| Backend o API Symfony detrás de la UI | `@symfony-expert` / `@api-platform-pro` | `/plugin install symfony-toolkit@xmon-plugins` |

## Checklist

- [ ] Paso 0: stack, UI lib, design system y contexto registrados
- [ ] MCPs comprobados; instalación sugerida solo si aporta
- [ ] Modo elegido (Spec / Spec + implementación / Fix directo)
- [ ] Spec con las 4 secciones cuando aplica
- [ ] APIs de librería y compatibilidad verificadas con Context7 o fuentes web
- [ ] Verificación con Playwright o limitaciones declaradas
