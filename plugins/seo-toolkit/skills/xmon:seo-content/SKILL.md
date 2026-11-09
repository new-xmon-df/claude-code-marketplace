---
name: xmon:seo-content
description: Optimiza contenido antes de publicar en blogs y sitios de afiliados. Detecta el sistema de contenido, ajusta front matter, estructura, cobertura temática, enlazado, structured data y disclosure de afiliados, y aplica un checklist de publicación. Para contenido asistido por IA, exige verificar datos y nunca inventar experiencia ni reviews.
---

# SEO Content

Optimización de un artículo o página antes de publicar, con plantillas para blogs y sitios de afiliados.

## Cuándo usar este skill

- Vas a publicar un artículo o página nueva, o a actualizar uno existente
- Necesitas front matter coherente con el schema del proyecto
- Escribes reviews, comparativas o guías de compra con enlaces de afiliado
- Partes de un borrador generado con IA y necesitas dejarlo publicable

Para auditar un sitio entero con puntuación, usa `xmon:seo-audit`.

---

## Paso 0: Detectar el sistema de contenido (OBLIGATORIO)

Antes de tocar nada, identifica cómo se gestiona el contenido y qué campos admite.

### Archivos a buscar

```
# Astro content collections
src/content.config.ts     # Astro 5+ (glob loader)
src/content/config.ts     # Formato legacy

# CMS headless
.directus/  sanity/schemas/  strapi/api/

# Markdown/MDX
content/  posts/  articles/  *.md  *.mdx
contentlayer.config.*
```

### Qué extraer

1. **Formato y schema**: MDX/Markdown/JSON/CMS, campos obligatorios y opcionales, tipos validados (p. ej. `z.date()` en Astro).
2. **Nombres reales de campos**: `publishDate` vs `pubDate` vs `date`, `updatedDate`, `heroImage`, etc. Usa siempre los del proyecto, nunca los de las plantillas de abajo.
3. **i18n**: `src/i18n/`, `locales/`, `i18n.config.*`, bloque `i18n` en `astro.config.*`. Si es multiidioma: slugs por idioma, metadatos traducidos, `hreflang` y `canonical` coherentes.
4. **Taxonomías existentes**: categorías y tags ya usados, para no crear duplicados.

```
Sistema de contenido detectado:
- Formato: [MDX/Markdown/CMS]
- Schema: [Astro content collections/Contentlayer/Custom]
- Campos: [title, description, pubDate, ...]
- Categorías/Tags existentes: [...]
- i18n: [Sí/No] - Idiomas: [...]
```

---

## Paso 1: Front matter

Adapta esta plantilla a los nombres de campo detectados en el Paso 0:

```yaml
---
title: "Título descriptivo y conciso"
description: "Resumen de la página que invite al clic"
publishDate: AAAA-MM-DD
updatedDate: AAAA-MM-DD    # Visible en la página: ayuda a mostrar actualidad
author: "Nombre del autor" # Con página de autor/bio

# SEO
seo:
  canonical: "https://..." # Solo si es contenido republicado
  noindex: false

# Open Graph
image: "/images/og-image.jpg"  # 1200x630px
imageAlt: "Descripción de la imagen"

# Organización
category: "Categoría principal"
tags: ["tag1", "tag2"]
related: ["slug-1", "slug-2"]

# Afiliados
affiliate: true
affiliateDisclosure: true
products: ["producto-1", "producto-2"]

# Pista de structured data
schema:
  type: "Article"  # Article | BlogPosting | Review | Product
---
```

**Ejemplo para afiliados**:

```yaml
---
title: "Mejores auriculares Bluetooth [año]: comparativa"
description: "Comparamos sonido, batería y comodidad de los auriculares Bluetooth con mejor calidad-precio para ayudarte a elegir."
publishDate: AAAA-MM-DD
updatedDate: AAAA-MM-DD
author: "Nombre Autor"
image: "/images/auriculares-bluetooth-comparativa.jpg"
imageAlt: "Varios auriculares Bluetooth sobre una mesa de madera"
category: "Audio"
tags: ["auriculares", "bluetooth", "comparativa"]
affiliate: true
affiliateDisclosure: true
---
```

Usa `[año]` solo si el contenido se actualiza de verdad cada año; si no, omite el año en title y slug para no tener que cambiar la URL.

---

## Paso 2: Estructura

