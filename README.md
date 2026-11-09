<div align="center">

# xmon-plugins

**Marketplace de plugins para [Claude Code](https://claude.com/claude-code): skills, agentes y comandos para SEO, seguridad, UI/UX, marca, Symfony, LangChain y Git.**

![Plugins](https://img.shields.io/badge/plugins-7-blue)
![Claude Code](https://img.shields.io/badge/Claude%20Code-marketplace-d97757)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[Instalación](#instalación) · [Plugins](#plugins) · [Requisitos](#requisitos) · [Estructura](#estructura) · [Desarrollo](#desarrollo)

</div>

Cada plugin lleva solo lo que el modelo no sabe por sí mismo: cómo detectar el stack y la versión de tu proyecto, de qué fuentes oficiales fiarse, las convenciones de trabajo y el formato de salida. Antes de actuar detectan el ecosistema del proyecto (`package.json`, `composer.json`…) y se adaptan a él.

## Instalación

1. Añade el marketplace (una sola vez):

   ```
   /plugin marketplace add new-xmon-df/claude-code-marketplace
   ```

2. Instala los plugins que quieras:

   ```
   /plugin install <plugin>@xmon-plugins
   ```

> [!NOTE]
> El marketplace se cachea en local. Si un plugin nuevo o una versión nueva no aparece, ejecuta `/plugin marketplace update` antes de instalar.

Gestión habitual:

```
/plugin                       # listar plugins instalados
/plugin enable <plugin>       # activar
/plugin disable <plugin>      # desactivar
/plugin marketplace update    # refrescar el marketplace
```

## Plugins

| Plugin | Qué incluye | Para qué |
|---|---|---|
| [`ui-ux-explorer`](plugins/ui-ux-explorer) | Skill `/xmon:ui-ux` | Analizar, especificar e implementar soluciones de UI/UX en cualquier stack frontend |
| [`security-toolkit`](plugins/security-toolkit) | Skills `/xmon:security-audit`, `/xmon:hardening` | Auditar el proyecto completo y reforzar la configuración de despliegue |
| [`seo-toolkit`](plugins/seo-toolkit) | Skills `/xmon:seo-audit`, `/xmon:seo-content` | Auditoría SEO y optimización de artículos antes de publicar |
| [`langchain-toolkit`](plugins/langchain-toolkit) | Agente `@langchain-expert` + MCP | LangChain JS v1 y LangGraph JS v1 |
| [`symfony-toolkit`](plugins/symfony-toolkit) | Agentes `@symfony-expert`, `@api-platform-pro` | Symfony 7.4 LTS / 8.x, Doctrine y API Platform 4.x / 5.x |
| [`brand-identity-toolkit`](plugins/brand-identity-toolkit) | Skill `/xmon:brand-identity-pipeline` + comando `/progreso` | Proyectos de identidad de marca de principio a fin |
| [`git-toolkit`](plugins/git-toolkit) | Comando `/commit` | Commits Conventional Commits en español |

Cada plugin tiene su propio README con el detalle.

### ui-ux-explorer

Detecta tu stack frontend (framework, librería de componentes, styling) y resuelve problemas de UI/UX adaptados a él. Tiene dos modos: **spec primero**, que analiza y especifica antes de tocar código, e **implementación**, con verificación visual vía Playwright si está disponible.

```
/xmon:ui-ux el dropdown se ve cortado en móvil
/xmon:ui-ux especifica primero un sistema de notificaciones para el dashboard admin
```

### security-toolkit

Auditoría de seguridad del proyecto completo (OWASP Top 10 2025, secrets, dependencias) y hardening de configuraciones (servidores web, contenedores, Kubernetes, bases de datos).

```
/xmon:security-audit revisa el módulo de auth
/xmon:hardening dame el hardening base para mi docker-compose
```

> [!TIP]
> Para revisar solo los cambios pendientes de una rama, usa el comando nativo `/security-review` de Claude Code.

### seo-toolkit

Auditoría SEO técnica y de contenido, con modo rápido y puntuación sobre 100, y optimización de contenido antes de publicar, con foco en blogs y sitios de afiliados.

```
/xmon:seo-audit modo rápido de https://miblog.com
/xmon:seo-content optimiza este artículo antes de publicarlo
```

### langchain-toolkit

Agente para LangChain JS v1 y LangGraph JS v1: `createAgent` y middleware, RAG, tools, structured output, StateGraph, checkpointers, human-in-the-loop y subgrafos. Consulta la documentación oficial antes de escribir código, a través del MCP `docs-langchain` (lo instala el plugin) y de context7.

```
@langchain-expert quiero un RAG con Pinecone y memoria conversacional
@langchain-expert diseña un grafo con interrupt() para aprobación humana
```

### symfony-toolkit

Dos agentes que se derivan trabajo entre sí:

- **`@symfony-expert`**: Symfony 7.4 LTS / 8.x, Doctrine ORM y PHP 8.4 (servicios, eventos, security, Messenger, forms, entidades rich).
- **`@api-platform-pro`**: API Platform 4.x / 5.x (ApiResource, state providers/processors, DTOs, filtros, OpenAPI).

Si toca la API HTTP o un `#[ApiResource]`, manda API Platform; si no, Symfony.

```
@symfony-expert configura un transport async con retry strategy de 3 intentos
@api-platform-pro diseña el recurso Order con DTOs input/output, provider y processor
```

### brand-identity-toolkit

Lleva un proyecto de identidad de marca de principio a fin (estrategia, dirección creativa, logotipo, sistema de identidad, manual y guardián de marca) en orden de dependencias y sin saltarse fases, pasos ni guardrails. Muestra sobre el prompt el paso actual de `brand/progress.md`.

```
/xmon:brand-identity-pipeline empezamos la identidad de marca de este producto
/progreso
```

### git-toolkit

Genera mensajes Conventional Commits en español para los cambios en stage. Detecta la configuración del proyecto (`commit-prompt.txt`, commitlint) y, si no hay ninguna, usa una por defecto. Nunca añade firma de IA.

```
git add src/api/users.ts
/commit
```

## Requisitos

Los agentes consultan la documentación oficial a través de MCPs en lugar de fiarse de lo que el modelo ya sabe.

| MCP | Lo usan | Para qué | Instalación |
|---|---|---|---|
| **context7** | Agentes (requerido) | Documentación actualizada de librerías | `/plugin install context7@claude-plugins-official` |
| **playwright** | `xmon:ui-ux`, `xmon:seo-audit` (opcional) | Verificación visual y renderizado real | `claude mcp add playwright npx @playwright/mcp@latest` |

> [!IMPORTANT]
> Sin context7 los agentes siguen respondiendo, pero recurren a `WebSearch`, que es más lento y menos preciso. `langchain-toolkit` instala además su propio MCP `docs-langchain`.

Para ver qué tienes instalado: `claude mcp list`.

## Estructura

```
.
├── .claude-plugin/
│   └── marketplace.json        # registro de todos los plugins publicados
├── CLAUDE.md                   # convenciones del marketplace
└── plugins/
    └── <plugin>/
        ├── .claude-plugin/
        │   └── plugin.json     # nombre, versión y descripción (coinciden con marketplace.json)
        ├── commands/           # slash commands, sin prefijo
        ├── skills/xmon:<slug>/ # skills, con prefijo xmon:
        ├── agents/             # subagentes
        └── hooks/              # mods (p. ej. la banda de brand-identity-toolkit)
```

Cada plugin usa solo los directorios que necesita.

## Desarrollo

Tras clonar, activa el pre-commit hook anti-leakage:

```bash
./scripts/install-hooks.sh
```

El hook bloquea commits con rutas absolutas de usuario, tokens conocidos (OpenAI, GitHub, AWS, Google, Slack, claves privadas), archivos sensibles (`.env*`, `*.pem`, `*.key`…) y los patrones que añadas en `.githooks/leakage-patterns.txt`. Ese archivo está en `.gitignore`: pon ahí los nombres de tus proyectos privados y tus rutas habituales.

Antes de publicar, valida los manifiestos:

```bash
claude plugin validate .
```

Las convenciones para añadir o modificar plugins (namespace `xmon:`, versionado SemVer, cross-refs entre plugins) están en [CLAUDE.md](CLAUDE.md).
