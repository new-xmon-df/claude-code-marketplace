---
name: xmon:seo-content
description: Guía para optimizar contenido antes de publicar. Front matter, estructura, keywords, internal linking, y checklist de publicación para blogs y sitios de afiliados.
---

# SEO Content Guide

Skill para optimizar contenido antes de publicar, especialmente diseñado para blogs, sitios de afiliados y contenido generado con AI.

## Cuándo usar este skill

- Vas a publicar un nuevo artículo o página
- Quieres optimizar contenido existente
- Necesitas crear front matter SEO-friendly
- Escribes contenido de afiliados y quieres maximizar conversión
- Generas contenido con AI y necesitas optimizarlo
- Quieres verificar que tu contenido cumple las mejores prácticas

---

## Paso 0: Detectar Stack y Sistema de Contenido (OBLIGATORIO)

**ANTES de optimizar**, detecta cómo se gestiona el contenido:

### Archivos a buscar

```
# Content collections (Astro)
src/content/
src/content/config.ts

# CMS Headless
.directus/
sanity/schemas/
strapi/api/

# MDX/Markdown
*.mdx
*.md
content/
posts/
articles/

# Frontmatter schemas
src/content/config.ts    # Astro
contentlayer.config.*    # Contentlayer
```

### Identificar el sistema

1. **Leer configuración de contenido** para determinar:
   - Formato: MDX, Markdown, JSON, CMS
   - Schema de frontmatter existente
   - Campos obligatorios/opcionales
   - Validación de tipos

2. **Guardar contexto**:
   ```
   Sistema de contenido detectado:
   - Formato: [MDX/Markdown/CMS]
   - Schema: [Astro Content Collections/Contentlayer/Custom]
   - Campos actuales: [title, description, date, etc.]
   - Categorías/Tags: [lista si existen]
   ```

---

## Paso 1: Front Matter SEO-Optimizado

### Campos Obligatorios

```yaml
---
title: "Título optimizado (50-60 chars)"
description: "Meta description con CTA (150-160 chars)"
publishDate: 2024-01-15  # O date, pubDate según el schema
updatedDate: 2024-01-20  # Importante para E-E-A-T
author: "Nombre del Autor"
---
```

### Campos Recomendados para SEO

```yaml
---
# SEO específico
seo:
  title: "Title tag si difiere del title"
  description: "Meta description"
  canonical: "https://..." # Si es contenido republicado
  noindex: false

# Open Graph
image: "/images/og-image.jpg"  # 1200x630px
imageAlt: "Descripción de la imagen"

# Organización del contenido
category: "Categoría principal"
tags: ["tag1", "tag2", "tag3"]
related: ["slug-articulo-1", "slug-articulo-2"]

# Para afiliados
affiliate: true
affiliateDisclosure: true
products: ["producto-1", "producto-2"]

# Schema hints
schema:
  type: "Article" # o "Product", "Review", "HowTo", "FAQ"
---
```

### Ejemplo Completo para Blog de Afiliados

```yaml
---
title: "Mejores Auriculares Bluetooth 2024: Guía Comparativa"
description: "Comparamos los 10 mejores auriculares Bluetooth calidad-precio. Con análisis real de sonido, batería y comodidad tras semanas de uso."
publishDate: 2024-01-15
updatedDate: 2024-01-20
author: "Nombre Autor"
image: "/images/auriculares-bluetooth-2024.jpg"
imageAlt: "Comparativa de auriculares Bluetooth sobre mesa de madera"
category: "Audio"
tags: ["auriculares", "bluetooth", "comparativa", "guía de compra"]
affiliate: true
affiliateDisclosure: true
schema:
  type: "ProductCollection"
---
```

---

## Paso 2: Estructura del Contenido

### Jerarquía de Headers

```markdown
# H1: Keyword principal + modificador + año (solo uno)
Ejemplo: "Mejores Auriculares Bluetooth 2024: Guía Definitiva"

## H2: Secciones principales (keywords secundarias)
Ejemplo: "Cómo elegir auriculares Bluetooth"

### H3: Subsecciones
Ejemplo: "Tipos de driver y calidad de sonido"

#### H4: Puntos específicos (usar con moderación)
```

### Reglas de Estructura

- [ ] **Un solo H1** por página (el título principal)
- [ ] **H2 cada 300-400 palabras** aproximadamente
- [ ] **No saltar niveles** (H1 -> H3 sin H2 = mal)
- [ ] **Keywords en headers** pero natural, no forzado
- [ ] **Headers descriptivos** que anticipen el contenido

### Plantilla de Estructura para Artículos

**Artículo informativo (How-to)**:
```markdown
# Cómo [hacer X]: Guía Completa [año]

Intro con keyword en primeros 150 caracteres.

## ¿Qué es [X]? / ¿Por qué [X]?

## Paso 1: [Primer paso]
### Consideraciones importantes

## Paso 2: [Segundo paso]

## Errores comunes al [hacer X]

## FAQ: Preguntas frecuentes sobre [X]

## Conclusión
```