Reglas: un H1, jerarquía sin saltos, headers que anticipen el contenido.

**Guía (how-to)**:
```markdown
# Cómo [hacer X]

Intro: qué va a conseguir el lector y en qué contexto.

## Qué es [X] / Por qué [X]
## Paso 1: [Primer paso]
## Paso 2: [Segundo paso]
## Errores comunes al [hacer X]
## Preguntas frecuentes
## Conclusión
```

**Review/comparativa (afiliados)**:
```markdown
# [Mejor X para Y]: comparativa [año]

Intro: para quién es y cómo se ha hecho la comparativa.

## Resumen: top 3
[Tabla comparativa]

## Cómo los hemos evaluado
### Criterios y método (qué se probó, cuánto tiempo, en qué condiciones)

## Análisis detallado
### 1. [Producto A]: mejor en general
#### Pros y contras
#### Especificaciones
#### Experiencia de uso   <!-- solo si existe experiencia real del autor; ver Paso 8 -->

### 2. [Producto B]: mejor calidad-precio
...

## Tabla comparativa completa
## Guía de compra: qué mirar en [X]
## Preguntas frecuentes
## Conclusión: cuál elegir según tu caso
```

La sección "Preguntas frecuentes" se mantiene por su valor para el lector, no por rich results (ver Paso 6).

---

## Paso 3: Término principal, cobertura e intención

- Incluye el término principal de forma natural en title, H1, primer párrafo y meta description. Slug descriptivo y corto.
- **No trabajes con densidad de keyword ni con "keywords LSI"**: Google no tiene una densidad óptima y la repetición excesiva es keyword stuffing.
- Trabaja la **cobertura temática**: subtemas que el lector espera, preguntas reales (búsquedas relacionadas, Search Console, foros), variaciones naturales del término.
- Nombra **entidades** con precisión: modelo exacto, marca, especificaciones, versiones.
- Alinea formato e **intención**: informacional → guía; comercial → comparativa/“mejor X para Y”; transaccional → review con precio y disponibilidad.

### Patrones de título para afiliados

```
- Mejores [producto] para [caso de uso] [año]
- [Producto] review: [veredicto corto]
- [Producto A] vs [Producto B]: [criterio que decide]
- Alternativas a [producto popular]
- [Producto] calidad-precio
```

---

## Paso 4: Imágenes

- [ ] `alt` que describe la imagen (no "imagen1", no relleno de keywords)
- [ ] Nombre de archivo descriptivo (`auriculares-modelo-x-plegados.webp`)
- [ ] WebP/AVIF, dimensiones acordes al tamaño mostrado, lazy loading salvo la imagen principal
- [ ] Imagen OG 1200x630
- [ ] Afiliados: fotos propias del producto cuando existan (son evidencia de experiencia). Si no las hay, usa imágenes oficiales con su atribución y no las presentes como propias

---

## Paso 5: Enlazado

### Interno (silos/clusters)

```
              [Pilar: Auriculares Bluetooth]
                          |
      ------------------------------------------
      |                   |                    |
[Over-ear]           [In-ear]          [True wireless]
  - Reviews            - Reviews          - Reviews
  - Comparativa        - Guía compra      - Guía compra
```

- [ ] Enlace al pilar desde cada artículo del cluster y entre artículos del mismo cluster
- [ ] Anchor descriptivo (nunca "clic aquí")
- [ ] Enlaces contextuales dentro del texto + relacionados al final

### Externo y atributos

```html
<!-- Afiliado: Google prefiere rel="sponsored" (nofollow sigue siendo aceptable) -->
<a href="https://tienda.example/..." rel="sponsored">Ver precio en [tienda]</a>

<!-- Fuente citada -->
<a href="https://fuente.example/..." rel="noopener" target="_blank">según este estudio</a>
```

Cita siempre la fuente de datos, estadísticas y especificaciones (preferiblemente la página oficial del fabricante).

---

## Paso 6: Structured data

### Dónde generarlo según el stack

| Stack | Opción | Notas |
|---|---|---|
| Next.js App Router | Metadata API (`metadata` / `generateMetadata`) para meta tags; JSON-LD con `<script type="application/ld+json">` en `layout`/`page` | Es la recomendación de la documentación de Next.js. Escapa `<` como `<` al serializar. `schema-dts` para tipar el JSON-LD |
| Next.js Pages Router | `next-seo` | Librería comunitaria; comprueba la compatibilidad con la versión instalada |
| Astro | `astro-seo` para meta tags; JSON-LD manual en el layout | |
| Nuxt | `@nuxtjs/seo` (incluye `nuxt-schema-org`), `useSeoMeta` | |
| SvelteKit | `svelte-meta-tags` | |

