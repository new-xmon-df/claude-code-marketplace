---
name: xmon:seo-audit
description: Auditoría SEO técnica y de contenido con puntuación sobre 100. Detecta stack y tipo de sitio, revisa indexación, meta tags, estructura, señales de experiencia y confianza, structured data y visibilidad en buscadores con IA. Incluye modo rápido (quick audit) y checks específicos para sitios de afiliados.
---

# SEO Audit

Auditoría SEO de un proyecto local o de una URL en producción, con foco en blogs y sitios de afiliados.

## Cuándo usar este skill

- Auditar el SEO de un sitio, una sección o una página concreta
- Revisar meta tags, estructura, structured data e indexabilidad
- Evaluar contenido de afiliados antes o después de publicar
- Revisar la visibilidad en buscadores con IA (AI Overviews, ChatGPT search, Claude)

Para optimizar un artículo concreto antes de publicarlo, usa `xmon:seo-content`.

---

## Modos

- **Auditoría completa** (por defecto): las 5 categorías del Paso 2-6, 100 puntos.
- **Quick audit**: se activa si el usuario pide "quick audit", "análisis rápido" o similar. Revisa solo:
  1. Title y meta description (existen, únicos, descriptivos)
  2. URLs/slugs legibles
  3. Un H1 y jerarquía de headers coherente
  4. Imágenes sin `alt`
  5. Links internos rotos

  Salida del quick audit: tabla `Elemento | Estado (OK/Aviso/Error) | Archivos | Acción`, sin puntuación global.

---

## Paso 0: Detectar stack y tipo de sitio (OBLIGATORIO)

Antes de auditar, identifica dónde se generan las etiquetas SEO.

### Archivos a buscar

```
# Meta-frameworks
astro.config.*        # Astro
next.config.*         # Next.js (app/ = App Router, pages/ = Pages Router)
nuxt.config.*         # Nuxt
svelte.config.*       # SvelteKit
gatsby-config.*       # Gatsby

# CMS headless
.directus/  sanity.config.* / sanity.json  strapi/  contentful.json

# CMS tradicionales
wp-config.php         # WordPress
sites/default/        # Drupal

# Generadores estáticos
hugo.toml / hugo.yaml / hugo.json      # Hugo
_config.yml                             # Jekyll
.eleventy.js / eleventy.config.*        # 11ty
mkdocs.yml                              # MkDocs
```

### Dónde mirar según el stack

| Stack | Meta tags / head | Structured data | robots / sitemap |
|---|---|---|---|
| Astro | `src/layouts/`, componentes `Head`/`SEO`, `astro-seo` | `<script type="application/ld+json">` en layouts | `public/robots.txt`, `@astrojs/sitemap` |
| Next.js App Router | `metadata` / `generateMetadata` en `layout`/`page` | `<script type="application/ld+json">` en `layout`/`page` | `app/robots.ts`, `app/sitemap.ts` |
| Next.js Pages Router | `pages/_app`, `pages/_document`, `next/head`, `next-seo` | componentes SEO | `public/` o rutas API |
| Nuxt | `nuxt.config` (`app.head`), `useHead`/`useSeoMeta`, `@nuxtjs/seo` | `nuxt-schema-org` | módulos de `@nuxtjs/seo` |
| SvelteKit | `<svelte:head>`, `svelte-meta-tags` | `<svelte:head>` | `static/`, rutas `+server` |
| WordPress | tema (`header.php`) o plugin SEO | plugin SEO | plugin SEO / `robots.txt` virtual |

**Gotcha Next.js App Router**: en páginas dinámicas, `generateMetadata` puede emitirse en streaming; para los bots listados en `htmlLimitedBots` se bloquea en el `<head>`. Si un crawler no ve los meta tags, revisa esa opción.

### Registrar el contexto

```
Stack detectado:
- Framework: [Astro/Next.js/Nuxt/WordPress/...]
- Renderizado: [SSG/SSR/SPA/Híbrido]
- CMS: [Directus/Strapi/WordPress/Ninguno]
- Tipo de sitio: [Blog/E-commerce/Afiliados/Docs/...]
- i18n: [Sí/No] - Idiomas: [...]
```

Si es una URL en producción, usa `WebFetch` para obtener el HTML final (meta tags, JSON-LD, canonical, hreflang). En SPAs sin SSR, avisa de que el HTML inicial puede no contener el contenido; si el MCP Playwright está disponible, úsalo para comparar con el DOM renderizado.

---

## Paso 1: SEO técnico (25 puntos)

