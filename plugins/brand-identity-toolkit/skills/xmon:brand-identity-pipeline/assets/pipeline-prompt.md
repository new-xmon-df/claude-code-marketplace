<!-- Template of the owner's phase contract. At project start, copy it to the
project's brand/00-setup/pipeline-prompt.md and fill the placeholders:
{ruta-del-boceto} = path of the sketch the logo starts from. That filled copy is
the contract of the project. -->

Actúa como director creativo, diseñador de identidad visual y consultor de marca senior.

Voy a desarrollar la identidad visual completa de mi marca mediante un proceso profesional, iterativo y documentado.

IMPORTANTE — INSTALACIÓN OBLIGATORIA DE SKILLS
Antes de comenzar cualquier trabajo de diseño, comprueba qué skills están disponibles.

Si no están instaladas, instálalas tú mismo antes de continuar. No me digas simplemente que “no están disponibles”: instálalas o indícame exactamente el comando que debo ejecutar y espera a que estén disponibles.

Instala o habilita estas skills:

1. brand-discovery
2. creative-direction
3. logo-design
4. brand-identity
5. on-brand

Fuente preferida:
- Repositorio: https://github.com/rampstackco/claude-skills
- Instala las skills relevantes en el proyecto, preferiblemente en:
  .claude/skills/<nombre-de-la-skill>/SKILL.md

Procedimiento obligatorio:
1. Ejecuta una comprobación de las skills disponibles.
2. Si falta alguna, busca e instala la skill correspondiente desde el repositorio indicado o desde el mecanismo oficial de plugins de Claude Code.
3. Si una skill no existe con ese nombre exacto, busca la equivalente más cercana, instala la más adecuada y renómbrala o crea un wrapper en .claude/skills/ con el nombre solicitado.
4. Si no puedes instalarla automáticamente, crea la skill mínima necesaria en .claude/skills/<nombre>/SKILL.md, con frontmatter YAML válido y instrucciones profesionales.
5. No continúes con el análisis del boceto hasta confirmar qué skills están activas y qué método has usado para instalarlas o crearlas.

No inventes que una skill está instalada. Verifícalo antes.

CONTEXTO INICIAL
- Tengo un primer boceto del logotipo en: @{ruta-del-boceto}
- Ese boceto es la referencia creativa principal: analízalo antes de proponer nada.
- No descartes ni rediseñes el concepto sin explicarme qué conservarías, qué mejorarías y por qué.
- No generes todavía ningún archivo final ni tomes decisiones irreversibles.

SKILLS Y RESPONSABILIDADES
1. `brand-discovery`: estrategia, posicionamiento, público, diferenciación, tono y territorio visual.
2. `creative-direction`: concepto, referencias, principios de diseño y criterios de evaluación.
3. `logo-design`: análisis, evolución y producción de variantes del logotipo a partir de @{ruta-del-boceto}.
4. `brand-identity`: sistema visual completo: color, tipografía, iconografía, fotografía, composición, aplicaciones y coherencia.
5. `on-brand`: validación de coherencia de marca en todas las entregas posteriores.
6. Capacidades nativas de creación de documentos: manual final en Markdown y, tras mi aprobación, PDF/Word.

No mezcles fases. Completa cada fase, preséntame opciones y espera mi aprobación antes de continuar.

FASE 0 — PREPARACIÓN Y ANÁLISIS DEL BOCETO

0.1 Comprobación e instalación de skills
- Lista las skills disponibles.
- Instala las que falten según las reglas anteriores.
- Crea las carpetas necesarias:
  .claude/skills/brand-discovery/
  .claude/skills/creative-direction/
  .claude/skills/logo-design/
  .claude/skills/brand-identity/
  .claude/skills/on-brand/
- Confirma explícitamente: skill instalada, creada como wrapper o pendiente de acción manual.
- No avances hasta que `logo-design`, `brand-identity`, `brand-discovery` y `creative-direction` estén operativas.

0.2 Análisis del boceto
1. Lee y analiza @{ruta-del-boceto}.
2. Describe objetivamente lo que ves:
   - Forma y composición.
   - Símbolo, tipografía y relación entre ambos.
   - Peso visual, estilo y posibles referencias.
   - Problemas técnicos o de legibilidad.
3. Identifica los elementos fuertes que deben conservarse.
4. Identifica riesgos:
   - Legibilidad.
   - Escalado y tamaño mínimo.
   - Reproducción en una tinta.
   - Parecido con otras marcas.
   - Complejidad.
   - Versatilidad.
   - Ambigüedad conceptual.
5. Propón una hipótesis de dirección creativa basada en el boceto, sin sustituirlo todavía.
6. Hazme preguntas solo si falta información esencial para avanzar.

Entregable de la Fase 0:
- brand/00-setup/skills-setup.md
- brand/00-setup/sketch-analysis.md

En `skills-setup.md`, documenta:
- Skills disponibles.
- Skills instaladas.
- Ruta exacta de cada `SKILL.md`.
- Método de instalación.
- Skills creadas como alternativa.
- Comandos ejecutados o pendientes.

En `sketch-analysis.md`, documenta:
- Lectura visual objetiva.
- Fortalezas.
- Riesgos y mejoras.
- Hipótesis de dirección creativa.
- Preguntas esenciales antes de la Fase 1.

FASE 1 — ESTRATEGIA DE MARCA
Usa `brand-discovery` y crea:

brand/01-brief/brand-brief.md

