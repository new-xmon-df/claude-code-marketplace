---
name: xmon:ui-ux
description: Explora soluciones UI/UX, diagnostica problemas de interfaz, compara alternativas de diseño, y resuelve issues de compatibilidad entre navegadores o tamaños de pantalla.
---

# UI/UX Explorer

Skill universal para resolver problemas de UI/UX en cualquier stack frontend.

## Cuándo usar este skill

- Tienes un problema visual o de interacción en tu UI
- Quieres explorar alternativas de diseño para un componente
- Necesitas resolver problemas de responsive design
- Tienes bugs específicos de un navegador
- Quieres mejorar la UX de una funcionalidad existente

---

## Paso 0: Detección del Stack (OBLIGATORIO)

**ANTES de hacer cualquier otra cosa**, detecta el stack del proyecto:

### Archivos a buscar

```
# Buscar estos archivos en la raíz del proyecto
package.json          # Node.js ecosystem
composer.json         # PHP ecosystem
components.json       # shadcn/ui
tailwind.config.*     # Tailwind CSS
astro.config.*        # Astro
next.config.*         # Next.js
nuxt.config.*         # Nuxt
vite.config.*         # Vite
angular.json          # Angular
```

### Cómo identificar el stack

1. **Leer `package.json`** (si existe) y buscar en dependencies/devDependencies:
   - `react`, `react-dom` → React
   - `next` → Next.js
   - `astro` → Astro
   - `vue` → Vue.js
   - `nuxt` → Nuxt
   - `@angular/core` → Angular
   - `svelte` → Svelte

2. **Identificar librería de componentes**:
   - `@radix-ui/*` → Radix UI
   - `@shadcn/ui` o `components.json` existe → shadcn/ui
   - `@mui/material` → Material UI
   - `antd` → Ant Design
   - `@chakra-ui/react` → Chakra UI
   - `bootstrap` → Bootstrap
   - `tailwindcss` → Tailwind CSS

3. **Guardar contexto detectado**:
   ```
   Stack detectado:
   - Framework: [Next.js/React/Astro/Vue/etc.]
   - UI Library: [shadcn/ui/Radix/MUI/Bootstrap/etc.]
   - Styling: [Tailwind/CSS Modules/Styled Components/etc.]
   ```

---

## Paso 1: Verificar herramientas disponibles

### MCPs que DEBO verificar

Antes de continuar, comprueba qué herramientas MCP están disponibles:

| MCP | Para qué sirve | Cómo verificar disponibilidad |
|-----|----------------|-------------------------------|
| **Playwright** | Capturas, testing visual, debugging en navegador | Buscar `mcp__playwright__*` o `mcp__plugin_playwright_playwright__*` |
| **Context7** | Documentación actualizada de librerías | Buscar `mcp__context7__*` o `mcp__plugin_context7_context7__*` |
| **shadcn** | Añadir/modificar componentes shadcn/ui | Buscar `mcp__shadcn__*` |
| **Figma** | Extraer diseños de Figma | Buscar `mcp__figma__*` |
| **Browser Tools** | DevTools, consola, network | Buscar `mcp__browsertools__*` |

### Si un MCP útil NO está disponible

Sugiere su instalación al usuario:

```markdown
💡 **Sugerencia**: Para este problema sería útil tener el MCP de [nombre].

Puedes instalarlo con:
- Playwright: `claude mcp add playwright -- npx @anthropic-ai/mcp-playwright`
- shadcn: `claude mcp add shadcn -- npx shadcn@latest`
- Context7: Ya viene integrado en Claude Code

¿Quieres que continúe sin esta herramienta o prefieres instalarla primero?
```

---

## Paso 2: Diagnóstico

### Recopilar información

1. **Entender el problema**: ¿Qué está fallando o qué quieres mejorar?
2. **Contexto técnico**:
   - ¿En qué navegadores/dispositivos ocurre?
   - ¿Es un problema de CSS, JS, o ambos?
   - ¿Hay errores en consola?
3. **Localizar código**: ¿En qué archivo/componente está?

### Usar herramientas según disponibilidad

**Si Playwright está disponible:**
- Capturar screenshot del estado actual
- Probar en diferentes viewports
- Inspeccionar elementos problemáticos

