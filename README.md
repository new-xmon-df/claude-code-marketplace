# xmon-plugins

Marketplace de plugins personalizados para Claude Code.

## Instalación

1. **Añade el marketplace** (una sola vez):

   ```
   /plugin marketplace add new-xmon-df/claude-code-marketplace
   ```

2. **Instala los plugins** con:

   ```
   /plugin install <plugin-name>@xmon-plugins
   ```

   Por ejemplo:

   ```
   /plugin install ui-ux-explorer@xmon-plugins
   /plugin install git-toolkit@xmon-plugins
   ```

Otros comandos útiles:

```
/plugin                          # listar plugins instalados
/plugin enable <name>            # activar un plugin
/plugin disable <name>           # desactivar un plugin
/plugin marketplace update       # refrescar el marketplace
```

## Plugins disponibles

### ui-ux-explorer

**Skill**: `/xmon:ui-ux`

Detecta tu stack frontend (framework, librería de componentes, styling) y resuelve problemas de UI/UX adaptados a él. Dos modos: **spec primero** (análisis y especificación implementation-ready antes de tocar código) e **implementación** con verificación visual vía Playwright si está disponible.

**Casos de uso**:
- Problemas visuales o de interacción concretos, responsive, compatibilidad cross-browser
- Especificar un flujo o pantalla antes de implementarlo (spec → implementar)
- Implementar una spec existente y verificarla en navegador

**Ejemplos**:

```
/xmon:ui-ux el dropdown se ve cortado en móvil
/xmon:ui-ux el hover no funciona en Safari
/xmon:ui-ux especifica primero un sistema de notificaciones para el dashboard admin
```

### security-toolkit

**Skills**: `/xmon:security-audit`, `/xmon:hardening`

Auditoría de seguridad del proyecto completo (OWASP Top 10 2025, secrets, dependencias) y hardening de configuraciones (servidores web, contenedores, Kubernetes, bases de datos). Para revisar solo los cambios pendientes de una rama, usa el comando nativo `/security-review` de Claude Code.

**Casos de uso**:
- Auditar el proyecto entero antes de un deploy
- Reforzar configuraciones de servidores, contenedores, bases de datos y aplicaciones

**Ejemplos**:

```
/xmon:security-audit revisa el módulo de auth
/xmon:hardening dame el hardening base para mi docker-compose
```

### seo-toolkit

**Skills**: `/xmon:seo-audit`, `/xmon:seo-content`

Auditoría SEO técnica y de contenido (con modo rápido y puntuación sobre 100) y optimización de contenido antes de publicar, con foco en blogs y sitios de afiliados.

**Casos de uso**:
- Auditoría rápida o completa del proyecto o de una URL en producción
- Optimizar contenido antes de publicar (front matter, estructura, internal linking, E-E-A-T)

**Ejemplos**:

```
/xmon:seo-audit modo rápido de https://miblog.com
/xmon:seo-audit auditoría completa con foco en indexación
/xmon:seo-content optimiza este artículo antes de publicarlo
```

### langchain-toolkit

**Agente**: `@langchain-expert`

Un agente para LangChain JS v1 y LangGraph JS v1: `createAgent` y middleware, RAG, tools, structured output, StateGraph, checkpointers, human-in-the-loop y subgrafos. Consulta la documentación oficial antes de escribir código (MCP `docs-langchain`, que el plugin instala automáticamente, más context7) y guarda memoria persistente entre sesiones.

**Casos de uso**:
- Construir agentes, RAGs y chatbots con LangChain JS v1
- Diseñar grafos con LangGraph JS v1
- Migrar código v0 a v1

**Ejemplos**:

```
@langchain-expert quiero un RAG con Pinecone y memoria conversacional
@langchain-expert diseña un grafo con interrupt() para aprobación humana
```

### symfony-toolkit

**Agentes**: `@symfony-expert`, `@api-platform-pro`

Dos agentes especializados en el ecosistema PHP moderno con delegación cruzada bidireccional:

- **`@symfony-expert`** — Symfony 7.4 LTS / 8.x + Doctrine ORM + PHP 8.4: servicios, eventos, security, Messenger, forms, entidades rich.
- **`@api-platform-pro`** — API Platform 4.x/5.x: ApiResource, state providers/processors, DTOs, filtros, OpenAPI customization.

Regla mnemotécnica: si toca HTTP API o un `#[ApiResource]`, manda API Platform; si no, manda Symfony.

