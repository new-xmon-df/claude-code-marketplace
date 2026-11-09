# symfony-toolkit

Plugin para Claude Code con **dos agentes expertos** en el ecosistema PHP moderno, pensados para trabajar juntos y sugerirse mutuamente cuando una pregunta cae fuera de su scope.

## Agentes incluidos

### `@symfony-expert`

**Symfony 7.4 LTS / 8.x + Doctrine ORM 3.x + PHP 8.4**: servicios y DI, entidades rich (sin setters anémicos), repositorios con QueryBuilder, eventos, security y voters, Messenger, formularios, migraciones y optimización de queries. Conoce los cambios que rompen entre Symfony 7.4 y 8.x y entre Doctrine ORM 2.x y 3.x.

### `@api-platform-pro`

**API Platform 4.x/5.x**: `#[ApiResource]` y operaciones, state providers/processors, DTOs input/output, serialization groups, filtros declarados con `QueryParameter`, paginación, OpenAPI y security por operación. Guía la migración de proyectos que siguen en 3.x o usan filtros legacy (`#[ApiFilter]`).

## Delegación cruzada

Regla: **si toca el HTTP API o un `#[ApiResource]`, manda `@api-platform-pro`; si no, manda `@symfony-expert`**.

| Tema | symfony-expert | api-platform-pro |
|---|:---:|:---:|
| Container / DI, entidades y repositorios Doctrine | sí | delega |
| Eventos, firewall y voters, Messenger, forms, routing no-API | sí | delega |
| `#[ApiResource]`, operaciones, providers/processors, DTOs | delega | sí |
| Serialización de API, filtros, paginación, OpenAPI | delega | sí |
| Security per-operation (`security:`) | delega | sí |

## Cómo trabajan

- **Paso 0 obligatorio**: leen `composer.lock`/`composer.json` para detectar las versiones instaladas (Symfony, Doctrine, PHP, API Platform) y las convenciones del proyecto (`CLAUDE.md`, `docs/`, `Makefile`) antes de proponer.
- **Fuentes de verdad**: consultan primero `context7` (`symfony/symfony-docs`, `doctrine/orm`, `api-platform/docs`, `api-platform/core`) y solo recurren a `WebFetch`/`WebSearch` si no basta.
- **Modelo**: heredan el de la sesión (sin `model:` fijado).
- **Memoria por proyecto**: usan `memory: project`, que guarda en `.claude/agent-memory/<agente>/` las versiones, convenciones y decisiones de arquitectura detectadas.
- **Cross-refs al ecosistema xmon**: sugieren `/commit`, `/xmon:ui-ux`, `xmon:security-audit` o `xmon:hardening` cuando la pregunta sale de su scope; nunca los invocan directamente.

## Instalación

1. Añade el marketplace (una sola vez):

   ```
   /plugin marketplace add new-xmon-df/claude-code-marketplace
   ```

2. Refresca el marketplace e instala el plugin:

   ```
   /plugin marketplace update
   /plugin install symfony-toolkit@xmon-plugins
   ```

## Ejemplos de invocación

```
@symfony-expert necesito un voter que permita VIEW si el usuario es owner o admin
@symfony-expert tengo N+1 al cargar pedidos con sus items, optimízame el repositorio
@symfony-expert quiero migrar de Symfony 7.4 a 8.x, dime qué me afecta

@api-platform-pro diseña el recurso Order con DTOs input/output, provider y processor
@api-platform-pro migra los #[ApiFilter] de este recurso a QueryParameter
@api-platform-pro añade paginación por cursor a este endpoint lento con 50k registros
```

## MCPs que usa este plugin

**Requeridos**:
- `context7`

Cómo instalarlo: ver la sección [Requisitos / MCPs](../../README.md#requisitos--mcps) del README raíz.

## Licencia

MIT — ver [LICENSE](../../LICENSE).
