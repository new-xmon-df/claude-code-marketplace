# langchain-toolkit

Plugin para Claude Code con **un agente experto** en LangChain JS v1 y LangGraph JS v1 (TypeScript).

## Agente incluido

### `langchain-expert`

- Agentes con `createAgent` y middleware, tools, structured output, RAG.
- Grafos con `StateGraph`: state, nodos, edges condicionales, reducers, subgrafos, streaming.
- Memoria: checkpointers + `thread_id` (corto plazo) y stores (largo plazo).
- Human-in-the-loop con `interrupt()` y `Command({ resume })`.
- Migración v0 -> v1 (`createReactAgent` -> `createAgent`, `@langchain/classic`, Node.js 22+).
- Diagnóstico de errores típicos (`INVALID_CONCURRENT_GRAPH_UPDATE`).

Antes de responder detecta las versiones de `langchain`, `@langchain/core` y `@langchain/langgraph` en `package.json` y verifica la API en las fuentes oficiales.

## Fuentes de verdad

| Fuente | Mejor para | Estado |
|---|---|---|
| `context7` (`langchain-ai/langchainjs`, `langchain-ai/langgraphjs`) | Firmas exactas, tipos, código del repo | **Requerido** (global) |
| `docs-langchain` (`https://docs.langchain.com/mcp`) | Conceptos, guías, middleware, migración, LangSmith | **Auto-instalado** por el plugin |

`WebFetch` / `WebSearch` quedan como fallback.

## Características

- **Modelo**: sin `model:` en el frontmatter; usa el modelo de la sesión.
- **Memoria**: `memory: user` (memoria nativa de subagentes en `~/.claude/agent-memory/langchain-expert/`).
- **Tools**: `Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`, `context7`, `docs-langchain`, `WebSearch`, `WebFetch`.

## Instalación

1. Añade el marketplace (una sola vez):

   ```
   /plugin marketplace add new-xmon-df/claude-code-marketplace
   ```

2. Refresca el marketplace e instala el plugin:

   ```
   /plugin marketplace update
   /plugin install langchain-toolkit@xmon-plugins
   ```

El agente queda disponible vía la herramienta `Agent` o como `@langchain-expert` en el chat. El plugin registra el MCP `docs-langchain`; comprueba con `claude mcp list` que aparece como `connected`.

### Actualizar desde versiones anteriores

- **< 0.5.0**: los dos agentes anteriores (uno para LangChain y otro para LangGraph) se han fusionado en `langchain-expert`. Actualiza tus referencias.
- **< 0.4.0**: el MCP no se auto-instalaba. Reinstala el plugin y reinicia Claude Code:

  ```
  /plugin marketplace update
  /plugin uninstall langchain-toolkit@xmon-plugins
  /plugin install langchain-toolkit@xmon-plugins
  ```

## Ejemplos de invocación

> "Migra este agente de `createReactAgent` a `createAgent` y pasa el pre-model hook a middleware."

> "Diseña un grafo con un nodo `clasificar` que enrute a `responder_urgente` o `responder_normal`."

> "Me sale `INVALID_CONCURRENT_GRAPH_UPDATE` cuando dos nodos paralelos escriben en el mismo campo del state."

> "Quiero que el grafo se pause antes de enviar el email y espere aprobación humana."

## MCPs

**Auto-instalado** (`mcpServers` en `plugin.json`): `docs-langchain`, servidor de documentación de `docs.langchain.com`. Tools:
- `mcp__docs-langchain__search_docs_by_lang_chain`: búsqueda semántica; devuelve título y path `.mdx`.
- `mcp__docs-langchain__query_docs_filesystem_docs_by_lang_chain`: shell read-only sobre las páginas `.mdx` (`rg`, `tree`, `head`, `cat`...). Stateless por llamada, salida truncada a 30KB.

**Requerido a nivel global**: `context7`. Ver [Requisitos / MCPs](../../README.md#requisitos--mcps) en el README raíz.

## Licencia

MIT — ver el repositorio del marketplace.
