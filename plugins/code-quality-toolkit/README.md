# code-quality-toolkit

Plugin para Claude Code con **revisión de calidad de código** multi-lenguaje en español. La v0.1.0 expone un agente, irá creciendo con más herramientas de calidad (refactor advisor, test coverage analyzer, etc.) en versiones futuras.

## Agente incluido

### `@code-reviewer`

Revisora senior de código que audita por capas, prioriza por severidad real y entrega feedback accionable con fixes concretos. **Por defecto NO escribe código** — reporta y propone, para que el dev (o un agente con permisos) los aplique.

**Lenguajes soportados**:

JavaScript/TypeScript, PHP, Python, Go, Rust, Java, SQL, Shell. Adaptable a otros — el contenido es agnóstico al lenguaje, lo que cambia son las herramientas que se usan en el Paso 0 de detección.

**Capas que audita** (de más crítico a menos):

1. **Seguridad** (crítico) — OWASP Top 10, secrets en código, validación de input, AuthN/AuthZ, inyecciones, deserialización insegura.
2. **Correctness** (crítico) — race conditions, off-by-one, null dereference, error handling roto, edge cases no cubiertos.
3. **Performance** (mayor) — N+1 queries, memory leaks, async/await mal usados, loops caros, missing indexes.
4. **Mantenibilidad** (mayor) — SOLID, acoplamiento alto, funciones gigantes, duplicación significativa.
5. **Tests** (mayor) — coverage insuficiente en código crítico, mocks que ocultan bugs, tests frágiles.
6. **Dependencias** (menor) — CVEs en deps, transitive vulnerabilities, deps innecesarias.
7. **Estilo / formato** (sugerencia) — solo si los linters no lo cubren ya.

**Comportamiento clave**:

- **Paso 0 obligatorio**: detecta lenguajes, frameworks, linters/static analysis configurados (eslint, phpstan, ruff, golangci, etc.), scope (staged / branch / PR / archivo / general), y convenciones del proyecto (`CLAUDE.md`, `CONTRIBUTING.md`, `docs/`).
- **Ejecuta los linters del proyecto primero**: complementa el análisis automatizado, no lo duplica.
- **Severidades claras**: 🚨 Crítico / ⚠️ Mayor / 💡 Menor / 📝 Sugerencia. Si todo se marca como crítico, nada lo es.
- **Findings específicos, nunca vagos**: cada hallazgo lleva ubicación (`file:line`), qué pasa, por qué importa, fix propuesto con snippet, y referencia (OWASP / CWE / docs oficiales) en críticos.
- **Reconoce lo bueno**: refuerzo positivo al menos en un patrón bien resuelto.

**Formato del reporte**:

```markdown
# Code Review: <scope>

## Resumen ejecutivo
- 🚨 Críticos: N
- ⚠️ Mayores: M
- 💡 Menores: P
- 📝 Sugerencias: Q
- Bloqueante para merge: [SÍ / NO]

## Críticos
### 🚨 [Título] — `path/file:line`
**Qué pasa**: ...
**Por qué importa**: ...
**Fix propuesto**: [snippet]
**Ref**: [link OWASP/CWE/docs]

## Mayores / Menores / Sugerencias
...

## Lo que está bien
- Patrón X bien resuelto en `archivo:N`: [razón]
```

**Delegación al ecosistema xmon**:

Cuando un hallazgo se beneficia de un especialista del marketplace, lo sugiere al usuario con el comando de instalación si falta. Ejemplos:

- Código Symfony / API Platform con anti-patrones → `@symfony-expert` / `@api-platform-pro`
- Código LangChain JS / LangGraph TS → `@langchain-js-expert` / `@langgraph-js-expert`
- Problemas UX en componentes UI → `@ux-consultant`
- Vulnerabilidades complejas → `xmon:security-audit`
- Workflow git de la rama → `@git-workflow-manager`

## Cuándo usar

```
@code-reviewer revisa los cambios staged antes de commitear
@code-reviewer review de la PR #42, foco en seguridad
@code-reviewer audita src/auth/ buscando OWASP Top 10
@code-reviewer revisa src/api/users.ts:45-120, sospecho que hay N+1
@code-reviewer auditoría general de mantenibilidad del módulo orders/
```

## Tools disponibles

| Tool | Uso |
|---|---|
| `Read`, `Glob`, `Grep` | Leer y buscar en código |
| `Bash` | Ejecutar linters (eslint, phpstan, ruff...), `git diff`, coverage |
| `WebFetch`, `WebSearch` | Verificar CVEs, OWASP refs, docs |
| `context7` | Fuente de verdad de APIs de frameworks |
| `sequential-thinking` | Razonar antes de marcar críticos sutiles |
| `TodoWrite` | Trackear findings en reviews largos |

**Importante**: NO incluye `Write` ni `Edit`. El agente reporta y propone, no modifica. Si necesitas que aplique los fixes, pídeselo explícitamente y úsalo con otro agente que tenga permisos de escritura (o el propio Claude con la conversación principal).

## Instalación

1. Añade el marketplace a tu `~/.claude/settings.json` (campo top-level `extraKnownMarketplaces`):

   ```json
   {
     "extraKnownMarketplaces": [
       { "url": "https://github.com/new-xmon-df/claude-code-marketplace" }
     ]
   }
   ```

2. Refresca e instala:

   ```
   /plugin marketplace update
   /plugin install code-quality-toolkit@xmon-plugins
   ```

Tras instalar, el agente queda disponible como `@code-reviewer`.

## Licencia

MIT — ver el repositorio del marketplace.