**Si Browser Tools está disponible:**
- Revisar consola del navegador
- Analizar network requests
- Inspeccionar CSS computado

**Si ninguno está disponible:**
- Pedir al usuario que describa el problema en detalle
- Solicitar screenshots si es necesario
- Revisar el código directamente

---

## Paso 3: Análisis según el stack

### Si usa shadcn/ui y el MCP está disponible

1. Usar `mcp__shadcn__*` para:
   - Listar componentes instalados
   - Ver configuración actual
   - Añadir componentes necesarios

2. Consultar Context7 para documentación de Radix (base de shadcn):
   ```
   libraryId: /radix-ui/primitives
   ```

### Si usa Tailwind CSS

1. Consultar Context7:
   ```
   libraryId: /tailwindlabs/tailwindcss
   ```

2. Verificar configuración en `tailwind.config.*`

### Si usa React/Next.js

1. Consultar Context7:
   ```
   libraryId: /vercel/next.js  # Para Next.js
   libraryId: /facebook/react   # Para React
   ```

### Si usa Bootstrap

1. Consultar Context7:
   ```
   libraryId: /twbs/bootstrap
   ```

### Si usa Vue/Nuxt

1. Consultar Context7:
   ```
   libraryId: /vuejs/vue
   libraryId: /nuxt/nuxt
   ```

### Para problemas de compatibilidad

- Usar WebFetch para consultar caniuse.com
- Identificar prefijos necesarios o polyfills
- Si Playwright disponible: probar en diferentes navegadores

---

## Paso 4: Propuesta de soluciones

Presenta **2-3 alternativas** adaptadas al stack detectado:

### Formato de cada alternativa

```markdown
### Opción [N]: [Nombre descriptivo]

**Descripción**: Qué hace y cómo funciona

**Implementación** (adaptada al stack):
- Si shadcn/ui: usar componentes existentes o sugerir instalar nuevos
- Si Tailwind: clases de utilidad
- Si CSS puro: estilos vanilla
- Si Bootstrap: clases de Bootstrap

**Pros**:
- ...

**Contras**:
- ...

**Compatibilidad**: Navegadores/dispositivos soportados
```

---

## Paso 5: Implementación

Una vez elegida la solución:

1. **Implementar** usando las herramientas del stack detectado
2. **Verificar** (si Playwright disponible):
   - Probar en diferentes viewports
   - Capturar screenshots antes/después
3. **Accesibilidad**: Verificar WCAG básico (contraste, focus, aria)

---

## Herramientas según disponibilidad

### Siempre disponibles
- **Read/Edit**: Para modificar código
- **Glob/Grep**: Para buscar archivos y patrones
- **WebSearch/WebFetch**: Para documentación, caniuse, MDN

### MCPs opcionales (verificar disponibilidad)
| MCP | Uso | Instalación |
|-----|-----|-------------|
| Playwright | Testing visual, screenshots, debugging | `claude mcp add playwright -- npx @anthropic-ai/mcp-playwright` |
| shadcn | Gestión de componentes shadcn/ui | `claude mcp add shadcn -- npx shadcn@latest` |
| Context7 | Docs actualizadas | Integrado en Claude Code |
| Browser Tools | DevTools remoto | `claude mcp add browsertools -- npx @anthropic-ai/mcp-browser-tools` |
| Figma | Extraer diseños | `claude mcp add figma -- npx @anthropic-ai/mcp-figma` |

---

## Ejemplos de uso

```
/xmon:ui-ux el dropdown se ve cortado en móvil
/xmon:ui-ux quiero mejorar la UX del formulario de login
/xmon:ui-ux el hover no funciona en Safari
/xmon:ui-ux necesito un modal accesible
/xmon:ui-ux el componente no es responsive
/xmon:ui-ux quiero añadir animaciones suaves
```

---

## Checklist de ejecución

- [ ] Detectar stack del proyecto (package.json, configs)
- [ ] Identificar librería de componentes UI
- [ ] Verificar MCPs disponibles
- [ ] Sugerir instalación de MCPs útiles si no están
- [ ] Diagnosticar el problema con las herramientas disponibles
- [ ] Proponer soluciones adaptadas al stack
- [ ] Implementar usando las herramientas del ecosistema
- [ ] Verificar resultado (si es posible con Playwright)