**Review/Comparativa (Afiliados)**:
```markdown
# [Mejor X para Y]: Comparativa [año]

Intro con gancho + keyword.

## Resumen rápido: Top 3 picks
[Tabla comparativa]

## Cómo elegimos los mejores [X]
### Criterios de evaluación

## Análisis detallado

### 1. [Producto A] - Mejor en general
#### Pros y contras
#### Especificaciones
#### Nuestra experiencia

### 2. [Producto B] - Mejor calidad-precio
...

## Tabla comparativa completa

## Guía de compra: Qué buscar en [X]

## FAQ

## Conclusión: ¿Cuál comprar?
```

---

## Paso 3: Optimización de Keywords

### Ubicaciones Críticas (Keyword Principal)

| Ubicación | Prioridad | Ejemplo |
|-----------|-----------|---------|
| Title tag | Alta | "Mejores Auriculares Bluetooth 2024" |
| H1 | Alta | Mismo o variación del title |
| URL/slug | Alta | `/mejores-auriculares-bluetooth` |
| Meta description | Alta | Incluir natural |
| Primeros 150 chars | Alta | Primera oración del contenido |
| Alt de imagen principal | Media | "auriculares bluetooth comparativa" |
| Último párrafo | Media | Refuerzo natural |

### Densidad de Keywords

- **Keyword principal**: 1-2% del contenido total
- **Evitar keyword stuffing**: Si suena forzado, lo es
- **Usar variaciones**: Sinónimos, long-tail, LSI

### Keywords por Tipo de Contenido

**Blog/Informativo**:
```
- Cómo + [verbo] + [objeto]
- Guía de/para + [tema]
- Qué es + [concepto]
- [X] vs [Y]: Diferencias
- [Número] + [tips/consejos/formas] para + [objetivo]
```

**Afiliados/Comercial**:
```
- Mejor/es + [producto] + [año]
- [Producto] + review/análisis/opinión
- [Producto A] vs [Producto B]
- Comparativa + [categoría]
- [Producto] + ¿vale la pena? / ¿merece la pena?
- Dónde comprar + [producto]
- [Producto] + precio/oferta/descuento
```

**Long-tail para afiliados**:
```
- Mejor [producto] para [caso de uso específico]
- [Producto] para [perfil de usuario]
- [Producto] calidad-precio
- Alternativas a [producto popular]
```

---

## Paso 4: Imágenes Optimizadas

### Checklist de Imágenes

- [ ] **Alt text descriptivo** (no "imagen1.jpg")
- [ ] **Keyword en alt** cuando sea natural
- [ ] **Nombre de archivo descriptivo** (`auriculares-sony-wh1000xm5.webp`)
- [ ] **Formato optimizado** (WebP/AVIF con fallback)
- [ ] **Dimensiones adecuadas** (no subir 4000px si se muestra a 800px)
- [ ] **Lazy loading** activado
- [ ] **Imagen OG** 1200x630px

### Alt Text Ejemplos

```html
<!-- Mal -->
<img alt="imagen" />
<img alt="auriculares" />
<img alt="" />

<!-- Bien -->
<img alt="Auriculares Sony WH-1000XM5 en color negro sobre fondo blanco" />
<img alt="Comparativa de tamaño entre AirPods Pro y Sony WF-1000XM5" />
<img alt="Gráfico de duración de batería de auriculares bluetooth" />
```

### Para Afiliados: Imágenes que Convierten

- Fotos propias del producto (E-E-A-T)
- Unboxing si es posible
- Comparativas visuales
- Tablas/infografías con especificaciones
- Screenshots de app/software si aplica

---

## Paso 5: Internal Linking

### Estrategia de Silos/Clusters

```
                    [Pilar: Auriculares Bluetooth]
                              |
        ------------------------------------------------
        |                     |                        |
[Cluster: Over-ear]   [Cluster: In-ear]   [Cluster: True Wireless]
        |                     |                        |
    - Review X            - Review Y              - Review Z
    - Review A            - Review B              - Review C
    - Comparativa         - Guía compra           - Guía compra
```

### Reglas de Internal Linking

- [ ] **3-5 links internos** por cada 1000 palabras
- [ ] **Anchor text descriptivo** (no "clic aquí", "este artículo")
- [ ] **Links contextuales** dentro del contenido
- [ ] **Links a contenido relacionado** al final
- [ ] **Link al pilar** desde artículos del cluster
- [ ] **Links entre artículos del mismo cluster**

### Formato de Links

```markdown
<!-- Bien: Anchor descriptivo -->
Si buscas algo más económico, revisa nuestra
[guía de auriculares bluetooth baratos](/auriculares-bluetooth-baratos).

<!-- Mal: Anchor genérico -->
Para más información, [haz clic aquí](/auriculares-bluetooth-baratos).
```

---

## Paso 6: External Linking

### Cuándo Enlazar Externamente

- [ ] **Fuentes de datos/estadísticas** (siempre citar)
- [ ] **Páginas oficiales de productos** (para especificaciones)
- [ ] **Herramientas mencionadas**
- [ ] **Estudios o investigaciones citadas**
- [ ] **Wikipedia para conceptos técnicos** (con moderación)

### Atributos de Links

