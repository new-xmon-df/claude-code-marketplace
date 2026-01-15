---
name: xmon:seo-audit
description: Auditoría completa de SEO técnico y de contenido. Detecta problemas de indexación, meta tags, estructura, E-E-A-T, y preparación para AI/LLMs. Sistema de puntuación sobre 100.
---

# SEO Audit

Skill para realizar auditorías SEO completas en sitios web, especialmente optimizado para blogs y sitios de afiliados.

## Cuándo usar este skill

- Quieres auditar el SEO de un sitio web o página específica
- Necesitas verificar meta tags, estructura y schema markup
- Quieres evaluar la calidad del contenido para SEO
- Preparas contenido para posicionar en buscadores
- Necesitas optimizar para AI/LLMs (GEO - Generative Engine Optimization)
- Vas a publicar contenido de afiliados y quieres maximizar visibilidad

---

## Modos de Auditoría

### Auditoría Completa (por defecto)
Evalúa las 5 categorías con puntuación detallada (100 puntos total).

### Quick Audit (modo rápido)
Revisa solo los 5 elementos más críticos:
1. Title tag y meta description
2. URL structure
3. H1 y estructura de headers
4. Imágenes sin alt text
5. Links rotos internos

Para activar: `/seo-check` o mencionar "quick audit" / "análisis rápido"

---

## Paso 0: Detectar Stack y Tipo de Sitio (OBLIGATORIO)

**ANTES de auditar**, detecta el stack del proyecto:

### Archivos a buscar

```
# Meta-frameworks SSG/SSR
astro.config.*        # Astro
next.config.*         # Next.js
nuxt.config.*         # Nuxt
gatsby-config.*       # Gatsby
svelte.config.*       # SvelteKit
vite.config.*         # Vite (puede ser varios)

# CMS Headless
.directus/           # Directus
sanity.json          # Sanity
strapi/              # Strapi
contentful.json      # Contentful

# CMS Tradicionales
wp-config.php        # WordPress
sites/default/       # Drupal
config/config.php    # Joomla

# Generadores estáticos
_config.yml          # Jekyll/Hugo
eleventy.js          # 11ty
mkdocs.yml           # MkDocs
```

### Identificar el tipo de sitio

1. **Leer configuración** para determinar:
   - Tipo de renderizado: SSG, SSR, SPA, híbrido
   - Framework: Astro, Next.js, Nuxt, etc.
   - CMS: Directus, WordPress, Strapi, etc.

2. **Identificar tipo de contenido**:
   - Blog/Magazine
   - E-commerce
   - Landing pages
   - Sitio de afiliados
   - Documentación

3. **Guardar contexto detectado**:
   ```
   Stack detectado:
   - Framework: [Astro/Next.js/Nuxt/WordPress/etc.]
   - Renderizado: [SSG/SSR/SPA/Híbrido]
   - CMS: [Directus/Strapi/WordPress/None]
   - Tipo de sitio: [Blog/E-commerce/Afiliados/etc.]
   ```

---

## Paso 1: Verificar Herramientas Disponibles

### Herramientas siempre disponibles
- **Grep**: Buscar meta tags, schema, patrones en código
- **Glob**: Encontrar archivos HTML, componentes, layouts
- **Read**: Leer código fuente y configuraciones
- **WebFetch**: Analizar URLs en producción
- **WebSearch**: Research de keywords, competencia

### MCPs opcionales útiles

| MCP | Para qué sirve |
|-----|----------------|
| **Playwright** | Testing visual, verificar renderizado, screenshots |
| **Context7** | Documentación de frameworks para meta tags dinámicos |
| **Sequential Thinking** | Análisis metódico de problemas SEO complejos |

### Si analizas URL en producción

Usar WebFetch para obtener:
- HTML renderizado (importante para SSR/SSG)
- Meta tags finales
- Schema markup
- Open Graph tags

---

## Paso 2: SEO Técnico (25 puntos)

### 2.1 Estructura de URLs (5 pts)

**Buscar en código**:
```
# Rutas y slugs
pages/              # Next.js, Nuxt
src/pages/          # Astro
src/routes/         # SvelteKit
```

**Verificar**:
- [ ] URLs descriptivas y legibles (no `/post?id=123`)
- [ ] Uso de guiones `-` en lugar de `_`
- [ ] Sin parámetros innecesarios
- [ ] URLs cortas (idealmente < 60 caracteres)
- [ ] Estructura jerárquica coherente (`/categoria/articulo`)

**Penalizar**:
- URLs con IDs numéricos (-2)
- URLs con mayúsculas o caracteres especiales (-2)
- URLs demasiado largas (-1)

### 2.2 Title Tags (5 pts)

**Buscar patrones**:
```
<title>
<meta.*property="og:title"
title:
```

**Verificar**:
- [ ] Título único por página
- [ ] Longitud 50-60 caracteres
- [ ] Keyword principal incluida (preferiblemente al inicio)
- [ ] Marca/sitio al final (opcional)
- [ ] Sin duplicados en el sitio