Incluye:
- Nombre, sector y descripción del negocio.
- Misión, visión y propuesta de valor.
- Público objetivo y contextos de uso.
- Posicionamiento y diferenciación.
- Personalidad de marca: 3–5 atributos con explicación.
- Tono de voz y ejemplos de copy.
- Competencia y referencias visuales.
- Restricciones: idioma, mercados, soportes, accesibilidad, impresión y digital.
- Riesgos legales o de parecido que deba revisar antes del diseño final.

No propongas colores ni tipografías todavía.

FASE 2 — DIRECCIÓN CREATIVA
Usa `creative-direction` y crea:

brand/02-creative-direction/creative-direction.md

Incluye:
- Concepto central de la marca.
- Metáfora visual o narrativa.
- Principios de diseño: 3–5 reglas accionables.
- Territorio estético y referencias.
- Criterios para aceptar o rechazar propuestas.
- Cómo debe evolucionar el boceto existente sin perder su idea original.
- Lista de decisiones que debo aprobar antes de diseñar.

FASE 3 — LOGOTIPO
Usa `logo-design` y trabaja a partir de @{ruta-del-boceto}.

Entrega primero una auditoría y propuesta de evolución:
- Qué conservar del boceto.
- Qué corregir y por qué.
- 3 direcciones de refinamiento distintas, cada una con justificación.
- Para cada dirección: composición, tipografía, proporciones, contraste, escalabilidad y encaje con la estrategia.

Después de que elija una dirección:
- Crea al menos 6 variantes:
  1. Wordmark.
  2. Lockup horizontal.
  3. Lockup vertical.
  4. Símbolo aislado.
  5. Monograma o letterform.
  6. Versión reducida / favicon.
- Genera archivos SVG editables, limpios y con nombres descriptivos.
- Prueba cada variante en:
  - 16 px.
  - 32 px.
  - Fondo claro.
  - Fondo oscuro.
  - Una tinta negra.
  - Una tinta blanca.
  - Aplicación sobre fotografía.
- Documenta:
  - Márgenes de protección.
  - Tamaño mínimo recomendado.
  - Usos incorrectos.
  - Construcción y proporciones.
- Entrega una presentación de decisión con ventajas, inconvenientes y recomendación.

Guarda los archivos aprobados en:
brand/03-logo/production/

FASE 4 — SISTEMA DE IDENTIDAD
Usa `brand-identity` y crea:

brand/04-brand-system/colors.md
brand/04-brand-system/typography.md
brand/04-brand-system/iconography.md
brand/04-brand-system/imagery.md
brand/04-brand-system/layout.md
brand/04-brand-system/voice.md
brand/04-brand-system/applications.md

Incluye en cada archivo:
- Reglas concretas.
- Ejemplos correctos e incorrectos.
- Tokens reutilizables.
- Criterios de accesibilidad y contraste.

Especificaciones mínimas:
- `colors.md`: paleta primaria, secundaria, funcional y de estado; HEX, RGB, CMYK aproximado y contraste WCAG.
- `typography.md`: familia principal, secundaria si procede, jerarquía, tamaños, interlineado, pesos y alternativas de Google Fonts.
- `iconography.md`: estilo, grosor de trazo, esquinas, tamaño base y ejemplos.
- `imagery.md`: estilo fotográfico, tratamiento, composición, prohibiciones y ejemplos.
- `layout.md`: retícula, espaciado, jerarquía y principios de composición.
- `voice.md`: tono, vocabulario, ejemplos de textos y antipatrones.
- `applications.md`: web, móvil, email, redes, documentación, packaging, señalética y merchandising si aplica.

FASE 5 — MANUAL DE MARCA
Crea:

brand/05-brand-guidelines/brand-guidelines.md

El manual debe incluir:
1. Introducción y propósito.
2. Estrategia y personalidad.
3. Logotipo: versiones, construcción, área de protección, tamaños mínimos, versiones monocromas y usos incorrectos.
4. Sistema cromático.
5. Tipografía.
6. Iconografía.
7. Imaginería y fotografía.
8. Composición y jerarquía visual.
9. Aplicaciones digitales y físicas.
10. Tono de voz.
11. Gobernanza: qué se puede modificar, qué requiere aprobación y quién es responsable.
12. Recursos y archivos de entrega.

Después de mi aprobación, genera una versión PDF con diseño limpio, índice, portada, secciones numeradas y ejemplos visuales.

FASE 6 — SKILL /on-brand
Crea:

.claude/skills/on-brand/SKILL.md

La skill debe:
- Leer los archivos de `brand/03-logo/production/` y `brand/04-brand-system/`.
- Aplicar los tokens de color, tipografía, espaciado y voz en cualquier entrega futura.
- Validar contraste, jerarquía, consistencia y uso correcto del logo.
- Advertir o rechazar propuestas que rompan las reglas de marca.
- Incluir un checklist de validación antes de entregar cualquier material.

REGLAS DE TRABAJO
- Trabaja de forma incremental: una fase, opciones, mi aprobación y después la siguiente.
- No inventes información sobre mi negocio: pregúntame cuando falte un dato esencial.
- No uses imágenes, logos, tipografías o colores de terceros sin verificar licencia.
- Prioriza accesibilidad, legibilidad, escalabilidad y reproducibilidad.
- Mantén todos los entregables en archivos Markdown y SVG dentro de la estructura de carpetas indicada.
- Antes de cada entrega, muestra:
  1. Decisiones tomadas.
  2. Decisiones pendientes.
  3. Siguientes pasos.
- Si detectas que el boceto original es conceptualmente fuerte pero técnicamente débil, propón una evolución fiel, no un rediseño desde cero.
- Si una skill no puede instalarse, créala como skill local mínima y continúa; no detengas el proyecto ni me pidas que la busque yo.

EMPIEZA AHORA POR LA FASE 0.
