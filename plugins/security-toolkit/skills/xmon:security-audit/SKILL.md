---
name: xmon:security-audit
description: Auditoría de seguridad de código y configuraciones. Detecta vulnerabilidades OWASP Top 10, malas prácticas, secrets expuestos, y problemas de seguridad en cualquier stack.
---

# Security Audit

Skill para realizar auditorías de seguridad en código y configuraciones de cualquier proyecto.

## Cuándo usar este skill

- Quieres revisar el código en busca de vulnerabilidades
- Necesitas detectar secrets o credenciales expuestas
- Quieres verificar que tu código cumple con OWASP Top 10
- Vas a hacer code review con foco en seguridad
- Preparas una aplicación para producción

---

## Paso 0: Detectar Stack y Entorno (OBLIGATORIO)

**ANTES de auditar**, detecta el stack del proyecto:

### Archivos a buscar

```
# Backend
package.json          # Node.js
composer.json         # PHP
requirements.txt      # Python
Gemfile              # Ruby
go.mod               # Go
pom.xml / build.gradle # Java
*.csproj             # .NET

# Frontend
package.json         # Dependencias JS
angular.json         # Angular
next.config.*        # Next.js
nuxt.config.*        # Nuxt

# Infraestructura
Dockerfile           # Contenedores
docker-compose.yml   # Orquestación
*.tf                 # Terraform
*.yaml / *.yml       # K8s, Ansible
```

### Identificar el entorno

1. **Leer archivos de configuración** para determinar:
   - Lenguaje principal
   - Framework usado
   - Base de datos
   - Servicios externos

2. **Guardar contexto detectado**:
   ```
   Stack detectado:
   - Backend: [Node.js/PHP/Python/Go/Java/etc.]
   - Framework: [Express/Laravel/Django/Spring/etc.]
   - Frontend: [React/Vue/Angular/etc.]
   - DB: [PostgreSQL/MySQL/MongoDB/etc.]
   - Infra: [Docker/K8s/AWS/etc.]
   ```

---

## Paso 1: Verificar herramientas disponibles

### Herramientas siempre disponibles
- **Grep**: Buscar patrones en código
- **Glob**: Encontrar archivos por extensión
- **Read**: Leer código y configuraciones
- **WebSearch**: Buscar CVEs y vulnerabilidades conocidas

### MCPs opcionales útiles
| MCP | Para qué sirve |
|-----|----------------|
| **Sequential Thinking** | Análisis metódico de vulnerabilidades complejas |
| **Context7** | Documentación de seguridad de frameworks |

---

## Paso 2: Análisis de Secrets y Credenciales

### Patrones a buscar (CRÍTICO)

Usar la herramienta Grep para buscar estos patrones:

**API Keys y Tokens:**
- `api[_-]?key`
- `secret[_-]?key`
- `access[_-]?token`
- `auth[_-]?token`
- `bearer`

**Credenciales de base de datos:**
- `password\s*=`
- `passwd\s*=`
- `DATABASE_URL`
- `MONGO.*URI`

**Cloud credentials:**
- `AWS_ACCESS_KEY`
- `AWS_SECRET`
- `GOOGLE_.*KEY`
- `AZURE_.*KEY`

**Private keys:**
- `BEGIN.*PRIVATE KEY`
- `BEGIN RSA`

### Archivos a revisar especialmente

```
.env                  # Variables de entorno
.env.*               # Variantes
config/*.json        # Configuraciones
**/secrets.*         # Archivos de secrets
**/credentials.*     # Credenciales
**/*.pem             # Certificados
**/*.key             # Claves privadas
```

### Si encuentras secrets expuestos

**Acciones recomendadas**:
1. Rotar inmediatamente las credenciales expuestas
2. Mover secrets a variables de entorno o secret manager
3. Añadir archivos sensibles a .gitignore
4. Revisar historial de git por si están en commits anteriores

---

