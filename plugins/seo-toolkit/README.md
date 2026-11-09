# seo-toolkit

Plugin para Claude Code con **dos skills de SEO** pensados para blogs y sitios de afiliados. Ambos detectan primero el stack y el sistema de contenido del proyecto (Astro, Next.js, Nuxt, SvelteKit, WordPress, CMS headless...) y trabajan sobre los archivos y campos reales.

## Skills incluidos

### `xmon:seo-audit`

Auditoría SEO técnica y de contenido de un proyecto local o de una URL en producción, con **puntuación sobre 100**:

- SEO técnico (URLs, title, meta description, headers, imágenes, enlazado, canonical, hreflang)
- Calidad de contenido (cobertura, originalidad, actualidad, legibilidad)
- Términos, cobertura temática e intención de búsqueda (sin densidad de keyword ni "LSI keywords")
- Experiencia y confianza (E-E-A-T), con checks críticos para afiliados: experiencia real y disclosure
- Structured data válido y visibilidad en buscadores con IA (snippets, crawlers de IA en `robots.txt`)

Incluye un **modo rápido** ("quick audit") que revisa solo los 5 elementos más críticos.

**Cuándo usarlo**: auditar un sitio, una sección o una página y obtener un reporte priorizado con quick wins.

### `xmon:seo-content`

Optimización de un artículo antes de publicar:

- Front matter ajustado al schema del proyecto (Astro content collections, Contentlayer, CMS)
- Plantillas de estructura para guías, reviews y comparativas de afiliados
- Enlazado interno por clusters y atributos de enlaces de afiliado (`rel="sponsored"`)
- Structured data por stack (Metadata API de Next.js, `astro-seo`, `@nuxtjs/seo`, `svelte-meta-tags`)
- Disclosure de afiliados
- Revisión de borradores generados con IA: verificar datos y **nunca inventar experiencia, pruebas ni reviews**

**Cuándo usarlo**: antes de publicar o actualizar un artículo, o al convertir un borrador IA en contenido publicable.

## Instalación

1. Añade el marketplace (una sola vez):

   ```
   /plugin marketplace add new-xmon-df/claude-code-marketplace
   ```

2. Refresca el marketplace e instala el plugin:

   ```
   /plugin marketplace update
   /plugin install seo-toolkit@xmon-plugins
   ```

## Ejemplos de invocación

```
/xmon:seo-audit audita el SEO del proyecto
/xmon:seo-audit quick audit de https://ejemplo.com/articulo
/xmon:seo-content revisar el artículo antes de publicar
/xmon:seo-content generar el JSON-LD para esta review
/xmon:seo-content revisar este borrador generado con IA
```

## MCPs que usa este plugin

**Requeridos**:
_(ninguno)_

**Opcionales**:
- `playwright`: para revisar el renderizado real de páginas SPA o con contenido dinámico.

Cómo instalar cada MCP: ver la sección [Requisitos / MCPs](../../README.md#requisitos--mcps) del README raíz.

## Licencia

MIT — ver el repositorio del marketplace.