**Para sitios de afiliados**: Incluir modificadores como "Mejor", "Guía", "Comparativa", año actual.

### 2.3 Meta Descriptions (5 pts)

**Buscar**:
```
<meta.*name="description"
<meta.*property="og:description"
description:
```

**Verificar**:
- [ ] Descripción única por página
- [ ] Longitud 150-160 caracteres
- [ ] Incluye keyword principal
- [ ] Call-to-action o gancho
- [ ] Sin duplicados

### 2.4 Headers (H1-H6) (5 pts)

**Buscar estructura**:
```
<h1>
<h2>
<h3>
# (en markdown)
##
```

**Verificar**:
- [ ] Solo un H1 por página
- [ ] H1 incluye keyword principal
- [ ] Jerarquía correcta (no saltar niveles)
- [ ] Headers descriptivos (no genéricos)
- [ ] Estructura lógica del contenido

### 2.5 Imágenes y Media (3 pts)

**Buscar**:
```
<img
![
Image
Picture
```

**Verificar**:
- [ ] Todas las imágenes tienen `alt` descriptivo
- [ ] Alt incluye keywords cuando es relevante
- [ ] Nombres de archivo descriptivos
- [ ] Formatos optimizados (WebP, AVIF)
- [ ] Lazy loading implementado

### 2.6 Links Internos (2 pts)

**Verificar**:
- [ ] Anchor text descriptivo (no "clic aquí")
- [ ] Sin links rotos
- [ ] Estructura de silos/clusters
- [ ] Links relevantes entre contenido relacionado

---

## Paso 3: Calidad de Contenido (20 puntos)

### 3.1 Cobertura del Tema (5 pts)

**Analizar**:
- [ ] ¿Responde completamente la intención de búsqueda?
- [ ] ¿Cubre subtemas relevantes?
- [ ] ¿Incluye información actualizada?
- [ ] ¿Profundidad adecuada para el tema?

### 3.2 Originalidad (5 pts)

**Verificar**:
- [ ] Contenido único (no copiado)
- [ ] Perspectiva o ángulo propio
- [ ] Datos o ejemplos originales
- [ ] No es contenido AI genérico sin editar

### 3.3 Precisión y Actualidad (5 pts)

**Verificar**:
- [ ] Información factualmente correcta
- [ ] Fuentes citadas cuando corresponde
- [ ] Fechas de publicación/actualización visibles
- [ ] Contenido vigente (especialmente para afiliados)

### 3.4 Legibilidad (5 pts)

**Verificar**:
- [ ] Párrafos cortos (3-4 líneas)
- [ ] Listas y bullet points
- [ ] Subtítulos cada 300-400 palabras
- [ ] Lenguaje claro y directo
- [ ] Formato escaneable

---

## Paso 4: Keywords y Semántica (20 puntos)

### 4.1 Keyword Principal (5 pts)

**Verificar ubicación**:
- [ ] En título (title tag)
- [ ] En H1
- [ ] En primeros 150 caracteres del contenido
- [ ] En URL (slug)
- [ ] En meta description
- [ ] Densidad natural (1-2%)

### 4.2 Keywords Secundarias y LSI (5 pts)

**Buscar**:
- [ ] Sinónimos del término principal
- [ ] Términos relacionados semánticamente
- [ ] Variaciones long-tail
- [ ] Preguntas relacionadas (PAA)

### 4.3 Entidades Relacionadas (5 pts)

**Para sitios de afiliados**:
- [ ] Nombres de productos
- [ ] Marcas
- [ ] Especificaciones técnicas
- [ ] Comparativas (vs, mejor que)

### 4.4 Intención de Búsqueda (5 pts)

**Clasificar y verificar alineación**:
- **Informacional**: Guías, tutoriales, "cómo hacer"
- **Comercial**: Comparativas, "mejor X para Y"
- **Transaccional**: Reviews, "comprar", "precio"
- **Navegacional**: Marca específica

**Para afiliados**: La intención suele ser comercial/transaccional - verificar que el contenido guíe hacia la conversión.

---

## Paso 5: E-E-A-T (20 puntos)

### 5.1 Experience - Experiencia (5 pts)

**Verificar**:
- [ ] ¿Se muestra experiencia de primera mano?
- [ ] ¿Hay fotos/videos propios del producto?
- [ ] ¿Testimonios de uso real?
- [ ] ¿Detalles que solo alguien con experiencia conocería?

**Para afiliados**: Crítico incluir evidencia de haber usado el producto.

### 5.2 Expertise - Expertise (5 pts)

**Verificar**:
- [ ] Autor identificado con bio
- [ ] Credenciales o experiencia relevante
- [ ] Profundidad técnica adecuada
- [ ] Página "Sobre nosotros" completa

### 5.3 Authoritativeness - Autoridad (5 pts)

**Verificar**:
- [ ] Links externos de sitios de autoridad
- [ ] Menciones de marca
- [ ] Tiempo online del dominio
- [ ] Contenido citado por otros

