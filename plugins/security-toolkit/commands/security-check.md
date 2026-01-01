---
name: security-check
description: Ejecuta un análisis rápido de seguridad del proyecto actual
---

# Security Check

Ejecutar análisis rápido de seguridad del proyecto.

## Análisis a realizar

1. **Detectar stack** del proyecto (package.json, composer.json, requirements.txt, etc.)

2. **Buscar secrets expuestos**:
   - Archivos .env que no estén en .gitignore
   - Patrones de API keys y tokens en el código
   - Credenciales hardcodeadas

3. **Revisar dependencias**:
   - Ejecutar `npm audit` si es Node.js
   - Ejecutar `pip-audit` o `safety` si es Python
   - Ejecutar `composer audit` si es PHP

4. **Verificar configuración básica**:
   - ¿Existe .gitignore con archivos sensibles?
   - ¿Hay archivos de configuración con datos sensibles en el repo?
   - ¿El modo debug está deshabilitado para producción?

5. **Generar reporte resumido**:

```markdown
## Security Check - Resumen

**Proyecto**: [nombre]
**Stack**: [detectado]

### Hallazgos

| Tipo | Severidad | Cantidad |
|------|-----------|----------|
| Secrets expuestos | Crítica | X |
| Dependencias vulnerables | Alta/Media | X |
| Configuración insegura | Media | X |

### Acciones inmediatas requeridas

1. [Si hay algo crítico]

### Recomendaciones

1. [Lista de mejoras]
```

## Uso

```
/security-check
/security-check --full    # Análisis completo (usa skill xmon:security-audit)
/security-check --deps    # Solo dependencias
/security-check --secrets # Solo secrets
```