```html
<!-- Links de afiliado -->
<a href="https://amazon.es/..." rel="sponsored nofollow" target="_blank">
  Ver en Amazon
</a>

<!-- Links a fuentes -->
<a href="https://estudio.com/..." rel="noopener" target="_blank">
  según este estudio
</a>

<!-- Links de confianza (no nofollow) -->
<a href="https://sitio-autoridad.com/...">
  documentación oficial
</a>
```

---

## Paso 7: Schema Markup para Contenido

### Por Tipo de Contenido

**Artículo de Blog**:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Título del artículo",
  "description": "Meta description",
  "image": "URL de imagen",
  "author": {
    "@type": "Person",
    "name": "Autor"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nombre del sitio"
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-20"
}
```

**Review de Producto (Afiliados)**:
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Product",
    "name": "Nombre del producto",
    "image": "URL imagen producto"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Autor"
  }
}
```

**FAQ (muy útil para featured snippets)**:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Pregunta 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Respuesta 1"
      }
    }
  ]
}
```

---

## Paso 8: Disclosure de Afiliados (FTC Compliance)

### Requisitos Legales

**Obligatorio si hay links de afiliado**:

```markdown
<!-- Al inicio del artículo -->
> **Disclosure**: Este artículo contiene enlaces de afiliado.
> Si compras a través de ellos, ganamos una pequeña comisión
> sin coste adicional para ti. Esto nos ayuda a mantener el sitio.
> [Más info](/politica-afiliados)
```

### Ubicaciones del Disclosure

- [ ] **Inicio del artículo** (visible antes de primer link)
- [ ] **Footer del sitio** (link a política completa)
- [ ] **Página de política de afiliados** dedicada

### Buenas Prácticas

- Ser transparente sobre la relación comercial
- No ocultar que es contenido de afiliados
- Mantener recomendaciones honestas
- Indicar cuando NO recomiendas un producto

---

## Checklist Antes de Publicar

### SEO Técnico
- [ ] Title tag: 50-60 caracteres, keyword incluida
- [ ] Meta description: 150-160 caracteres, con CTA
- [ ] URL/slug: corta, descriptiva, con keyword
- [ ] H1 único con keyword
- [ ] Headers en jerarquía correcta (H2, H3, H4)
- [ ] Imágenes con alt text descriptivo
- [ ] Imagen OG configurada (1200x630)

### Contenido
- [ ] Keyword en primeros 150 caracteres
- [ ] Contenido de mínimo 1500 palabras (para competir)
- [ ] Párrafos cortos (3-4 líneas)
- [ ] Listas/bullet points donde corresponda
- [ ] Sin errores ortográficos/gramaticales

### Links
- [ ] 3-5 links internos relevantes
- [ ] Links externos a fuentes (si citas datos)
- [ ] Anchor text descriptivo
- [ ] Links de afiliado con `rel="sponsored nofollow"`

### Para Afiliados
- [ ] Disclosure visible al inicio
- [ ] Experiencia personal mencionada (E-E-A-T)
- [ ] Pros Y contras honestos
- [ ] Precio/disponibilidad actualizada
- [ ] CTA claro pero no agresivo

### Schema
- [ ] JSON-LD apropiado para el tipo de contenido
- [ ] FAQ Schema si hay sección de preguntas
- [ ] Product/Review Schema si es review

### Final
- [ ] Fecha de publicación configurada
- [ ] Categoría y tags asignados
- [ ] Preview en móvil revisado
- [ ] Links funcionando correctamente

---

## Plantillas Rápidas

### Meta Description para Afiliados

```
[Verbo] los [número] mejores [producto] de [año].
Comparamos [criterio 1], [criterio 2] y [criterio 3]
para ayudarte a elegir. [CTA].

Ejemplo:
"Descubre los 10 mejores auriculares Bluetooth de 2024.
Comparamos sonido, batería y comodidad tras semanas de uso.
Encuentra tu par ideal."
```

### Title Tags Efectivos

```
[Mejor/es] [Producto] [Año]: [Beneficio/Modificador]

Ejemplos:
- "Mejores Auriculares Bluetooth 2024: Guía Comparativa"
- "Mejores Portátiles para Programar 2024 (Probados)"
- "10 Mejores Sillas Gaming Calidad-Precio [Actualizado]"
```

---

## Ejemplos de Uso

```
/xmon:seo-content revisar el artículo antes de publicar
/xmon:seo-content optimizar el front matter de este post
/xmon:seo-content generar schema para esta review de producto
/xmon:seo-content crear estructura para artículo de [tema]
/xmon:seo-content verificar internal linking
```

---

## Checklist de Ejecución

- [ ] Detectar sistema de contenido y schema existente
- [ ] Verificar/crear front matter completo
- [ ] Revisar estructura de headers
- [ ] Verificar ubicación de keywords
- [ ] Optimizar imágenes y alt text
- [ ] Añadir internal links relevantes
- [ ] Verificar external links y atributos
- [ ] Añadir schema markup apropiado
- [ ] Verificar disclosure de afiliados (si aplica)
- [ ] Pasar checklist antes de publicar
