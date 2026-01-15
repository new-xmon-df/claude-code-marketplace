---
name: seo-check
description: Análisis rápido de SEO del proyecto o URL especificada
---

# SEO Check

Ejecutar análisis rápido de los 5 elementos SEO más críticos.

## Análisis a realizar

### 1. Detectar contexto

**Si se proporciona URL**:
- Usar WebFetch para obtener el HTML renderizado
- Analizar meta tags, headers, schema en producción

**Si es proyecto local**:
- Detectar stack (Astro, Next.js, Nuxt, etc.)
- Buscar layouts, componentes SEO, archivos de contenido

### 2. Quick Audit: 5 Elementos Críticos

#### 2.1 Title Tags
- [ ] ¿Existe title tag?
- [ ] ¿Longitud correcta (50-60 chars)?
- [ ] ¿Es único y descriptivo?

#### 2.2 Meta Descriptions
- [ ] ¿Existe meta description?
- [ ] ¿Longitud correcta (150-160 chars)?
- [ ] ¿Incluye call-to-action?

#### 2.3 Estructura de URLs
- [ ] ¿URLs descriptivas?
- [ ] ¿Sin parámetros innecesarios?
- [ ] ¿Slug con keywords?

#### 2.4 Headers (H1-H6)
- [ ] ¿Solo un H1 por página?
- [ ] ¿Jerarquía correcta?
- [ ] ¿H1 descriptivo con keyword?

#### 2.5 Imágenes
- [ ] ¿Tienen alt text?
- [ ] ¿Alt descriptivos (no genéricos)?
- [ ] ¿Formatos optimizados?

### 3. Generar reporte resumido

```markdown
## SEO Check - Resumen Rápido

**Proyecto/URL**: [nombre o URL]
**Stack**: [detectado]
**Fecha**: [fecha]

### Puntuación Rápida

| Elemento | Estado | Nota |
|----------|--------|------|
| Title Tags | OK/WARN/FAIL | [detalle] |
| Meta Descriptions | OK/WARN/FAIL | [detalle] |
| URLs | OK/WARN/FAIL | [detalle] |
| Headers | OK/WARN/FAIL | [detalle] |
| Imágenes | OK/WARN/FAIL | [detalle] |

### Problemas Encontrados

1. [Problema crítico si existe]
2. [Siguiente problema]

### Quick Wins

1. [Acción fácil de implementar]
2. [Siguiente acción]

---

Para auditoría completa usa: `xmon:seo-audit`
Para optimizar contenido usa: `xmon:seo-content`
```

## Uso

```
/seo-check                    # Analiza proyecto local
/seo-check https://ejemplo.com  # Analiza URL específica
/seo-check --full             # Ejecuta auditoría completa (xmon:seo-audit)
/seo-check src/content/post.md  # Analiza archivo específico
```

## Opciones

| Opción | Descripción |
|--------|-------------|
| `--full` | Ejecuta auditoría completa con puntuación |
| `--content` | Enfoca en optimización de contenido |
| `--schema` | Verifica solo schema markup |
| `--images` | Verifica solo optimización de imágenes |
