# security-toolkit

Plugin para Claude Code con **dos skills de seguridad** stack-agnósticas: una audita el proyecto completo y la otra refuerza la configuración de despliegue.

## Skills incluidas

### `xmon:security-audit`

Auditoría del **proyecto entero** (no solo del diff):

- Detección del stack por manifiestos y lockfiles
- Secrets expuestos en el árbol y en el historial (`gitleaks` si está instalado)
- Dependencias vulnerables con la herramienta de cada ecosistema (`npm audit`, `composer audit`, `pip-audit`, `bundle-audit`, `govulncheck`, `cargo audit`, `dotnet package list --vulnerable`)
- Checklist **OWASP Top 10 2025**
- Reporte con hallazgos por severidad (`archivo:línea`, impacto, remediación) y verificación posterior

**Cuándo usarla**: antes de un despliegue a producción o para revisar el estado de seguridad global de un repo. Para revisar solo los cambios pendientes de la rama actual, usa el comando nativo de Claude Code `/security-review`.

### `xmon:hardening`

Hardening de configuraciones con snippets de referencia actualizados:

- Servidores web: cabeceras de seguridad (sin `X-XSS-Protection` obsoleta) y TLS según tlsref.org
- Docker y Docker Compose: imágenes LTS, multi-stage, usuario no root, `npm ci --omit=dev`
- Kubernetes: Pod Security Admission (`restricted`) y NetworkPolicy deny-all
- PostgreSQL, MySQL, MongoDB y Redis (ACL)
- AWS: S3, IAM y Security Groups

**Cuándo usarla**: al preparar o revisar un entorno de producción.

## Instalación

1. Añade el marketplace (una sola vez):

   ```
   /plugin marketplace add new-xmon-df/claude-code-marketplace
   ```

2. Refresca el marketplace e instala el plugin:

   ```
   /plugin marketplace update
   /plugin install security-toolkit@xmon-plugins
   ```

## Ejemplos de invocación

```
/xmon:security-audit
audita la seguridad de este proyecto antes de pasarlo a producción
revisa el Dockerfile y los manifiestos de Kubernetes con xmon:hardening
```

## MCPs que usa este plugin

Ninguno. Las herramientas de auditoría (`gitleaks`, `npm audit`, etc.) se usan si están instaladas en el sistema; si faltan, el reporte lo indica.

## Licencia

MIT — ver el repositorio del marketplace.