| Check | Pts | Qué verificar | Penalizar |
|---|---|---|---|
| URLs | 5 | Legibles, en minúsculas, con guiones, jerarquía coherente, sin parámetros innecesarios | IDs numéricos (-2), mayúsculas/caracteres especiales (-2), muy largas (-1) |
| Title | 5 | Existe, único, descriptivo y conciso | Ausente o duplicado (-3), genérico (-2) |
| Meta description | 5 | Existe, única, resume la página | Ausente o duplicada (-3) |
| Headers | 5 | Un H1 descriptivo, jerarquía lógica | Varios H1 o ninguno (-3), saltos de nivel (-1) |
| Imágenes | 3 | `alt` descriptivo, formatos modernos, dimensiones adecuadas, lazy loading | Sin `alt` (-1 por patrón repetido) |
| Links internos | 2 | Anchor descriptivo, sin rotos, enlaces entre contenido relacionado | Links rotos (-2) |

Además (sin puntos, como hallazgo si falla): `canonical` correcto, `hreflang` en sitios multiidioma, `noindex` no intencionado, sitemap y `robots.txt` coherentes.

Nota sobre longitudes: Google no fija límite para `<title>` ni meta description; los trunca en resultados según el ancho del dispositivo. Rangos como 50-60 / 150-160 caracteres son solo orientativos para evitar truncado: no penalices por pasarse si el texto es conciso.

---

## Paso 2: Calidad de contenido (20 puntos)

| Check | Pts | Qué verificar |
|---|---|---|
| Cobertura | 5 | Resuelve la intención de búsqueda y los subtemas que el lector espera |
| Originalidad | 5 | Aporta algo propio: datos, pruebas, perspectiva; no es contenido genérico ni copiado |
| Precisión y actualidad | 5 | Datos correctos, fuentes citadas, fecha de publicación/actualización visible |
| Legibilidad | 5 | Párrafos cortos, listas y tablas donde ayudan, formato escaneable |

No puntúes por número de palabras: Google indica que no hay un mínimo ni máximo de longitud que afecte al ranking.

---

## Paso 3: Keywords, temas e intención (20 puntos)

| Check | Pts | Qué verificar |
|---|---|---|
| Término principal | 5 | Aparece de forma natural en title, H1, inicio del contenido y meta description |
| Cobertura temática | 5 | Variaciones naturales, preguntas reales de los usuarios, subtemas relacionados |
| Entidades | 5 | Productos, marcas, modelos, especificaciones y conceptos nombrados con precisión |
| Intención | 5 | El formato encaja con la intención (informacional, comercial, transaccional, navegacional) |

**No uses** "densidad de keyword" ni "keywords LSI" como criterio: Google ha dicho que no tiene una noción de densidad óptima y que las "LSI keywords" no existen como señal. La repetición excesiva es keyword stuffing, que va contra sus políticas de spam. Penaliza el stuffing (-3), no la falta de repeticiones.

Para afiliados, la intención suele ser comercial/transaccional: verifica que el contenido ayude a decidir (comparativas, criterios, pros y contras) antes de llevar al enlace.

---

## Paso 4: Experiencia y confianza — E-E-A-T (20 puntos)

E-E-A-T es el marco con el que Google describe el contenido útil y fiable; Google aclara que no es un factor de ranking en sí mismo. Se puntúa como indicador de calidad.

| Check | Pts | Qué verificar |
|---|---|---|
| Experiencia | 5 | Evidencia de uso real: fotos/vídeos propios, mediciones, detalles de primera mano |
| Expertise | 5 | Autor identificado con bio, credenciales o trayectoria relevante |
| Autoridad | 5 | Fuentes de calidad citadas, menciones o enlaces de terceros |
| Confianza | 5 | HTTPS, contacto, política de privacidad, disclosure de afiliados, reviews genuinas |

**Afiliados — checks críticos**:
- Las reviews deben basarse en experiencia real. Si el texto afirma haber probado un producto y no hay ninguna evidencia, márcalo como hallazgo de prioridad alta: Google pide aportar evidencia de experiencia propia en reviews, y la FTC (EE. UU.) prohíbe reviews que tergiversan la experiencia del autor.
- Disclosure de afiliación visible cerca de las recomendaciones y enlaces, no solo en el footer.
- Enlaces de afiliado marcados con `rel="sponsored"` (Google lo prefiere; `nofollow` sigue siendo aceptable).

---

## Paso 5: Structured data y visibilidad en IA (15 puntos)

| Check | Pts | Qué verificar |
|---|---|---|
| Indexable y con snippet | 5 | Página indexable y sin `nosnippet`/`max-snippet`/`data-nosnippet` no intencionados. Es el único requisito técnico de Google para AI Overviews y AI Mode |
| Extractabilidad | 5 | Respuestas directas, definiciones claras, tablas comparativas, datos con fuente |
| Structured data válido | 5 | JSON-LD que coincide con el contenido visible, de tipos que Google soporta y sin errores en el Rich Results Test |

