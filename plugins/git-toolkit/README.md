# git-toolkit

Plugin para Claude Code con slash commands para flujos de Git. La v0.1.0 expone un único comando, `/commit`, que genera commits siguiendo Conventional Commits en español. Pensado para reemplazar el típico `.claude/commands/commit.md` copiado proyecto a proyecto.

## Comandos incluidos

### `/commit`

Genera un commit para los archivos en stage. No hace `git add` automático: la decisión de qué stagear sigue siendo del usuario.

**Comportamiento por capas (detección automática)**:

| Detecta en raíz del repo | Comportamiento |
|--------------------------|----------------|
| `commit-prompt.txt` | Lo usa **tal cual** como prompt principal. Sustituye `{diff}` por `git diff --staged`. Ignora las reglas embebidas. |
| `commitlint.config.js` / `.commitlintrc.js` / `.commitlintrc.json` | Extrae `type-enum`, `scope-enum`, `scope-empty` y `header-max-length`. Los aplica como overrides sobre las reglas embebidas. |
| Nada de lo anterior | Aplica las reglas embebidas puras: Conventional Commits en español, scope opcional, subject ≤ 72 chars. |

La búsqueda solo mira en la raíz del repo (`git rev-parse --show-toplevel`). No escala al directorio padre, así que es seguro en monorepos y en proyectos anidados.

## Reglas embebidas (fallback)

Cuando no hay archivos de configuración del proyecto, el comando aplica:

- **Idioma**: español, imperativo presente (`añade`, `actualiza`, `corrige`, `elimina`, `mejora`)
- **Formato**: `<tipo>(<ámbito>): <asunto>` — type siempre obligatorio, scope opcional por defecto
- **Types**: `feat, fix, docs, style, refactor, perf, test, chore, ci, revert`
- **Subject**: lowercase, sin punto final, ≤ 72 chars
- **Body**: bullets con `-`, ≤ 72 chars/línea, separado del header por línea en blanco
- **Breaking**: `!` tras el scope y/o footer `BREAKING CHANGE:`
- **Footer issues**: `Closes #N`, `Fixes #N`, `Related to #N`
- **Prohibiciones**: emojis, past tense, first person, mayúscula inicial, punto final, types/scopes genéricos
- **Sin firma de Claude**: regla hardcoded, no negociable

## Comportamiento ante casos especiales

- **No hay nada en stage**: aborta y muestra al usuario los archivos modified/untracked sin preparar, sugiriendo `git add` para los que quiera commitear. No ejecuta `git add -A` automático.
- **Solo cambios trivial (whitespace/format)**: usa `style` como type.
- **Cambios de configuración o deps**: usa `chore` como type (con scope `config` si está permitido por `scope-enum`).
- **Mensaje multi-línea**: ejecuta `git commit` con HEREDOC para preservar formato exacto.

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
   /plugin install git-toolkit@xmon-plugins
   ```

Tras instalar, el comando queda disponible como `/commit` desde cualquier sesión de Claude Code.

## Uso

```bash
# En tu repo, prepara los cambios
git add src/api/users.ts src/api/users.test.ts

# Lanza el comando
/commit
```

Claude leerá la configuración del proyecto, analizará el diff y generará el commit. Output esperado tras el commit:

```
abc1234 feat(api): añade endpoint de listado de usuarios
```

## Ejemplos de mensajes generados

**En proyecto con `commit-prompt.txt`** (scope obligatorio, lista cerrada de scopes):

```
feat(auth): implementa autenticación con Google
fix(api): corrige error en respuestas paginadas
chore(config): añade variable POSTGRES_TIMEOUT
```

**En proyecto con solo `commitlint.config.js`** (sin `commit-prompt.txt`):

```
refactor(orders): simplifica cálculo de descuentos
test(payments): añade tests para reintentos de cobro
```

**En proyecto sin nada**:

```
feat: añade soporte para login con magic link
docs: documenta el flujo de onboarding
```

## Licencia

MIT — ver el repositorio del marketplace.
