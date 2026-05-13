# ui-ux-explorer

Plugin para Claude Code con **pareja diseño + implementación de UI/UX** en español:

- **`/xmon:ui-ux`** (skill) — detecta tu stack frontend (React/Next/Vue/Astro/Angular + UI lib + styling) e **implementa** soluciones adaptadas. Pensado para resolver problemas concretos: responsive, bugs de navegador, alternativas de componentes, accesibilidad práctica.
- **`@ux-consultant`** (agente) — entrega **specs implementation-ready sin escribir código**: análisis del problema, solución recomendada, notas de implementación y rationale basado en heurísticas Nielsen, WCAG 2.1 AA, y patrones de productos validados (Linear, Stripe, Notion, Figma).

Diseñados para usarse en **pareja**: el agente especifica → el skill implementa.

## Cuándo usar qué

| Tu necesidad | Usa |
|---|---|
| "Mi dropdown se ve cortado en móvil" | `/xmon:ui-ux` (problema concreto, implementar fix) |
| "El hover no funciona en Safari" | `/xmon:ui-ux` (debugging cross-browser) |
| "Quiero un modal accesible adaptado a mi stack" | `/xmon:ui-ux` (implementación con UI lib) |
| "Necesito diseñar el onboarding para usuarios nuevos" | `@ux-consultant` (diseño previo, sin código) |
| "Mi formulario tiene 70% abandono, ¿qué hago?" | `@ux-consultant` (análisis UX + spec) |
| "Quiero rediseñar el sistema de notificaciones" | `@ux-consultant` (spec) → `/xmon:ui-ux` (implementar) |
| "¿Cómo planifico esta feature desde UX?" | `@ux-consultant` (specs primero) |

## Skill: `/xmon:ui-ux`

Skill universal stack-agnóstico. Sus pasos:

1. **Paso 0 — Detectar stack**: lee `package.json`/configs para identificar framework, UI library, sistema de styling.
2. **Paso 1 — Verificar MCPs disponibles**: Playwright, shadcn, Context7, Figma, Browser Tools. Sugiere instalación de los que falten y serían útiles.
3. **Paso 2 — Diagnóstico**: recopila info técnica (navegadores, dispositivos, console errors).
4. **Paso 3 — Análisis según stack**: consulta context7 a la librería correspondiente (`radix-ui/primitives`, `tailwindlabs/tailwindcss`, `vercel/next.js`, etc.).
5. **Paso 4 — Propuesta de soluciones**: 2-3 alternativas adaptadas con pros/contras.
6. **Paso 5 — Implementación**: con las herramientas del stack detectado.

**Ejemplos**:

```
/xmon:ui-ux el dropdown se ve cortado en móvil
/xmon:ui-ux quiero mejorar la UX del formulario de login
/xmon:ui-ux el hover no funciona en Safari
/xmon:ui-ux necesito un modal accesible
```

## Agente: `@ux-consultant`

Consultora senior con foco en **especificación, no implementación**. Output estructurado en 4 secciones:

1. **Problem Analysis** — qué falla, impacto en usuarios, causa raíz.
2. **Recommended Solution** — approach UX, comportamiento, estados (default/hover/loading/error/empty/etc.), copy/microcopy, jerarquía visual.
3. **Implementation Notes** — guidance estructural para el dev (sin código, pero detallado).
4. **Rationale** — por qué funciona, heurísticas que satisface, ejemplos de la industria, alternativas descartadas.

**Capacidades**:

- Onboarding flows, guided tours, tooltips
- Auditoría y optimización de layout/navegación
- Reducción de fricción en flujos complejos
- Resolución de problemas concretos (formularios con abandono, CTAs poco claros, jerarquía pobre)
- Planificación UX de features nuevas antes de implementar
- Aplicación de las 10 heurísticas de Nielsen citadas explícitamente
- WCAG 2.1 AA mínimo (AAA en contextos regulados)

**Ejemplos**:

```
@ux-consultant los editores se confunden con el flujo de subida de imágenes del CMS
@ux-consultant diseña un sistema de notificaciones para el dashboard admin
@ux-consultant nuestro formulario de contacto tiene 70% de abandono, analízalo
@ux-consultant planifica el onboarding para usuarios nuevos del admin
```

## Flujo recomendado (cuando aplica)

Para features nuevas o redesigns con scope amplio:

```
1. @ux-consultant <descripción del problema o feature>
   → recibes una spec completa (Problem / Solution / Implementation Notes / Rationale)

2. /xmon:ui-ux implementa la spec que me ha pasado @ux-consultant: [pega spec]
   → el skill detecta tu stack, consulta context7, y produce el código
```

Para problemas concretos / hotfixes UI: directamente `/xmon:ui-ux`.

## Instalación

1. Añade el marketplace a tu `~/.claude/settings.json` (campo top-level `extraKnownMarketplaces`):

   ```json
   {
     "extraKnownMarketplaces": [
       { "url": "https://github.com/new-xmon-df/claude-code-marketplace" }
     ]
   }
   ```

2. Refresca el marketplace e instala el plugin:

   ```
   /plugin marketplace update
   /plugin install ui-ux-explorer@xmon-plugins
   ```

Tras instalar, el skill queda disponible como `/xmon:ui-ux` y el agente como `@ux-consultant`.

## Licencia

MIT — ver el repositorio del marketplace.
