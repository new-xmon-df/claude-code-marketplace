# symfony-toolkit

Plugin para Claude Code con **dos agentes expertos** en el ecosistema PHP moderno, pensados para trabajar codo con codo y delegarse trabajo entre sí cuando una pregunta cae fuera de su scope.

## Agentes incluidos

### `@symfony-expert`

Experta senior en **Symfony 7 + Doctrine ORM + PHP 8.3+**. Su terreno:

- Service Container y Dependency Injection (autowiring, decoradores, compiler passes, lazy services)
- Doctrine ORM (entidades rich sin setters anémicos, repositorios con QueryBuilder, optimización de queries, migraciones)
- Eventos (kernel, Doctrine, custom domain events, subscribers vs listeners)
- Security Component (authenticators, voters, JWT, CSRF, rate limiting)
- Messenger (sync/async transports, retry strategies, scheduler)
- Forms (form types, data transformers, validation groups, embedded forms)
- HTTP Foundation & Routing (attributes, parameter converters, streaming responses)

**Cuándo invocarla**: cualquier pregunta sobre Symfony / Doctrine puros, diseño de servicios, entidades, voters, formularios, configuración del container.

### `@api-platform-pro`

Experta senior en **API Platform 3.x/4.x**, la capa de API REST/GraphQL encima de Symfony. Su terreno:

- `#[ApiResource]` y todas las operaciones (Get, GetCollection, Post, Put, Patch, Delete)
- **State Providers/Processors** (sustitutos de DataProvider/DataPersister deprecados en 3.x)
- DTOs Input/Output (cuándo usar DTOs vs exponer entidades, mapping bidireccional)
- Serialización con groups (`recurso:read`, `recurso:write`)
- Filtros (built-in: SearchFilter/DateFilter/etc., y custom extendiendo `AbstractFilter`)
- OpenAPI customization (description, responses, examples, decoradores)
- Security per-operation (`security`, `securityPostDenormalize`)
- Pagination (offset / cursor)
- GraphQL filters cuando aplica

**Cuándo invocarla**: cualquier pregunta que toque la capa de API — recursos, operaciones, DTOs, serialización, filtros, OpenAPI, paginación.

## Delegación cruzada (scope matrix)

Los agentes se delegan trabajo entre sí para evitar solapamiento:

| Tema | symfony-expert | api-platform-pro |
|---|:---:|:---:|
| Service container / DI | sí | delega |
| Entidades Doctrine + Repositories | sí | delega |
| Eventos del kernel / Doctrine | sí | delega |
| Voters y security base (firewall, providers) | sí | delega |
| Messenger transports y middlewares | sí | delega |
| Form types y data transformers | sí | delega |
| Routing genérico (no API) | sí | delega |
| `#[ApiResource]` y operaciones | delega | sí |
| State Providers/Processors | delega | sí |
| DTOs Input/Output | delega | sí |
| Serialization groups, normalizers de API | delega | sí |
| Filtros API Platform | delega | sí |
| OpenAPI customization | delega | sí |
| Security per-operation (atributos `security:`) | delega | sí |
| Paginación API | delega | sí |

Regla mnemotécnica: **si toca el HTTP API o un `#[ApiResource]`, manda API Platform; si no, manda Symfony**.

## Fuentes de verdad

Ambos agentes consultan **OBLIGATORIAMENTE** `context7` antes de responder sobre API o patrones, porque tanto Symfony 7 como API Platform 3.x/4.x cambian rápido y el conocimiento entrenado en el modelo puede estar desfasado.

- `@symfony-expert` → `symfony/symfony` y `doctrine/orm` vía `mcp__context7__*`
- `@api-platform-pro` → `api-platform/core` y `symfony/symfony` para tipos compartidos

Solo si context7 no devuelve lo necesario, los agentes recurren a `WebSearch`/`WebFetch` como fallback. NUNCA inventan API basándose en conocimiento previo sin verificar.

## Características compartidas

- **Modelo**: `sonnet`.
- **Paso 0 obligatorio**: detección del entorno antes de proponer (versiones de Symfony / Doctrine / PHP / API Platform, convenciones del proyecto en `CLAUDE.md` / `docs/`).
- **Memoria file-based**: ambos usan el sistema persistente de Claude Code para recordar versiones, decisiones arquitectónicas y convenciones del proyecto entre sesiones.
- **Sequential thinking obligatorio**: antes de tocar código en producción o cambiar contratos públicos.
- **Cross-refs al ecosistema xmon**: sugieren `@code-reviewer`, `xmon:security-audit`, `/commit`, etc., cuando la pregunta sale de su scope.

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
   /plugin install symfony-toolkit@xmon-plugins
   ```

Tras instalar, los dos agentes quedan disponibles como subagentes invocables vía la herramienta `Agent` o como `@symfony-expert` / `@api-platform-pro`.

## Ejemplos de invocación

### symfony-expert

```
@symfony-expert necesito un voter que permita VIEW si el usuario es owner o admin
@symfony-expert me sale circular reference en el container, ¿cómo lo arreglo?
@symfony-expert tengo N+1 al cargar pedidos con sus items, optimízame el repositorio
@symfony-expert configura un transport async con doctrine y retry strategy de 3 intentos
@symfony-expert quiero migrar de Symfony 6.4 a 7.x, dime los breaking changes que me afectan
```

### api-platform-pro

```
@api-platform-pro diseña el recurso Order con DTOs input/output, provider y processor
@api-platform-pro necesito un filtro custom para buscar pedidos por rango de fechas
@api-platform-pro tengo problema con circular references al serializar Customer en Order
@api-platform-pro quiero migrar de DataProvider/Persister (API Platform 2.x) a state providers/processors (3.x)
@api-platform-pro añade pagination cursor a este endpoint que está lento con 50k registros
```

## Licencia

MIT — ver el repositorio del marketplace.
