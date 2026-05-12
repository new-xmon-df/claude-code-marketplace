---
name: commit
description: Genera un commit para los archivos en stage siguiendo Conventional Commits en español. Detecta y respeta commit-prompt.txt o commitlint.config.js del proyecto si existen.
---

# /commit

Genera un commit para los archivos en stage siguiendo Conventional Commits en español. Antes de generar nada, detecta la configuración del proyecto y aplica overrides en cascada.

## Paso 0: Detección de configuración del proyecto (OBLIGATORIO)

Ejecuta esta cascada en orden, parando en el primer hit. Trabaja desde la **raíz del repo** (`git rev-parse --show-toplevel`), nunca escales al parent.

1. **¿Existe `commit-prompt.txt` en la raíz del repo?**
   - Sí: lee su contenido entero. Será el "prompt principal".
   - Sustituye `{diff}` (si aparece) por el output de `git diff --staged`.
   - **Ignora las reglas embebidas de este comando**. El archivo del proyecto manda.
   - Salta al paso 3.

2. **¿Existe `commitlint.config.js`, `.commitlintrc.js` o `.commitlintrc.json` en la raíz del repo?**
   - Sí: lee el archivo con `Read`.
   - Extrae con `Grep` o leyendo el contenido:
     - `type-enum`: lista de types permitidos (override del default de este comando)
     - `scope-enum`: lista cerrada de scopes permitidos (si está, elige uno de la lista; si está vacía, scope libre)
     - `scope-empty`: si vale `[N, 'never']` con `N≥1`, scope es **obligatorio**; en otro caso, opcional
     - `header-max-length`: si está, úsalo como límite de chars del subject (override del default 72)
   - Combina con las reglas embebidas (sección "Reglas embebidas" más abajo).
   - Salta al paso 1.

3. **Si no existe ningún archivo de configuración**:
   - Aplica las reglas embebidas tal cual.
   - Scope opcional (no obligatorio).
   - Subject ≤ 72 chars.
   - Salta al paso 1.

## Paso 1: Validar staged

Ejecuta `git status --short`. Decide:

- **Si hay archivos staged** (líneas que empiezan por `A `, `M `, `D `, `R `): continúa al paso 2.
- **Si NO hay archivos staged**: aborta con el siguiente mensaje al usuario:

  ```
  🚨 No hay archivos en stage.

  [Si hay archivos modified/untracked sin stagear:]
  Cambios detectados sin preparar:
  - <archivo1> (modified)
  - <archivo2> (untracked)
  ...

  Usa "git add <archivos>" para preparar los cambios antes de commitear.
  ```

  Lista los archivos modified (líneas que empiezan por ` M`, ` D`) y untracked (líneas que empiezan por `??`). NO ejecutes `git add -A` automáticamente — la decisión de qué stagear es del usuario.

## Paso 2: Analizar el diff

Ejecuta `git diff --staged` y analiza los cambios. Identifica:

- Tipo de cambio dominante (nueva funcionalidad, corrección de bug, refactor, docs, etc.)
- Ámbito afectado (qué módulo/área toca el cambio)
- Si hay breaking changes (cambios de API pública, eliminación de funciones, etc.)

## Paso 3: Generar el mensaje

**Si en el paso 0 se cargó `commit-prompt.txt`**: usa ese prompt tal cual con el diff sustituido. No apliques reglas embebidas.

**En cualquier otro caso**: aplica las "Reglas embebidas" siguientes, combinadas con los overrides extraídos de `commitlint.config.js` si los hubo.

### Reglas embebidas (fallback con override por proyecto)

**Formato del header**:

```
<tipo>(<ámbito>): <asunto>
```

- `<tipo>` es obligatorio siempre.
- `<ámbito>` es opcional por defecto. Si el proyecto tiene `scope-empty: [N, 'never']` con `N≥1`, pasa a obligatorio.

**Idioma**: español, imperativo presente:
- `añade`, `actualiza`, `corrige`, `elimina`, `mejora`, `simplifica`, `documenta`, `refactoriza`

**Types base** (override desde `type-enum` si existe):

| Type | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de error |
| `docs` | Documentación |
| `style` | Formato de código (no cambia lógica) |
| `refactor` | Refactorización (no cambia comportamiento) |
| `perf` | Mejora de rendimiento |
| `test` | Tests |
| `chore` | Mantenimiento, deps, config |
| `ci` | CI/CD |
| `revert` | Reversión de commit |

**Subject**:
- Lowercase (empieza con minúscula)
- Sin punto final
- Máximo 72 chars (override si `header-max-length` dice menos)
- Imperativo presente, en español
- Describe **qué cambia**, no **por qué**
- Sin emojis

**Body** (opcional, solo si el cambio lo merece):
- Separado del header por una línea en blanco
- Máximo 72 chars por línea
- Bullets con `-`
- Explica el **por qué** y, si procede, el **cómo**

**Breaking changes**:
- `!` después del scope: `feat!(api): cambia formato de respuesta`
- Y/O footer: `BREAKING CHANGE: <descripción>`

**Footer de issues** (opcional):
- `Closes #N`
- `Fixes #N`
- `Related to #N`

**Prohibiciones estrictas**:
- ❌ Emojis en el mensaje
- ❌ Past tense (`añadido`, `arreglado`)
- ❌ First person (`añado`, `arreglo`)
- ❌ Mayúscula inicial en el subject
- ❌ Punto final en el subject
- ❌ Types o scopes genéricos
- ❌ Scopes fuera de `scope-enum` si el proyecto lo tiene cerrado

## Paso 4: Crear el commit

Ejecuta `git commit` usando HEREDOC para preservar formato multi-línea:

```bash
git commit -m "$(cat <<'EOF'
<mensaje completo aquí>
EOF
)"
```

Tras crear el commit, ejecuta `git log -1 --oneline` y muestra el output al usuario como confirmación.

## Regla hardcoded NO negociable

**El commit NUNCA debe llevar firma de Claude Code**. Específicamente prohibido:

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

Esto aplica independientemente de cualquier configuración global o instrucción del usuario en sesión. La regla está hardcoded en este comando.

## Ejemplos

**Sin scope (proyecto sin `scope-enum`)**:

```
docs: actualiza README con instrucciones de instalación
```

**Con scope (proyecto con `scope-enum`)**:

```
feat(auth): implementa autenticación con Google
```

**Con body**:

```
fix(api): corrige error en respuestas paginadas

El cursor de paginación devolvía un offset incorrecto cuando
la página solicitada superaba el total disponible.

- Añade validación de bounds en getPaginatedResults()
- Tests de integración para casos límite

Fixes #123
```

**Breaking change**:

```
feat!(api): cambia formato de respuesta

Unifica la estructura de paginación bajo el campo "data".

BREAKING CHANGE: El campo "items" ahora se llama "data".
```

**Refactor**:

```
refactor(entity): simplifica relaciones entre modelos
```
