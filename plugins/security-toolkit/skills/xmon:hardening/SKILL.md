---
name: xmon:hardening
description: Hardening de configuraciones y mejores prácticas de seguridad. Revisa y refuerza configuraciones de servidores, contenedores, bases de datos y aplicaciones.
---

# Security Hardening

Skill para revisar y reforzar configuraciones de seguridad en cualquier entorno.

## Cuándo usar este skill

- Vas a desplegar una aplicación a producción
- Quieres revisar la configuración de seguridad de un servidor
- Necesitas asegurar contenedores Docker o pods de Kubernetes
- Quieres verificar la configuración de una base de datos
- Preparas un entorno para cumplir con estándares de seguridad

---

## Paso 0: Identificar el Entorno

### Preguntas clave

1. **¿Qué tipo de entorno es?**
   - Servidor web (Nginx, Apache, Caddy)
   - Aplicación (Node.js, Python, PHP, Java)
   - Contenedor (Docker, Podman)
   - Orquestación (Kubernetes, Docker Compose)
   - Base de datos (PostgreSQL, MySQL, MongoDB, Redis)
   - Cloud (AWS, GCP, Azure)

2. **¿Qué nivel de hardening necesitas?**
   - Básico: Configuración segura mínima
   - Intermedio: Defensa en profundidad
   - Avanzado: Cumplimiento de estándares (PCI-DSS, HIPAA, SOC2)

---

## Hardening por Tipo de Entorno

### Servidores Web

#### Nginx

Verificar en `nginx.conf`:

```nginx
# Headers de seguridad
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'" always;

# SSL/TLS
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

# Ocultar versión
server_tokens off;

# Limitar métodos HTTP
if ($request_method !~ ^(GET|HEAD|POST)$ ) {
    return 405;
}
```

#### Apache

Verificar en `httpd.conf` o `.htaccess`:

```apache
# Headers de seguridad
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"

# Ocultar versión
ServerTokens Prod
ServerSignature Off

# Deshabilitar listado de directorios
Options -Indexes
```

### Docker

#### Dockerfile

Checklist:
- [ ] Usar imagen base oficial y específica (no `latest`)
- [ ] No ejecutar como root (usar `USER`)
- [ ] Minimizar capas y tamaño
- [ ] No incluir secrets en la imagen
- [ ] Usar multi-stage builds

Ejemplo seguro:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
RUN addgroup -g 1001 appgroup && adduser -u 1001 -G appgroup -s /bin/sh -D appuser
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=appuser:appgroup . .
USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
services:
  app:
    # Limitar recursos
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
    # Security options
    security_opt:
      - no-new-privileges:true
    read_only: true
    # No privilegiado
    privileged: false
    # Capabilities mínimas
    cap_drop:
      - ALL
```

### Kubernetes

#### Pod Security

```yaml
apiVersion: v1
kind: Pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
          - ALL
    resources:
      limits:
        memory: "128Mi"
        cpu: "500m"
```

#### Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

### Bases de Datos

#### PostgreSQL

```sql
-- Verificar configuración en postgresql.conf
-- ssl = on
-- password_encryption = scram-sha-256

-- Revisar permisos
SELECT * FROM pg_roles WHERE rolsuper = true;

-- Revocar permisos públicos
REVOKE ALL ON DATABASE mydb FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
```

#### MySQL

```sql
-- Eliminar usuarios anónimos
DELETE FROM mysql.user WHERE User='';

-- Deshabilitar acceso remoto de root
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');

-- Verificar plugin de autenticación
SELECT User, Host, plugin FROM mysql.user;
```

#### MongoDB

```javascript
// Verificar autenticación habilitada
// En mongod.conf: security.authorization: enabled

