# langchain-toolkit

Plugin para Claude Code que empaqueta **dos agentes expertos** en el ecosistema LangChain TypeScript, pensados para trabajar codo con codo y delegarse entre sí cuando una consulta cae fuera de su scope.

## Agentes incluidos

### `langchain-js-expert`

Experta senior en **LangChain JS/TypeScript puro**. Su terreno:

- LCEL (LangChain Expression Language) y composición de chains con `.pipe()`
- Retrievers, embeddings y RAG (vector stores, multi-query, parent document, contextual compression)
- Tools y tool calling (sin grafo)
- Structured output (`withStructuredOutput`)
- Memoria conversacional clásica (buffers, sumarización, históricos con `ChatMessageHistory`)
- Prompt templates y few-shot
- Streaming de respuestas y handlers
- Seguridad: API keys, prompt injection, sanitización de input, rate limiting

**Cuándo invocarla**: chatbots, RAG, chains de inferencia, integraciones con OpenAI/Anthropic/etc., gestión de memoria a nivel mensaje, optimización de prompts.

### `langgraph-js-expert`

Experta senior en **LangGraph TS v1**, la capa de grafos de agentes encima de LangChain. Su terreno:

- `StateGraph` y diseño del state schema con `Annotation`
- Nodos, edges (incluidos los condicionales) y reducers
- Checkpointers (memoria persistente del grafo) y `thread_id`
- Human-in-the-loop con `interrupt()` y `Command(resume=...)`
- Subgrafos y orquestación multi-agente
- Streaming de eventos del grafo (`streamEvents`)
- Diagnóstico de errores típicos (`INVALID_CONCURRENT_GRAPH_UPDATE`, race conditions de reducers)

**Cuándo invocarla**: cualquier flujo no-lineal con routing condicional, loops, retries con contador en el state, multi-agente, pause/resume, o cuando aparezca un `StateGraph` en el código.

## Delegación cruzada (scope matrix)

Los agentes se delegan trabajo entre sí para evitar solapamiento. Esta tabla resume quién manda en cada cosa:

| Tema | langchain-js-expert | langgraph-js-expert |
|------|:-------------------:|:-------------------:|
| LCEL, `.pipe()`, chains | sí | delega |
| Retrievers, RAG, embeddings | sí | delega |
| Tool calling sin grafo | sí | delega |
| Memoria conversacional clásica (buffers) | sí | delega |
| Prompt templates | sí | delega |
| Structured output | sí | delega |
| `StateGraph`, `Annotation`, nodos, edges | delega | sí |
| Checkpointers y `thread_id` | delega | sí |
| `interrupt()` / human-in-the-loop | delega | sí |
| Subgrafos y multi-agente | delega | sí |
| `streamEvents` de un grafo | delega | sí |
| Reducers y `INVALID_CONCURRENT_GRAPH_UPDATE` | delega | sí |

Regla mnemotécnica: **si hay grafo, manda LangGraph; si no, manda LangChain.**

## Fuentes de verdad

Ambos agentes consultan **OBLIGATORIAMENTE** `context7` antes de responder sobre API o patrones, porque las librerías de LangChain cambian rápido y el conocimiento entrenado en el modelo puede estar desfasado.

- `langchain-js-expert` → `langchain-ai/langchainjs` vía `mcp__context7__resolve-library-id` + `mcp__context7__query-docs`
- `langgraph-js-expert` → `langchain-ai/langgraphjs` (con fallback a `langchain-ai/langchainjs` para tipos compartidos)

Solo si context7 no devuelve lo necesario, los agentes recurren a `WebSearch` como fallback. NUNCA inventan API basándose en conocimiento previo sin verificar.

## Características compartidas

- **Modelo**: `sonnet` (configurable vía override).
- **Memoria file-based**: ambos agentes usan el sistema persistente de Claude Code (`~/.claude/projects/.../memory/`) para recordar preferencias, decisiones de arquitectura y bugs ya resueltos entre sesiones.
- **Sequential thinking obligatorio**: antes de tocar código que ya funciona o si algo falla al primer intento, llaman a `mcp__sequential-thinking__sequentialthinking` para razonar paso a paso en vez de entrar en bucles de prueba-error.
- **Tools restringidas**: `Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`, `TodoWrite`, `context7`, `sequential-thinking`, `WebSearch`, `WebFetch`. Nada de tools innecesarias.

## Instalación

1. Añade el marketplace a tu `~/.claude/settings.json` (campo top-level `extraKnownMarketplaces`):

   ```json
   {
     "extraKnownMarketplaces": [
       { "url": "https://github.com/new-xmon-df/claude-code-marketplace" }
     ]
   }
   ```

2. Refresca el marketplace e instala el plugin:

   ```
   /plugin marketplace update
   /plugin install langchain-toolkit@xmon-plugins
   ```

Tras instalar, los dos agentes quedan disponibles como subagentes invocables vía la herramienta `Agent` o vía `@langchain-js-expert` / `@langgraph-js-expert` en el chat.

## Ejemplos de invocación

### langchain-js-expert

> "Necesito un chatbot que recuerde el historial usando `ChatMessageHistory` y `RunnableWithMessageHistory`, con sumarización al pasar de 20 mensajes."

> "Tengo un RAG con `MemoryVectorStore` y quiero migrar a Pinecone manteniendo la misma chain de LCEL."

> "¿Cómo securizo este endpoint contra prompt injection antes de pasar el input al modelo?"

### langgraph-js-expert

> "Diseña un grafo con un nodo `clasificar` que decida si el email es urgente o normal, y un edge condicional que enrute a `responder_urgente` o `responder_normal`."

> "Me sale `INVALID_CONCURRENT_GRAPH_UPDATE` cuando dos nodos paralelos escriben en el mismo campo del state, ¿cómo lo arreglo con un reducer?"

> "Quiero que el grafo se pause antes de enviar el email y espere aprobación humana con `interrupt()`."

## MCPs que usa este plugin

**Requeridos**:
- `context7`
- `sequential-thinking`

**Opcionales**:
_(ninguno)_

Ambos agentes consultan `context7` apuntando a `langchain-ai/langchainjs` y `langchain-ai/langgraphjs` como fuente de verdad obligatoria de las APIs.

Cómo instalar cada MCP: ver la sección [Requisitos / MCPs](../../README.md#requisitos--mcps) del README raíz.

## Licencia

MIT — ver el repositorio del marketplace.
