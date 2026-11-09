# git-toolkit

Plugin para Claude Code con el comando **`/commit`**: genera mensajes Conventional Commits en español detectando automáticamente las convenciones del proyecto (`commit-prompt.txt` o configuración de commitlint).

## `/commit`

Genera un commit para los archivos en stage. No hace `git add` automático: qué stagear lo decide el usuario.

**Detección por capas** (solo en la raíz del repo, `git rev-parse --show-toplevel`; no escala al directorio padre, así que es seguro en monorepos y proyectos anidados):

| Detecta en la raíz | Comportamiento |
|---|---|
| `commit-prompt.txt` | Lo usa **tal cual** como prompt principal, sustituyendo `{diff}` por `git diff --staged`. Ignora las reglas embebidas. |
| Configuración de commitlint: `commitlint.config.{js,cjs,mjs,ts,cts,mts}`, `.commitlintrc`, `.commitlintrc.{json,yaml,yml,js,cjs,mjs,ts,cts,mts}` o campo `commitlint` en `package.json` | Extrae `type-enum`, `scope-enum`, `scope-empty` y `header-max-length` y los aplica como overrides sobre las reglas embebidas. |
| Nada de lo anterior | Reglas embebidas: Conventional Commits en español, scope opcional, asunto ≤ 50 chars. |

En todos los casos valida primero que haya archivos en stage.

## Reglas embebidas

- **Idioma**: español, imperativo presente (`añade`, `actualiza`, `corrige`, `elimina`, `mejora`)
- **Formato**: `<tipo>(<ámbito>): <asunto>` — tipo obligatorio, ámbito opcional por defecto
- **Types**: `feat, fix, docs, style, refactor, perf, test, chore, ci, revert`
- **Asunto**: minúscula inicial, sin punto final, ≤ 50 chars (si commitlint define `header-max-length`, ese límite se aplica al header completo)
- **Body**: bullets con `-`, ≤ 72 chars/línea, separado del header por línea en blanco
- **Breaking**: `!` tras el ámbito y/o footer `BREAKING CHANGE:`
- **Footer de issues**: `Closes #N`, `Fixes #N`, `Related to #N`
- **Prohibiciones**: emojis, tiempo pasado, primera persona, mayúscula inicial, punto final, types/scopes genéricos
- **Sin firma de Claude ni `Co-Authored-By`**: regla hardcoded, no negociable

## Casos especiales

- **Nada en stage**: aborta y lista los archivos modified/untracked sin preparar, sugiriendo `git add`.
- **Mensaje multilínea**: ejecuta `git commit` con HEREDOC para preservar el formato.

## Instalación

1. Añade el marketplace (una sola vez):

   ```
   /plugin marketplace add new-xmon-df/claude-code-marketplace
   ```

2. Refresca el marketplace e instala el plugin:

   ```
   /plugin marketplace update
   /plugin install git-toolkit@xmon-plugins
   ```

## Uso

```bash
git add src/api/users.ts src/api/users.test.ts
/commit
```

Output esperado tras el commit:

```
abc1234 feat(api): añade endpoint de listado de usuarios
```

## MCPs

Ninguno.

## Licencia

MIT — ver el repositorio del marketplace.
