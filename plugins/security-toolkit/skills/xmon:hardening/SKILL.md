---
name: xmon:hardening
description: Hardening de configuraciones para producción - servidores web (cabeceras y TLS), Docker, Kubernetes (Pod Security Admission), bases de datos, Redis y AWS. Snippets de referencia actualizados y reporte priorizado.
---

# Security Hardening

Revisa y refuerza la configuración de despliegue. Para auditar el código y las dependencias del proyecto, usa `xmon:security-audit`.

---

## Paso 0: Identificar el entorno (OBLIGATORIO)

1. Localiza la configuración real en el repo antes de proponer nada: `nginx.conf` / `sites-*`, `.htaccess`, `Dockerfile`, `compose*.yml`, manifiestos K8s / Helm, `*.tf`, `postgresql.conf`, `my.cnf`, `redis.conf`, `mongod.conf`.
2. Anota versiones (imagen base, servidor web, motor de BD, Kubernetes): varias recomendaciones dependen de ellas.
3. Si el entorno no está en el repo, pregunta qué se despliega y dónde, y el nivel objetivo (básico, defensa en profundidad o cumplimiento de un estándar concreto).

Compara la configuración encontrada con los snippets siguientes y propone solo los cambios que falten.

---

## Servidores web

### Cabeceras de seguridad

Referencia: [OWASP HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html).

- **`X-XSS-Protection` está obsoleta** ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-XSS-Protection)): no la envíes, o envíala como `0`. Nunca `1; mode=block`. La protección real es una CSP sin `'unsafe-inline'`.
- Para el framing, prefiere CSP `frame-ancestors`; mantén `X-Frame-Options: DENY` (o `SAMEORIGIN`) solo como fallback.
- HSTS solo cuando todo el dominio (y subdominios, si usas `includeSubDomains`) sirve HTTPS; un error bloquea a los usuarios durante todo el `max-age`. Revisa los requisitos antes de añadir `preload`.

#### Nginx

```nginx
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'none'" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

server_tokens off;
```

Ojo: `add_header` en un bloque `location` anula los heredados del `server`; repítelos o centralízalos en un include.

#### Apache

```apache
Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains"
Header always set Content-Security-Policy "default-src 'self'; frame-ancestors 'none'"
Header always set X-Frame-Options "DENY"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

ServerTokens Prod
ServerSignature Off
Options -Indexes
```

### TLS

Referencia: [Server Side TLS (tlsref.org)](https://docs.tlsref.org/server-side-tls.html), sucesor de la guía de Mozilla. Genera la configuración exacta para tu servidor y versión con [TLSRef Configurator](https://configurator.tlsref.org/) en lugar de copiarla a mano.

Perfil *Intermediate* (compatibilidad general) en Nginx:

```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
ssl_prefer_server_ciphers off;
```

Perfil *Modern*: solo `TLSv1.3`, cuando todos los clientes lo soportan.

---

## Docker

### Dockerfile

- Imagen base oficial con tag concreto (nunca `latest`) y de una versión con soporte: para Node, una línea **LTS** vigente según el [calendario oficial](https://nodejs.org/en/about/previous-releases) (Node 20 y anteriores ya son EOL).
- Multi-stage; sin secrets en capas ni en `ARG`/`ENV`; usuario no root.

```dockerfile
FROM node:<lts>-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:<lts>-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]
```

`npm ci --only=production` está deprecado; usa `--omit=dev` ([npm config](https://docs.npmjs.com/cli/v11/using-npm/config)). Las imágenes oficiales de Node ya incluyen el usuario `node`.

### Docker Compose

```yaml
services:
  app:
    read_only: true
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

No uses `privileged: true` ni montes `/var/run/docker.sock` salvo necesidad justificada. Auditoría: Docker Bench Security.

---

## Kubernetes

`PodSecurityPolicy` ya no existe: usa **Pod Security Admission** (estable desde v1.25) con etiquetas en el namespace. Referencias: [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/), [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/).

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: app
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/warn: restricted
    pod-security.kubernetes.io/audit: restricted
```

Pod compatible con el perfil `restricted` (seccomp explícito es obligatorio en ese perfil):

```yaml
spec:
  securityContext:
    runAsNonRoot: true
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: app
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop: ["ALL"]
    resources:
      limits:
        memory: "128Mi"
        cpu: "500m"
```

NetworkPolicy deny-all por defecto (abre después solo el tráfico necesario):

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

Auditoría del clúster: kube-bench.

---

## Bases de datos

### PostgreSQL

```sql
-- postgresql.conf: ssl = on, password_encryption = scram-sha-256
-- pg_hba.conf: método scram-sha-256, nunca trust en conexiones remotas
SELECT rolname FROM pg_roles WHERE rolsuper;
REVOKE ALL ON DATABASE mydb FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
```

### MySQL / MariaDB

```sql
-- Revisar usuarios anónimos, root remoto y plugin de autenticación
SELECT User, Host, plugin FROM mysql.user;
-- Eliminar los sobrantes con DROP USER (no con DELETE sobre mysql.user)
DROP USER ''@'localhost';
```

### MongoDB

```javascript
// mongod.conf: security.authorization: enabled y net.bindIp restringido
db.createUser({
  user: "appuser",
  pwd: passwordPrompt(),
  roles: [{ role: "readWrite", db: "mydb" }]
})
```

### Redis

Referencias: [Redis security](https://redis.io/docs/latest/operate/oss_and_stack/management/security/), [ACL](https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/). `rename-command` está deprecado: bloquea comandos con ACL. `requirepass` es el método legacy (solo pone password al usuario `default`).

```
# redis.conf
bind 127.0.0.1
protected-mode yes
user default off
user app on >PASSWORD_LARGO ~app:* +@all -@dangerous
```

Genera la password con `ACL GENPASS`. Con muchos usuarios, usa `aclfile` en lugar de definirlos en `redis.conf` (son incompatibles entre sí).

---

## AWS

- **S3**: Block Public Access, cifrado en reposo (SSE-S3 / SSE-KMS), bucket policies restrictivas, logging y versioning.
- **IAM**: MFA en root y administradores, mínimo privilegio, sin access keys de larga duración donde se puedan usar roles, root fuera del uso diario.
- **Security Groups**: sin `0.0.0.0/0` en puertos de administración o BD, reglas por puerto con descripción.

---

## Reporte

```markdown
# Reporte de Hardening

**Entorno**: [tipo y versiones] · **Fecha**: [fecha] · **Nivel objetivo**: [básico/intermedio/cumplimiento]

## Estado actual

| Área | Estado | Prioridad |
|------|--------|-----------|
| Cabeceras HTTP | OK / Parcial / Falta | Alta/Media/Baja |
| TLS | ... | ... |
| Contenedores | ... | ... |
| ... | ... | ... |

## Acciones

### Alta prioridad
1. [Cambio con el snippet o comando exacto y el archivo donde va]

### Media prioridad
1. ...

### Baja prioridad
1. ...
```

## Verificación

Tras aplicar cambios, compruébalos sobre el sistema real, no solo en el archivo: `nginx -t` / `apachectl configtest` antes de recargar, `curl -sI https://<host>` para ver las cabeceras servidas, `docker inspect` para usuario y capabilities, y `kubectl label --dry-run=server` sobre el namespace para ver qué pods violarían el perfil antes de aplicar `enforce`.