## Paso 3: OWASP Top 10 Checklist

Consultar la guía oficial de OWASP para patrones específicos de cada categoría:

### A01: Broken Access Control
- Verificar validación de permisos en endpoints
- Buscar posibles IDOR (Insecure Direct Object Reference)
- Revisar escalación de privilegios

### A02: Cryptographic Failures
- Buscar algoritmos de hash débiles (MD5, SHA1)
- Verificar uso de HTTPS
- Revisar almacenamiento de passwords

### A03: Injection
- **SQL**: Buscar concatenación de queries sin prepared statements
- **Command**: Buscar ejecución de comandos del sistema con input de usuario
- **XSS**: Buscar renderizado de HTML sin sanitizar

Para patrones específicos de búsqueda, consultar:
- OWASP Cheat Sheet Series
- Semgrep rules para el lenguaje del proyecto

### A04: Insecure Design
- [ ] ¿Hay rate limiting?
- [ ] ¿Hay validación de inputs?
- [ ] ¿Se usa CAPTCHA donde corresponde?

### A05: Security Misconfiguration
- Buscar debug habilitado en producción
- Verificar CORS no sea demasiado permisivo
- Revisar headers de seguridad (CSP, HSTS, X-Frame-Options)

### A06: Vulnerable Components
- **Node.js**: Ejecutar `npm audit`
- **Python**: Usar `pip-audit` o `safety`
- **PHP**: Ejecutar `composer audit`

### A07: Authentication Failures
- Verificar configuración segura de sesiones
- Revisar políticas de passwords
- Comprobar cookies con flags secure y httpOnly

### A08: Software and Data Integrity
- Verificar integridad de dependencias
- Revisar pipeline de CI/CD
- Comprobar Content Security Policy

### A09: Logging Failures
- Buscar datos sensibles en logs (passwords, tokens)
- Verificar que errores no expongan información interna

### A10: SSRF
- Buscar fetch/requests con URLs provenientes de input de usuario
- Verificar validación de URLs externas

---

## Paso 4: Reporte de Auditoría

### Formato del reporte

```markdown
# Reporte de Auditoría de Seguridad

**Proyecto**: [Nombre]
**Fecha**: [Fecha]
**Stack**: [Stack detectado]

## Resumen Ejecutivo

| Severidad | Cantidad |
|-----------|----------|
| Crítica   | X        |
| Alta      | X        |
| Media     | X        |
| Baja      | X        |

## Hallazgos

### [SEV-001] [Título del hallazgo]

**Severidad**: Crítica/Alta/Media/Baja
**Categoría**: OWASP A0X
**Ubicación**: `archivo:línea`

**Descripción**:
[Qué se encontró y por qué es un problema]

**Impacto**:
[Qué podría pasar si se explota]

**Remediación**:
[Cómo solucionarlo]

---

## Recomendaciones Generales

1. [Recomendación 1]
2. [Recomendación 2]
...
```

---

## Paso 5: Verificación de Remediaciones

Una vez aplicados los fixes:

1. **Re-ejecutar búsquedas** de patrones vulnerables
2. **Verificar** que los fixes no introducen nuevos problemas
3. **Documentar** los cambios realizados

---

## Recursos externos

Para patrones de búsqueda específicos por lenguaje:
- **Semgrep Registry**: Reglas predefinidas por lenguaje y framework
- **OWASP Cheat Sheets**: Guías de prevención por tipo de vulnerabilidad
- **CWE Database**: Catálogo de debilidades de software

---

## Checklist de Ejecución

- [ ] Detectar stack y entorno
- [ ] Buscar secrets y credenciales expuestas
- [ ] Revisar OWASP Top 10
- [ ] Analizar dependencias vulnerables
- [ ] Verificar configuración de seguridad
- [ ] Generar reporte con hallazgos
- [ ] Proponer remediaciones
- [ ] Verificar fixes aplicados