### 5.4 Trustworthiness - Confianza (5 pts)

**Verificar**:
- [ ] HTTPS activo
- [ ] Política de privacidad
- [ ] Información de contacto visible
- [ ] Disclosure de afiliados (FTC compliance)
- [ ] Reviews/ratings verificables

**Crítico para afiliados**: Disclosure visible y honesto sobre comisiones.

---

## Paso 6: AI/GEO Readiness (15 puntos)

Preparación para Generative Engine Optimization (posicionamiento en respuestas de AI).

### 6.1 Extractabilidad (5 pts)

**Verificar**:
- [ ] Respuestas directas a preguntas (formato Q&A)
- [ ] Definiciones claras
- [ ] Listas con datos concretos
- [ ] Tablas comparativas
- [ ] Featured snippet-friendly

### 6.2 Densidad de Hechos (5 pts)

**Verificar**:
- [ ] Datos numéricos específicos
- [ ] Estadísticas con fuentes
- [ ] Especificaciones técnicas
- [ ] Precios actualizados
- [ ] Fechas relevantes

### 6.3 Estructura LLM-Friendly (5 pts)

**Verificar**:
- [ ] Schema markup completo (JSON-LD)
- [ ] FAQ Schema para preguntas frecuentes
- [ ] Product Schema para productos
- [ ] Review Schema para reviews
- [ ] Breadcrumb Schema para navegación

**Schema crítico para afiliados**:
```json
{
  "@type": "Product",
  "@type": "Review",
  "@type": "AggregateRating",
  "@type": "FAQPage"
}
```

---

## Paso 7: Reporte de Auditoría

### Sistema de Puntuación

| Categoría | Puntos Máx | Obtenidos |
|-----------|------------|-----------|
| SEO Técnico | 25 | X |
| Calidad de Contenido | 20 | X |
| Keywords y Semántica | 20 | X |
| E-E-A-T | 20 | X |
| AI/GEO Readiness | 15 | X |
| **TOTAL** | **100** | **X** |

### Interpretación

| Rango | Nivel | Acción |
|-------|-------|--------|
| 90-100 | Excelente | Mantener y monitorear |
| 75-89 | Bueno | Optimizaciones menores |
| 60-74 | Mejorable | Priorizar mejoras |
| 40-59 | Deficiente | Revisión urgente |
| < 40 | Crítico | Rehacer estrategia |

### Formato del Reporte

```markdown
# Auditoría SEO

**URL/Proyecto**: [Nombre]
**Fecha**: [Fecha]
**Stack**: [Stack detectado]
**Tipo de sitio**: [Blog/Afiliados/etc.]

## Puntuación Global: X/100

[Tabla de puntuación por categoría]

## Hallazgos Críticos (Prioridad Alta)

### [SEO-001] [Título del hallazgo]
**Categoría**: SEO Técnico/Contenido/Keywords/E-E-A-T/AI
**Impacto**: -X puntos
**Problema**: [Descripción]
**Solución**: [Cómo solucionarlo]
**Archivos afectados**: [lista de archivos]

## Hallazgos Moderados (Prioridad Media)

...

## Hallazgos Menores (Prioridad Baja)

...

## Quick Wins (Fácil implementación, alto impacto)

1. [Acción 1]
2. [Acción 2]
...

## Recomendaciones para Afiliados

1. [Específicas para el nicho]
...
```

---

## Verificación de Schema Markup

### Para Astro/Next.js/Nuxt

Buscar archivos de layout o head:

```
# Astro
src/layouts/
src/components/Head
src/components/SEO

# Next.js
pages/_app
pages/_document
app/layout
components/seo

# Nuxt
nuxt.config (head section)
components/
```

### Schema recomendado por tipo

**Blog/Artículo**:
- Article o BlogPosting
- Author (Person)
- Organization (publisher)
- BreadcrumbList

**Producto/Afiliado**:
- Product
- Review
- AggregateRating
- Offer
- FAQPage

**Página general**:
- WebPage
- Organization
- BreadcrumbList

---

## Recursos Externos

Para research y verificación:
- **Google Search Console**: Datos reales de indexación
- **PageSpeed Insights**: Core Web Vitals
- **Schema Validator**: validator.schema.org
- **Rich Results Test**: search.google.com/test/rich-results
- **Mobile-Friendly Test**: search.google.com/test/mobile-friendly

---

## Checklist de Ejecución

- [ ] Detectar stack y tipo de sitio
- [ ] Verificar herramientas disponibles
- [ ] Auditar SEO técnico (URLs, titles, meta, headers, imágenes, links)
- [ ] Evaluar calidad del contenido
- [ ] Analizar keywords y semántica
- [ ] Verificar señales E-E-A-T
- [ ] Evaluar preparación para AI/GEO
- [ ] Calcular puntuación total
- [ ] Generar reporte con hallazgos priorizados
- [ ] Proponer quick wins y plan de mejora