### Structured data: qué puntúa

- **Puntúa**: `Article`/`BlogPosting`, `BreadcrumbList`, `Organization`, `Product` (con `Offer` si aplica), `Review`/`AggregateRating` sobre tipos válidos (`Product`, `SoftwareApplication`, `Book`, etc.).
- **No puntúa**: `FAQPage` y `HowTo`. Google dejó de mostrar el rich result de HowTo en 2023 y el de FAQ en 2026. No los presentes como críticos ni como mejora de visibilidad en Google. Si ya existen, no penalices: Google indica que el structured data que no usa no causa problemas.
- **Penaliza** (-3): reviews o ratings falsos o incentivados sin declarar, ratings agregados de otros sitios, o reviews autogestionadas en `LocalBusiness`/`Organization`. Google puede aplicar acciones manuales por ello.

### Crawlers de IA (decisión del propietario, no puntúa)

Revisa `robots.txt` e informa de qué está permitido o bloqueado; no recomiendes bloquear o permitir sin preguntar:

| Token | Empresa | Uso |
|---|---|---|
| `Google-Extended` | Google | Uso para entrenar y fundamentar Gemini. No afecta a la inclusión ni al ranking en Google Search |
| `GPTBot` | OpenAI | Entrenamiento de modelos |
| `OAI-SearchBot` | OpenAI | Aparecer en ChatGPT search |
| `ChatGPT-User` | OpenAI | Visitas iniciadas por un usuario; robots.txt puede no aplicarse |
| `ClaudeBot` | Anthropic | Entrenamiento de modelos |
| `Claude-SearchBot` | Anthropic | Indexación para búsqueda en Claude |
| `Claude-User` | Anthropic | Visitas iniciadas por un usuario de Claude |

Bloquear los crawlers de búsqueda (`OAI-SearchBot`, `Claude-SearchBot`) reduce la visibilidad en esos buscadores; bloquear los de entrenamiento no.

### `llms.txt`

Es una propuesta comunitaria (llmstxt.org), no un estándar. Google indica que no hacen falta archivos de texto para IA ni markup especial para aparecer en sus funciones de IA. No lo puntúes ni lo presentes como requisito; si existe, menciónalo solo como informativo.

---

## Paso 6: Reporte

### Puntuación

| Categoría | Máx | Obtenidos |
|---|---|---|
| SEO técnico | 25 | X |
| Calidad de contenido | 20 | X |
| Keywords, temas e intención | 20 | X |
| Experiencia y confianza (E-E-A-T) | 20 | X |
| Structured data y visibilidad en IA | 15 | X |
| **Total** | **100** | **X** |

| Rango | Nivel | Acción |
|---|---|---|
| 90-100 | Excelente | Mantener y monitorizar |
| 75-89 | Bueno | Optimizaciones menores |
| 60-74 | Mejorable | Priorizar mejoras |
| 40-59 | Deficiente | Revisión urgente |
| < 40 | Crítico | Replantear estrategia |

### Formato

```markdown
# Auditoría SEO

**URL/Proyecto**: [Nombre]
**Fecha**: [Fecha]
**Stack**: [Stack detectado]
**Tipo de sitio**: [Blog/Afiliados/...]

## Puntuación global: X/100

[Tabla de puntuación por categoría]

## Hallazgos de prioridad alta

### [SEO-001] [Título]
**Categoría**: Técnico / Contenido / Keywords / E-E-A-T / Structured data-IA
**Impacto**: -X puntos
**Problema**: [Descripción]
**Solución**: [Cómo corregirlo]
**Archivos afectados**: [lista]

## Hallazgos de prioridad media
...

## Hallazgos de prioridad baja
...

## Quick wins
1. [Acción]

## Recomendaciones para afiliados
1. [Específicas del nicho]

## Fuera de puntuación
- Crawlers de IA permitidos/bloqueados: [...]
```

---

## Herramientas de verificación

- Google Search Console (indexación real, URL Inspection)
- PageSpeed Insights (Core Web Vitals)
- Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org

---

## Checklist de ejecución

- [ ] Detectar stack, tipo de sitio e i18n (Paso 0)
- [ ] Elegir modo: completo o quick audit
- [ ] Auditar SEO técnico
- [ ] Evaluar calidad de contenido
- [ ] Evaluar keywords, cobertura temática e intención
- [ ] Revisar señales de experiencia y confianza (afiliados: experiencia real y disclosure)
- [ ] Revisar structured data, snippets y crawlers de IA
- [ ] Calcular puntuación y generar el reporte con hallazgos priorizados