Si el proyecto ya usa una de estas herramientas, revisa lo que genera antes de añadir JSON-LD manual (evita duplicados).

### Qué tipos usar

- **Artículo**: `BlogPosting` o `Article` con `author`, `publisher`, `datePublished`, `dateModified`.
- **Review de producto**: `Review` con `itemReviewed` de tipo `Product` (u otro tipo válido para Google) y `reviewRating`. Solo con una review real del autor.
- **Navegación**: `BreadcrumbList`.
- **`FAQPage` / `HowTo`**: Google ya no muestra estos rich results (HowTo desde 2023, FAQ desde 2026). No los añadas esperando visibilidad en Google; si ya existen, no hace falta quitarlos.

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Título del artículo",
  "description": "Meta description",
  "image": "URL de imagen",
  "author": { "@type": "Person", "name": "Autor", "url": "URL de la página de autor" },
  "publisher": { "@type": "Organization", "name": "Nombre del sitio" },
  "datePublished": "AAAA-MM-DD",
  "dateModified": "AAAA-MM-DD"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": { "@type": "Product", "name": "Nombre del producto", "image": "URL" },
  "reviewRating": { "@type": "Rating", "ratingValue": "4.5", "bestRating": "5" },
  "author": { "@type": "Person", "name": "Autor" }
}
```

Reglas de Google para reviews: nada de reviews falsas o incentivadas sin declarar, no agregar ratings de otros sitios. Valida con el Rich Results Test.

---

## Paso 7: Disclosure de afiliados

Plantilla (cerca del inicio y antes del primer enlace de afiliado):

```markdown
> **Aviso**: este artículo contiene enlaces de afiliado. Si compras a través
> de ellos, recibimos una comisión sin coste adicional para ti.
> [Más información](/politica-afiliados)
```

- [ ] Visible antes del primer enlace y cerca de las recomendaciones; un aviso solo en el footer o en una página aparte no basta
- [ ] Redactado en lenguaje claro: según la FTC, "enlace de afiliado" por sí solo puede no entenderse como "me pagan"; "enlace patrocinado/pagado" junto al enlace sí es adecuado
- [ ] Página de política de afiliados enlazada desde el footer
- [ ] Recomendaciones honestas, incluidos los contras y los productos que no recomiendas

Fuente: guía de la FTC sobre endorsements (EE. UU.). Si el sitio se dirige a otros mercados, revisa también la normativa local.

---

## Paso 8: Contenido asistido por IA

Google permite usar IA generativa siempre que el resultado sea útil, preciso y cumpla sus políticas; generar páginas en masa sin aportar valor es "scaled content abuse". Este paso deja publicable un borrador generado con IA **sin inventar nada**.

### Regla innegociable: la experiencia no se fabrica

- **Nunca** escribas ni sugieras experiencia, pruebas, mediciones, opiniones personales, anécdotas o reviews que el autor no haya vivido. Esto incluye frases como "lo he probado durante X semanas" o "en mi caso...", y fotos de producto presentadas como propias si no lo son.
- La experiencia de primera mano **la aporta el autor**: pídesela (qué probó, cuánto tiempo, en qué condiciones, qué midió, fotos propias) y redáctala a partir de sus datos.
- Si el autor **no tiene experiencia real** con el producto: escribe sin afirmarla. Usa un enfoque de investigación ("según las especificaciones del fabricante", "según el análisis de [fuente]") y cita las fuentes. Puede presentarse como guía o recopilación, no como review con prueba propia.
- Motivos:
  - Google pide que las reviews aporten evidencia de la experiencia propia (fotos, audio, enlaces) y prohíbe en su structured data las reviews que no se basan en una experiencia genuina.
  - La regla de la FTC sobre reviews y testimonios (16 CFR Part 465, en vigor desde el 21 de octubre de 2024) prohíbe las reviews falsas, incluidas las generadas con IA, y las que tergiversan la experiencia del autor con el producto.

### Ejemplos

```markdown
<!-- Genérico (borrador IA) -->
Los auriculares Modelo X ofrecen una excelente cancelación de ruido.