// Crear usuario con mínimos privilegios
db.createUser({
  user: "appuser",
  pwd: passwordPrompt(),
  roles: [{ role: "readWrite", db: "mydb" }]
})
```

#### Redis

```
# En redis.conf
requirepass <strong_password>
bind 127.0.0.1
protected-mode yes
rename-command FLUSHALL ""
rename-command CONFIG ""
rename-command DEBUG ""
```

### Aplicaciones Node.js

#### Variables de entorno

```bash
# Producción
NODE_ENV=production

# Deshabilitar información de debug
DEBUG=

# Helmet para Express
```

#### package.json

```json
{
  "scripts": {
    "audit": "npm audit --audit-level=high",
    "audit:fix": "npm audit fix"
  }
}
```

### Cloud (AWS)

#### S3

- [ ] Block Public Access habilitado
- [ ] Encryption at rest (SSE-S3 o SSE-KMS)
- [ ] Bucket policies restrictivas
- [ ] Logging habilitado
- [ ] Versioning habilitado

#### IAM

- [ ] MFA en cuentas root y admin
- [ ] Políticas de mínimo privilegio
- [ ] Rotación de access keys
- [ ] No usar root para operaciones diarias

#### Security Groups

- [ ] No permitir 0.0.0.0/0 en ingress
- [ ] Reglas específicas por puerto/protocolo
- [ ] Descripción en cada regla

---

## Checklist Universal de Hardening

### Autenticación
- [ ] Passwords fuertes (mínimo 12 caracteres)
- [ ] MFA/2FA habilitado
- [ ] Rate limiting en login
- [ ] Bloqueo tras intentos fallidos
- [ ] Tokens con expiración corta

### Comunicaciones
- [ ] HTTPS/TLS en todas las comunicaciones
- [ ] Certificados válidos y actualizados
- [ ] HSTS habilitado
- [ ] Cipher suites seguros

### Acceso
- [ ] Principio de mínimo privilegio
- [ ] Segregación de roles
- [ ] Acceso basado en necesidad
- [ ] Auditoría de accesos

### Datos
- [ ] Encryption at rest
- [ ] Encryption in transit
- [ ] Backups cifrados
- [ ] Retención de datos definida

### Logging y Monitoreo
- [ ] Logs centralizados
- [ ] Alertas configuradas
- [ ] Retención de logs adecuada
- [ ] No loggear datos sensibles

### Actualizaciones
- [ ] Sistema operativo actualizado
- [ ] Dependencias actualizadas
- [ ] Proceso de patching definido
- [ ] Escaneo de vulnerabilidades regular

---

## Reporte de Hardening

### Formato

```markdown
# Reporte de Hardening

**Entorno**: [Tipo de entorno]
**Fecha**: [Fecha]
**Nivel objetivo**: [Básico/Intermedio/Avanzado]

## Estado Actual

| Área | Estado | Prioridad |
|------|--------|-----------|
| Autenticación | ✅/⚠️/❌ | Alta/Media/Baja |
| Comunicaciones | ✅/⚠️/❌ | Alta/Media/Baja |
| Acceso | ✅/⚠️/❌ | Alta/Media/Baja |
| ... | ... | ... |

## Acciones Requeridas

### Alta Prioridad
1. [Acción con comandos/configuración]

### Media Prioridad
1. [Acción con comandos/configuración]

### Baja Prioridad
1. [Acción con comandos/configuración]
```

---

## Recursos

- **CIS Benchmarks**: Guías de hardening por tecnología
- **NIST**: Frameworks de seguridad
- **OWASP**: Guías de configuración segura
- **Docker Bench Security**: Auditoría de Docker
- **kube-bench**: Auditoría de Kubernetes

---

## Checklist de Ejecución

- [ ] Identificar tipo de entorno
- [ ] Determinar nivel de hardening requerido
- [ ] Revisar configuración actual
- [ ] Comparar con best practices
- [ ] Generar reporte con hallazgos
- [ ] Aplicar configuraciones recomendadas
- [ ] Verificar cambios aplicados
- [ ] Documentar estado final
