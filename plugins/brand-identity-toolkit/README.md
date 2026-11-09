# brand-identity-toolkit

Plugin para Claude Code que lleva un **proyecto de identidad de marca de principio a fin**: estrategia, dirección creativa, logotipo, sistema de identidad, manual de marca y guardián de marca. Obliga a cumplir cada fase, cada paso de las skills de fase y cada guardrail, en un orden de trabajo por dependencias para no rehacer trabajo aprobado.

## Qué incluye

### Skill `xmon:brand-identity-pipeline`

- **Prompt de fases** (`assets/pipeline-prompt.md`): plantilla del contrato del proyecto; cada proyecto guarda su copia rellena en `brand/00-setup/pipeline-prompt.md`.
- **Orden de trabajo** (`references/work-order.md`): cada paso con lo que necesita y lo que lo usa, de la fase 0 (setup) a la 6 (guardián de marca).
- **Mapa de skills** (`references/skill-map.md`): qué skill de fase usar, qué archivos leer y a qué otras skills deriva.
- **Guardrails** (`references/guardrails.md`): errores de proyectos anteriores y la regla que los evita.
- **Gate por fase** (`assets/phase-gate.md`), **pie de entrega**, **registro de decisiones** y **snapshot de progreso** (`brand/progress.md`).

**Cuándo usarlo**: crear o rediseñar un logotipo, una identidad visual o un manual de marca, o retomar un proyecto así.

### Banda de progreso

Sobre el prompt muestra el paso actual de `brand/progress.md`, cuántos están cerrados y cualquier paso anterior que siga abierto. Se refresca al empezar la sesión, al enviar cada prompt y al acabar cada turno. El comando `/progreso` relee el archivo a demanda. En proyectos sin `brand/progress.md` no dibuja nada.

## Dependencias

Las skills de cada fase (`brand-discovery`, `creative-direction`, `logo-design`, `brand-identity`, `brand-style-guide`, `brand-voice`, `on-brand`) no vienen en el plugin: la skill las instala en el `.claude/skills/` del proyecto durante la fase 0, desde [rampstackco/claude-skills](https://github.com/rampstackco/claude-skills), y registra el commit de cada una.

## Idioma

La skill y sus referencias están en inglés; la plantilla del prompt de fases y los textos de la banda, en español. Es una excepción deliberada a la convención del marketplace: son reglas afinadas en un proyecto real y traducirlas podría cambiar su sentido.

## Instalación

1. Añade el marketplace (una sola vez):

   ```
   /plugin marketplace add new-xmon-df/claude-code-marketplace
   ```

2. Refresca el marketplace e instala el plugin:

   ```
   /plugin marketplace update
   /plugin install brand-identity-toolkit@xmon-plugins
   ```

## Ejemplos de invocación

```
/xmon:brand-identity-pipeline empezamos la identidad de marca de este producto
/xmon:brand-identity-pipeline retoma el proyecto de marca
/progreso
```

## Tests de la banda

```bash
claude plugin test plugins/brand-identity-toolkit
```

## Licencia

MIT — ver el repositorio del marketplace.
