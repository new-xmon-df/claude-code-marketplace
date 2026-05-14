# xmon-plugins

Marketplace de plugins personalizados para Claude Code.

## Instalación

1. **Añade el marketplace a tu Claude Code** editando `~/.claude/settings.json` (ver sección [Configuración del marketplace](#configuración-del-marketplace) más abajo).
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
**Agente**: `@ux-consultant`

Pareja diseño + implementación de UI/UX. El skill `/xmon:ui-ux` detecta tu stack frontend (React/Next/Vue/Astro + UI lib + styling) e **implementa** soluciones adaptadas. El agente `@ux-consultant` entrega **specs previas a implementación** (heurísticas Nielsen, WCAG, jerarquía, flujos) sin escribir código. Diseñados para usarse en pareja.

**Casos de uso**:
- Problemas visuales o de interacción concretos (`/xmon:ui-ux`)
- Responsive, compatibilidad cross-browser, alternativas de diseño (`/xmon:ui-ux`)
- Diseño de onboarding flows, dashboards, guided tours antes de codificar (`@ux-consultant`)
- Auditar layouts / navegación / flujos con abandono alto (`@ux-consultant`)
- Aplicar heurísticas Nielsen y WCAG con criterios profesionales (`@ux-consultant`)
- Planificar features UX-first: spec → implementar (`@ux-consultant` → `/xmon:ui-ux`)

**Ejemplos**:

```
/xmon:ui-ux el dropdown se ve cortado en móvil
/xmon:ui-ux el hover no funciona en Safari

@ux-consultant diseña un sistema de notificaciones para el dashboard admin
@ux-consultant analiza por qué nuestro formulario tiene 70% de abandono
```

### security-toolkit

**Comando**: `/security-check`
**Skills**: `/xmon:security-audit`, `/xmon:hardening`

Plugin completo de seguridad: auditoría de código, hardening de configuraciones y guías de mejores prácticas para cualquier entorno.

**Casos de uso**:
- Detectar vulnerabilidades OWASP Top 10, secrets expuestos y malas prácticas
- Reforzar configuraciones de servidores, contenedores, bases de datos y aplicaciones
- Auditoría rápida del proyecto antes de un deploy

**Ejemplos**:

```
/security-check
/xmon:security-audit revisa el módulo de auth
/xmon:hardening dame el hardening base para mi docker-compose
```

### seo-toolkit

**Comando**: `/seo-check`
**Skills**: `/xmon:seo-audit`, `/xmon:seo-content`

Plugin completo de SEO: auditoría técnica y de contenido, optimización para sitios de afiliados/blogs, preparación para AI/LLMs, y mejores prácticas para cualquier stack.

**Casos de uso**:
- Análisis rápido SEO del proyecto o de una URL en producción
- Auditoría completa con puntuación sobre 100
- Optimizar contenido antes de publicar (front matter, keywords, internal linking, E-E-A-T)

**Ejemplos**:

```
/seo-check
/seo-check https://miblog.com
/xmon:seo-audit auditoría completa con foco en indexación
/xmon:seo-content optimiza este artículo antes de publicarlo
```

### langchain-toolkit

**Agentes**: `@langchain-js-expert`, `@langgraph-js-expert`

Dos agentes especializados en LangChain JS y LangGraph TS v1. Trabajan con tono español coloquial, consultan fuentes oficiales vía context7, mantienen memoria persistente entre sesiones y se delegan trabajo entre sí para evitar solapamiento de scope.

- **`langchain-js-expert`**: LCEL, chains, retrievers, embeddings, tools, structured output, memoria conversacional clásica, prompt templates, streaming, seguridad.
- **`langgraph-js-expert`**: StateGraph, Annotation, nodos, edges condicionales, checkpointers, `interrupt()` para human-in-the-loop, subgrafos, multi-agente, `streamEvents`.

**Casos de uso**:
- Construir chatbots, RAGs y chains con LangChain TS
- Diseñar grafos de agentes con LangGraph TS v1
- Diagnosticar errores típicos (`INVALID_CONCURRENT_GRAPH_UPDATE`, reducers, etc.)

**Ejemplos**:

```
@langchain-js-expert quiero un RAG con Pinecone y memoria conversacional
@langgraph-js-expert diseña un grafo con interrupt() para aprobación humana
```

### symfony-toolkit

**Agentes**: `@symfony-expert`, `@api-platform-pro`

Dos agentes especializados en el ecosistema PHP moderno con delegación cruzada bidireccional:

- **`@symfony-expert`** — Symfony 7 + Doctrine ORM + PHP 8.3+: servicios, eventos, security, Messenger, forms, entidades rich.
- **`@api-platform-pro`** — API Platform 3.x/4.x: ApiResource, state providers/processors, DTOs, filtros, OpenAPI customization.

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

### code-quality-toolkit

**Agente**: `@code-reviewer`

Revisión de calidad de código multi-lenguaje (JS/TS, PHP, Python, Go, Rust, Java, SQL, Shell). Audita por capas con severidades claras (🚨 crítico / ⚠️ mayor / 💡 menor / 📝 sugerencia) y entrega fixes accionables con snippet de código y referencia a OWASP/CWE/docs oficiales. Por defecto NO modifica código — reporta y propone.

**Capas que audita** (de más crítico a menos):

1. Seguridad (OWASP Top 10, secrets, AuthN/AuthZ, inyecciones)
2. Correctness (race conditions, null dereference, edge cases)
3. Performance (N+1, memory leaks, async mal usado)
4. Mantenibilidad (SOLID, acoplamiento, duplicación)
5. Tests (coverage, mocks que ocultan bugs)
6. Dependencias (CVEs, transitive vulnerabilities)
7. Estilo (solo si los linters no lo cubren)

**Comportamiento**:

- Paso 0 detecta lenguajes, frameworks, linters configurados (eslint/phpstan/ruff/etc.) y convenciones del proyecto.
- Ejecuta los linters del proyecto primero y complementa — no duplica lo que ya marcan.
- Deriva a especialistas xmon cuando detecta problemas específicos (`@symfony-expert`, `@langchain-js-expert`, `@ux-consultant`, etc.).

**Ejemplos**:

```
@code-reviewer revisa los cambios staged antes de commitear
@code-reviewer review de la PR #42 con foco en seguridad
@code-reviewer audita src/auth/ buscando OWASP Top 10
@code-reviewer revisa src/api/users.ts:45-120, sospecho que hay N+1
```

### git-toolkit

**Comando**: `/commit`
**Agente**: `@git-workflow-manager`

Herramientas para flujos de Git en español. Dos piezas con scopes complementarios:

- **`/commit`** para mensajes Conventional Commits con detección automática (`commit-prompt.txt` / `commitlint.config.js` del proyecto, o fallback embebido).
- **`@git-workflow-manager`** para diseñar y configurar el workflow del repo: branching, hooks, PRs, releases, conflictos complejos.

**Casos de uso**:
- Estandarizar mensajes de commit entre todos tus proyectos (`/commit`)
- Configurar husky + commitlint + branch protection en un repo nuevo (`@git-workflow-manager`)
- Decidir estrategia de branching para tu equipo (`@git-workflow-manager`)
- Automatizar releases con semantic-release o release-please (`@git-workflow-manager`)
- Resolver conflictos recurrentes al rebase (`@git-workflow-manager`)

**Ejemplos**:

```
git add src/api/users.ts
/commit

@git-workflow-manager diseña el workflow git para un equipo de 4 con releases semanales
@git-workflow-manager configura release-please para auto-publicar tags al hacer merge a main
```

## Configuración del marketplace

Para registrar este marketplace en tu Claude Code, edita `~/.claude/settings.json` y añade el campo `extraKnownMarketplaces` a nivel raíz:

```json
{
  "extraKnownMarketplaces": [
    {
      "url": "https://github.com/new-xmon-df/claude-code-marketplace"
    }
  ]
}
```

Tras editar el archivo, ejecuta `/plugin marketplace update` para refrescar y luego `/plugin install <plugin>@xmon-plugins` para instalar el plugin que quieras.

## Requisitos / MCPs

La mayoría de los agentes del marketplace consultan documentación oficial vía MCPs en lugar de confiar en el conocimiento previo del modelo. Si no los tienes instalados, los agentes funcionan pero pierden la garantía de "fuente de verdad actualizada".

### Requeridos por los agentes

| MCP | Para qué | Cómo instalarlo |
|---|---|---|
| **context7** | Documentación oficial actualizada de librerías (Symfony, Doctrine, API Platform, LangChain, LangGraph, React, etc.) | Plugin del marketplace oficial: `/plugin install context7@claude-plugins-official` |
| **sequential-thinking** | Razonamiento paso a paso antes de tocar código en producción o decisiones complejas | `claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking` |

Sin estos dos, los agentes seguirán respondiendo pero verás en su instrucción "no pude consultar context7" y caerán a `WebSearch` como fallback (más lento, menos preciso).

### Opcionales (solo skill `xmon:ui-ux`)

| MCP | Para qué | Cómo instalarlo |
|---|---|---|
| **playwright** | Testing visual, screenshots, debugging cross-browser | `claude mcp add playwright -- npx @anthropic-ai/mcp-playwright` |
| **shadcn** | Añadir/modificar componentes shadcn/ui | `claude mcp add shadcn -- npx shadcn@latest mcp` |
| **browser-tools** | DevTools remoto, consola, network | `claude mcp add browsertools -- npx @anthropic-ai/mcp-browser-tools` |
| **figma** | Extraer diseños de Figma | `claude mcp add figma -- npx @anthropic-ai/mcp-figma` |

El skill `/xmon:ui-ux` detecta cuáles tienes disponibles al arrancar y sugiere instalar los que falten si serían útiles para tu caso. Funciona sin ninguno (cae a Read/Edit puros sobre el código).

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
    ├── code-quality-toolkit/  # solo agents
    ├── git-toolkit/           # commands + agent
    ├── langchain-toolkit/     # solo agents
    ├── security-toolkit/      # commands + skills
    ├── seo-toolkit/           # commands + skills
    ├── symfony-toolkit/       # solo agents
    └── ui-ux-explorer/        # skill + agent
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
