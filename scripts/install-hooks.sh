#!/usr/bin/env bash
# Activa los git hooks versionados del repo (.githooks/) en lugar de los locales (.git/hooks/).
# Crea también el archivo personal de patrones desde su template si aún no existe.
#
# Ejecutar una sola vez después de clonar el repo:
#
#   ./scripts/install-hooks.sh
#
set -euo pipefail

cd "$(dirname "$0")/.."

GREEN=$'\033[0;32m'
YELLOW=$'\033[0;33m'
NC=$'\033[0m'

# Comprobamos que estamos dentro de un repo git
if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
    echo "🚨 Este script debe ejecutarse dentro de un repo git." >&2
    exit 1
fi

# 1) Apunta Git a la carpeta versionada de hooks
git config core.hooksPath .githooks

# 2) Asegura permisos de ejecución en los hooks
chmod +x .githooks/* 2>/dev/null || true

# 3) Crea el archivo personal de patrones desde el template si no existe
PATTERNS_FILE=".githooks/leakage-patterns.txt"
EXAMPLE_FILE=".githooks/leakage-patterns.txt.example"

if [[ ! -f "$PATTERNS_FILE" && -f "$EXAMPLE_FILE" ]]; then
    cp "$EXAMPLE_FILE" "$PATTERNS_FILE"
    echo "${GREEN}✅ Creado $PATTERNS_FILE desde el template.${NC}"
    echo "   Edítalo con TUS proyectos privados, workspaces y nombres. NO se versiona (gitignored)."
fi

CURRENT=$(git config --get core.hooksPath || echo "")
echo "${GREEN}✅ Hooks instalados.${NC}"
echo "   core.hooksPath = ${CURRENT}"
echo ""
echo "${YELLOW}Verificar:${NC} git config --get core.hooksPath"
echo "${YELLOW}Probar:${NC}    intenta commitear un archivo con leakage; el hook lo bloqueará."
echo "${YELLOW}Saltar:${NC}    git commit --no-verify (úsalo con criterio)"
