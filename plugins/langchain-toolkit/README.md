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

Ambos agentes consultan fuentes oficiales antes de responder. Las librerías de LangChain cambian rápido y el conocimiento entrenado en el modelo puede estar desfasado, así que NUNCA se inventa API.

Hay dos fuentes complementarias con scope distinto:

| Fuente | Indexa | Mejor para | Estado |
|---|---|---|---|
| `context7` | Código del repo GitHub (`.ts`, READMEs, ejemplos) | Firmas exactas, tipos, código real, búsqueda por símbolo | **Requerido** |
| `docs-langchain` | Documentación curada de `docs.langchain.com` vía `llms.txt` | Conceptos, how-to guides, tutorials, migration guides, LangSmith | **Recomendado** |

Reparto operativo:
- `langchain-js-expert` → `context7` apuntando a `langchain-ai/langchainjs` para API/código; `docs-langchain` con `https://js.langchain.com/llms.txt` para conceptos.
- `langgraph-js-expert` → `context7` apuntando a `langchain-ai/langgraphjs` (con fallback a `langchain-ai/langchainjs` para tipos compartidos) para API/código; `docs-langchain` con `https://langchain-ai.github.io/langgraphjs/llms.txt` para conceptos.

Si `docs-langchain` no está instalado, los agentes caen a `context7` sin romperse y avisan una sola vez de que la respuesta sería más rica con ambas fuentes. `WebSearch` queda como fallback general solo si ninguna fuente oficial devuelve nada útil.

## Características compartidas

- **Modelo**: `sonnet` (configurable vía override).
- **Memoria file-based**: ambos agentes usan el sistema persistente de Claude Code (`~/.claude/projects/.../memory/`) para recordar preferencias, decisiones de arquitectura y bugs ya resueltos entre sesiones.
- **Sequential thinking obligatorio**: antes de tocar código que ya funciona o si algo falla al primer intento, llaman a `mcp__sequential-thinking__sequentialthinking` para razonar paso a paso en vez de entrar en bucles de prueba-error.
- **Tools restringidas**: `Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`, `TodoWrite`, `context7`, `docs-langchain` (opcional), `sequential-thinking`, `WebSearch`, `WebFetch`. Nada de tools innecesarias.

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
- `context7` — indexación de repos GitHub (`langchain-ai/langchainjs`, `langchain-ai/langgraphjs`) para firmas exactas, tipos y código de ejemplo.
- `sequential-thinking` — razonamiento paso a paso antes de modificar código que funciona o al primer fallo, para evitar bucles de prueba-error.

**Recomendados (no requeridos)**:
- `docs-langchain` — MCP oficial de LangChain que sirve la documentación curada de `docs.langchain.com` vía `llms.txt`. Aporta conceptos, how-to guides, tutorials, migration guides (v0 → v1) y docs de LangSmith que `context7` no cubre con la misma calidad.

Cómo instalar `docs-langchain` (el nombre debe ser **exactamente** ese o las tools del frontmatter no matchean):

```bash
claude mcp add --transport http docs-langchain https://docs.langchain.com/mcp
```

Tools que expone (servidor Mintlify "Docs by LangChain" v1.0):
- `mcp__docs-langchain__search_docs_by_lang_chain` — búsqueda semántica sobre la knowledge base; devuelve hits con título y path `.mdx`.
- `mcp__docs-langchain__query_docs_filesystem_docs_by_lang_chain` — shell read-only sobre un filesystem virtualizado con las páginas `.mdx`. Soporta `rg`, `grep`, `find`, `tree`, `ls`, `cat`, `head`, `tail`, `stat`, `wc`, `sort`, `uniq`, `cut`, `sed`, `awk`, `jq`. Stateless por call (resetea al `/`), output truncado a 30KB por llamada.

Si no instalas `docs-langchain` el plugin sigue funcionando: ambos agentes detectan su ausencia y caen a `context7` informando una sola vez de que la respuesta sería más completa con el MCP instalado.

Cómo instalar `context7` y `sequential-thinking`: ver la sección [Requisitos / MCPs](../../README.md#requisitos--mcps) del README raíz.

## Licencia

MIT — ver el repositorio del marketplace.