<!-- Con datos verificables, sin experiencia propia -->
El fabricante anuncia hasta [N] horas de batería con cancelación de ruido
activada ([enlace a la ficha oficial]). En las mediciones de [medio],
[resultado concreto] ([enlace]).

<!-- Con experiencia real, aportada por el autor -->
[Texto redactado a partir de las notas del autor: qué probó, durante cuánto
tiempo, en qué condiciones y qué resultado obtuvo, con sus fotos.]
```

### Checklist del borrador IA

- [ ] Eliminar relleno ("En el mundo actual...", "Cabe destacar que...")
- [ ] Verificar cada dato, especificación, precio y fecha contra la fuente oficial; los modelos inventan especificaciones
- [ ] Revisar también title, meta description, `alt` y structured data generados (Google pide la misma revisión)
- [ ] Sustituir generalidades por datos concretos con fuente
- [ ] Experiencia y opinión: solo las que aporte el autor; si no hay, redactar sin afirmarlas
- [ ] Valorar indicar cómo se ha creado el contenido cuando tenga sentido para el lector (sugerencia de Google)

No se recomiendan detectores de IA: Google evalúa la utilidad y precisión del contenido, no su origen.

### Pipeline

```
1. Borrador con IA (estructura + research con fuentes)
2. Verificar todos los datos, specs y precios
3. Incorporar la experiencia real del autor (o redactar sin afirmarla)
4. Editar tono y eliminar relleno
5. SEO: término principal, cobertura, enlazado, structured data
6. Checklist de publicación
```

---

## Checklist de publicación

### SEO técnico
- [ ] Title descriptivo y conciso, con el término principal
- [ ] Meta description que resuma la página
- [ ] Slug corto y descriptivo
- [ ] Un H1 y jerarquía correcta
- [ ] Imágenes con `alt`; imagen OG 1200x630
- [ ] `canonical` y `hreflang` correctos si aplica

### Contenido
- [ ] Término principal en el primer párrafo, de forma natural
- [ ] Cubre la intención y los subtemas esperados (sin objetivo de número de palabras)
- [ ] Datos con fuente, fecha de actualización visible
- [ ] Sin errores ortográficos

### Enlaces
- [ ] Enlaces internos al pilar y al cluster con anchor descriptivo
- [ ] Fuentes externas citadas
- [ ] Enlaces de afiliado con `rel="sponsored"`

### Afiliados
- [ ] Disclosure visible antes del primer enlace
- [ ] Experiencia de uso solo si es real y aportada por el autor, con evidencia
- [ ] Pros y contras honestos
- [ ] Precio y disponibilidad actualizados

### Structured data
- [ ] JSON-LD acorde al tipo de contenido y al contenido visible
- [ ] `Review` solo si hay review real del autor
- [ ] Validado en el Rich Results Test

### Final
- [ ] Fechas de publicación/actualización configuradas
- [ ] Categoría y tags existentes asignados
- [ ] Preview en móvil revisado
- [ ] Enlaces funcionando

---

## Plantillas rápidas

### Meta description para afiliados

```
[Verbo] los mejores [producto] de [año]. Comparamos [criterio 1],
[criterio 2] y [criterio 3] para ayudarte a elegir. [CTA].
```

No afirmes "tras semanas de uso" ni "probados" salvo que sea cierto y esté documentado en el artículo.

### Title

```
[Mejor/es] [producto] [año]: [beneficio o criterio]
[Producto] review: [veredicto corto]
```

---

## Ejemplos de uso

```
/xmon:seo-content revisar el artículo antes de publicar
/xmon:seo-content ajustar el front matter de este post al schema del proyecto
/xmon:seo-content generar el JSON-LD para esta review
/xmon:seo-content crear la estructura de una comparativa de [tema]
/xmon:seo-content revisar este borrador generado con IA
```

---

## Checklist de ejecución

- [ ] Detectar sistema de contenido, schema, campos e i18n
- [ ] Ajustar front matter a los campos reales
- [ ] Revisar estructura de headers
- [ ] Revisar término principal, cobertura temática e intención
- [ ] Revisar imágenes y `alt`
- [ ] Revisar enlazado interno y externo
- [ ] Añadir o verificar structured data
- [ ] Verificar disclosure de afiliados
- [ ] Si hay borrador IA: verificar datos y no inventar experiencia
- [ ] Pasar el checklist de publicación
