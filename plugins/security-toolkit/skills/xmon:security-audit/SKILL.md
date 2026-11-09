---
name: xmon:security-audit
description: Auditoría de seguridad de un proyecto completo (no solo del diff) - secrets expuestos, dependencias vulnerables, configuración insegura y checklist OWASP Top 10 2025, con reporte por severidades. Stack-agnóstica.
---

# Security Audit

Audita el **proyecto entero**: código, dependencias, configuración e infraestructura versionada. Para revisar solo los cambios pendientes de la rama actual, Claude Code ya trae el comando nativo `/security-review`; esta skill es su complemento para el estado global del repo.

Para reforzar configuraciones de servidores, contenedores o bases de datos, usa `xmon:hardening`.

---

## Paso 0: Detectar stack (OBLIGATORIO)

Antes de auditar, localiza los manifiestos y anota el stack detectado (lenguaje, framework, gestor de paquetes, BD, infra):

| Ecosistema | Manifiestos / lockfiles |
|---|---|
| Node.js | `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` |
| PHP | `composer.json`, `composer.lock` |
| Python | `requirements*.txt`, `pyproject.toml`, `poetry.lock`, `uv.lock` |
| Ruby | `Gemfile`, `Gemfile.lock` |
| Go | `go.mod`, `go.sum` |
| Rust | `Cargo.toml`, `Cargo.lock` |
| Java | `pom.xml`, `build.gradle*` |
| .NET | `*.csproj`, `packages.lock.json` |
| Infra | `Dockerfile`, `compose*.yml`, `*.tf`, manifiestos K8s, `.github/workflows/*` |

Lee también `CLAUDE.md` / `docs/` del proyecto por si hay convenciones de seguridad propias.

---

## Paso 1: Secrets y credenciales

1. Si está instalado `gitleaks`, ejecútalo (cubre también el historial):
   - `gitleaks git` → historial del repositorio
   - `gitleaks dir` → árbol de trabajo actual
2. Si no está disponible, búscalos con Grep (claves, tokens, `BEGIN .* PRIVATE KEY`, cadenas de conexión con password) y revisa archivos sensibles: `.env*`, `*.pem`, `*.key`, `credentials*`, `secrets*`, configs con valores reales.
3. Comprueba que `.gitignore` excluye esos archivos y que ninguno está trackeado (`git ls-files`).
4. Si un secret estuvo en algún commit, la remediación es **rotarlo**: borrarlo del árbol actual no basta.

---

## Paso 2: Dependencias vulnerables

Ejecuta la herramienta del ecosistema detectado (solo las que apliquen):

| Ecosistema | Comando |
|---|---|
| Node.js | `npm audit --audit-level=high` (o el `audit` del gestor detectado) |
| PHP | `composer audit` |
| Python | `pip-audit` (o `pip-audit -r requirements.txt`) |
| Ruby | `bundle-audit check --update` |
| Go | `govulncheck ./...` |
| Rust | `cargo audit` |
| .NET | `dotnet package list --vulnerable --include-transitive` |

Si la herramienta no está instalada, indícalo en el reporte y no inventes resultados. Revisa también si los lockfiles están versionados (supply chain, A03).

---

## Paso 3: Checklist OWASP Top 10 2025

Fuente: https://owasp.org/Top10/2025/. Revisa cada categoría con foco en el stack detectado; cita la categoría en cada hallazgo.

| ID | Categoría | Qué revisar en el proyecto |
|---|---|---|
| A01:2025 | Broken Access Control | Autorización en cada endpoint, IDOR, deny-by-default, CORS, escalada de privilegios. Incluye **SSRF** (fetch/requests con URLs controladas por el usuario). |
| A02:2025 | Security Misconfiguration | Debug activo en prod, cabeceras de seguridad, defaults inseguros, servicios expuestos, permisos de cloud. |
| A03:2025 | Software Supply Chain Failures | Resultado del Paso 2, lockfiles versionados, dependencias sin mantener, acciones de CI sin fijar, origen de imágenes base. |
| A04:2025 | Cryptographic Failures | Hash de passwords (no MD5/SHA1 sin sal), TLS, cifrado en reposo, claves en código. |
| A05:2025 | Injection | SQL sin parámetros, ejecución de comandos con input, XSS, plantillas sin escape, NoSQL/LDAP. |
| A06:2025 | Insecure Design | Rate limiting, validación de flujos de negocio, límites y cuotas. |
| A07:2025 | Authentication Failures | Sesiones, cookies (`Secure`, `HttpOnly`, `SameSite`), MFA, protección contra fuerza bruta, gestión de tokens. |
| A08:2025 | Software or Data Integrity Failures | Deserialización insegura, actualizaciones sin firma, integridad de artefactos del pipeline. |
| A09:2025 | Security Logging and Alerting Failures | Eventos de seguridad registrados y alertados, sin datos sensibles en logs. |
| A10:2025 | Mishandling of Exceptional Conditions | Fail-open ante errores, excepciones sin capturar, errores verbosos al usuario, transacciones sin rollback. |

---

## Paso 4: Reporte

```markdown
# Reporte de Auditoría de Seguridad

**Proyecto**: [nombre] · **Fecha**: [fecha] · **Stack**: [detectado]
**Herramientas ejecutadas**: [gitleaks, npm audit, ...] · **No disponibles**: [...]

## Resumen

| Severidad | Cantidad |
|-----------|----------|
| Crítica   | X |
| Alta      | X |
| Media     | X |
| Baja      | X |

## Hallazgos

### [SEV-001] [Título]

- **Severidad**: Crítica/Alta/Media/Baja
- **Categoría**: A0X:2025 [nombre]
- **Ubicación**: `archivo:línea`
- **Descripción**: qué se encontró y por qué es un problema
- **Impacto**: qué permitiría a un atacante
- **Remediación**: cambio concreto

## Recomendaciones generales

1. ...
```

Ordena los hallazgos por severidad. Separa lo verificado (con evidencia `archivo:línea` o salida de herramienta) de lo sospechoso pendiente de confirmar.

---

## Paso 5: Verificación

Tras aplicar fixes: vuelve a ejecutar las herramientas y búsquedas que detectaron cada hallazgo, confirma que desaparece y que el fix no rompe tests ni introduce otro problema. Marca cada `SEV-xxx` como resuelto, pendiente o aceptado.