**Casos de uso**:
- Diseño de servicios con autowiring y entidades Doctrine rich (`@symfony-expert`)
- Voters para autorización per-objeto (`@symfony-expert`)
- Diagnosticar N+1 queries, circular references en DI, memory leaks en commands (`@symfony-expert`)
- Migrar de DataProvider/DataPersister (2.x) a state providers/processors (3.x+) (`@api-platform-pro`)
- Diseñar recursos con DTOs in/out, provider y processor (`@api-platform-pro`)
- Filtros custom + OpenAPI customization (`@api-platform-pro`)
- Pagination cursor para endpoints lentos en collections grandes (`@api-platform-pro`)

**Ejemplos**:

```
@symfony-expert configura un transport async con retry strategy de 3 intentos
@symfony-expert me sale circular reference en el container, arréglalo

@api-platform-pro diseña el recurso Order con DTOs input/output, provider y processor
@api-platform-pro filtro custom para buscar pedidos por rango de fechas
```

### git-toolkit

**Comando**: `/commit`

Genera mensajes Conventional Commits en español para los cambios en stage, con detección automática de la configuración del proyecto (`commit-prompt.txt`, configuración de commitlint o fallback embebido). Nunca añade firma de IA al commit.

**Ejemplos**:

```
git add src/api/users.ts
/commit
```

## Requisitos / MCPs

La mayoría de los agentes del marketplace consultan documentación oficial vía MCPs en lugar de confiar en el conocimiento previo del modelo. Si no los tienes instalados, los agentes funcionan pero pierden la garantía de "fuente de verdad actualizada".

### Requerido por los agentes

| MCP | Para qué | Cómo instalarlo |
|---|---|---|
| **context7** | Documentación oficial actualizada de librerías (Symfony, Doctrine, API Platform, LangChain, LangGraph, React, etc.) | Plugin del marketplace oficial: `/plugin install context7@claude-plugins-official` |

Sin context7 los agentes siguen respondiendo, pero caen a `WebSearch` como fallback (más lento, menos preciso). `langchain-toolkit` instala además su propio MCP `docs-langchain` al activarse.

### Opcionales (skill `xmon:ui-ux`)

| MCP | Para qué | Cómo instalarlo |
|---|---|---|
| **playwright** | Testing visual, screenshots, debugging cross-browser | `claude mcp add playwright npx @playwright/mcp@latest` |

El skill `/xmon:ui-ux` detecta qué MCPs tienes disponibles al arrancar y sugiere instalar los que falten si serían útiles para tu caso. Funciona sin ninguno (trabaja directamente sobre el código).

### Verificar qué tienes instalado

```bash
claude mcp list
```

## Estructura

```
xmon-plugins/
├── .claude-plugin/
│   └── marketplace.json       # registro central del marketplace
├── README.md                  # este archivo
├── CLAUDE.md                  # guía interna para Claude
└── plugins/
    ├── git-toolkit/           # command
    ├── langchain-toolkit/     # agent + MCP
    ├── security-toolkit/      # skills
    ├── seo-toolkit/           # skills
    ├── symfony-toolkit/       # agents
    └── ui-ux-explorer/        # skill
```

Cada plugin sigue esta estructura (cualquier subconjunto de los tres subdirectorios):

```
plugins/<nombre>/
├── .claude-plugin/
│   └── plugin.json
├── commands/                  # opcional, slash commands sin prefijo
├── skills/                    # opcional, con prefijo xmon:
│   └── xmon:<slug>/
│       └── SKILL.md
└── agents/                    # opcional, subagentes
```

## Setup tras clonar (contribuidores)

Si vas a contribuir cambios al repo, activa el pre-commit hook anti-leakage:

```bash
./scripts/install-hooks.sh
```

Esto apunta Git a `.githooks/` y crea tu archivo personal de patrones (`.githooks/leakage-patterns.txt`, gitignored) a partir del template `.example`. El hook bloquea commits con:

- Rutas absolutas (`/Users/X/`, `/home/X/`)
- Tokens conocidos (OpenAI/GitHub/AWS/Google/Slack, private keys)
- Archivos sensibles staged (`.env*`, `*.pem`, `*.key`, `id_rsa*`, `credentials*`, `.npmrc`)
- Patrones específicos tuyos definidos en `.githooks/leakage-patterns.txt`

Edita `.githooks/leakage-patterns.txt` con los nombres de TUS proyectos privados, workspaces y rutas recurrentes. El archivo está gitignored — no se publicará.

## Contribuir

¿Quieres añadir tu propio plugin? Crea un PR siguiendo la estructura de los plugins existentes. Lee [CLAUDE.md](CLAUDE.md) para entender las convenciones del marketplace (namespace `xmon:`, naming de commands, versionado SemVer, etc.).

## Licencia

MIT
