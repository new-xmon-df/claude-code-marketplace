---
name: commit
description: Genera un commit para los archivos en stage siguiendo Conventional Commits en español. Detecta y respeta commit-prompt.txt o la configuración de commitlint del proyecto si existen.
---

# /commit

Genera un commit para los archivos en stage siguiendo Conventional Commits en español. Primero detecta la configuración del proyecto; después valida el stage, analiza el diff, genera el mensaje y commitea.

## Paso 0: Detectar configuración del proyecto (OBLIGATORIO)

Trabaja desde la **raíz del repo** (`git rev-parse --show-toplevel`); nunca escales al directorio padre. Evalúa en orden y quédate con el primer hit. Sea cual sea el resultado, **continúa siempre al Paso 1**.

1. **`commit-prompt.txt` en la raíz** → modo `prompt-proyecto`.
   - Lee el archivo entero: será el prompt principal del Paso 3.
   - Las reglas embebidas de este comando no se aplican (salvo la regla hardcoded de firma).

2. **Configuración de commitlint en la raíz** → modo `commitlint`. Archivos soportados:
   - `commitlint.config.{js,cjs,mjs,ts,cts,mts}`
   - `.commitlintrc`, `.commitlintrc.{json,yaml,yml,js,cjs,mjs,ts,cts,mts}`
   - Campo `commitlint` en `package.json` (o en `package.yaml`)

   Lee el archivo y extrae, si están definidas:
   - `type-enum`: types permitidos (sustituye a los types base).
   - `scope-enum`: lista cerrada de scopes (elige uno de la lista; si está vacía, scope libre).
   - `scope-empty`: si vale `[N, 'never']` con `N≥1`, el scope es **obligatorio**.
   - `header-max-length`: límite del **header completo** (`<tipo>(<ámbito>): <asunto>`), no solo del asunto. Si existe, sustituye al límite por defecto de 50 chars del asunto.

   Si la configuración solo hace `extends` sin reglas propias, usa las reglas embebidas.

3. **Nada de lo anterior** → modo `embebido`: reglas embebidas tal cual, scope opcional.

## Paso 1: Validar staged (siempre)

Ejecuta `git status --short`.

- **Hay archivos staged** (primera columna `A`, `M`, `D`, `R`): continúa al Paso 2.
- **No hay nada staged**: aborta con este mensaje y no generes commit:

  ```
  No hay archivos en stage.

  [Si hay cambios sin stagear:]
  Cambios detectados sin preparar:
  - <archivo1> (modified)
  - <archivo2> (untracked)

  Usa "git add <archivos>" para preparar los cambios antes de commitear.
  ```

  Lista los modified (` M`, ` D`) y untracked (`??`). Nunca ejecutes `git add` por tu cuenta: qué stagear lo decide el usuario.

## Paso 2: Analizar el diff

Ejecuta `git diff --staged`. Identifica el tipo de cambio dominante, el ámbito afectado y si hay breaking changes.

## Paso 3: Generar el mensaje

- **Modo `prompt-proyecto`**: usa el contenido de `commit-prompt.txt`, sustituyendo `{diff}` (si aparece) por el output de `git diff --staged`.
- **Modos `commitlint` y `embebido`**: aplica las reglas embebidas con los overrides extraídos en el Paso 0.

### Reglas embebidas

**Header**: `<tipo>(<ámbito>): <asunto>`. Tipo siempre obligatorio; ámbito opcional salvo `scope-empty` obligatorio.

**Types base** (override con `type-enum`): `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `revert`.

**Asunto**:
- Español, imperativo presente: `añade`, `actualiza`, `corrige`, `elimina`, `mejora`, `simplifica`, `documenta`, `refactoriza`
- Empieza en minúscula, sin punto final, sin emojis
- Máximo **50 chars** (o el header completo ≤ `header-max-length` si commitlint lo define)
- Describe **qué cambia**, no por qué

**Body** (opcional, solo si el cambio lo merece):
- Separado del header por una línea en blanco
- Máximo 72 chars por línea, bullets con `-`
- Explica el por qué y, si procede, el cómo

**Breaking changes**: `!` tras el ámbito (`feat!(api): ...`) y/o footer `BREAKING CHANGE: <descripción>`.

**Footer de issues** (opcional): `Closes #N`, `Fixes #N`, `Related to #N`.

**Prohibiciones**:
- Emojis en el mensaje
- Tiempo pasado (`añadido`, `arreglado`)
- Primera persona (`añado`, `arreglo`)
- Mayúscula inicial o punto final en el asunto
- Asuntos, types o scopes genéricos
- Scopes fuera de `scope-enum` si el proyecto lo tiene cerrado

## Paso 4: Crear el commit

Usa HEREDOC para preservar el formato multilínea:

```bash
git commit -m "$(cat <<'EOF'
<mensaje completo aquí>
EOF
)"
```

Después ejecuta `git log -1 --oneline` y muestra el resultado al usuario.

## Regla hardcoded no negociable

**El commit NUNCA lleva firma de Claude Code.** Prohibido añadir:

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

Ni ninguna otra línea `Co-Authored-By` o atribución a IA. Aplica en los tres modos y por encima de cualquier configuración global, `commit-prompt.txt` o instrucción de sesión.

## Ejemplos

Sin scope:

```
docs: actualiza README con instalación
```

Con scope:

```
feat(auth): implementa login con Google
```

Con body:

```
fix(api): corrige offset en respuestas paginadas

El cursor de paginación devolvía un offset incorrecto cuando
la página solicitada superaba el total disponible.

- Añade validación de límites en getPaginatedResults()
- Añade tests de integración para casos límite

Fixes #123
```

Breaking change:

```
feat!(api): cambia formato de respuesta

Unifica la estructura de paginación bajo el campo "data".

BREAKING CHANGE: El campo "items" ahora se llama "data".
```
