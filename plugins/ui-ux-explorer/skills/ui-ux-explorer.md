---
name: xmon:ui-ux
description: Explora soluciones UI/UX, diagnostica problemas de interfaz, compara alternativas de diseño, y resuelve issues de compatibilidad entre navegadores o tamaños de pantalla.
---

# UI/UX Explorer

Skill para ayudarte a resolver problemas de UI/UX, explorar alternativas de diseño, y solucionar issues de compatibilidad.

## Cuándo usar este skill

- Tienes un problema visual o de interacción en tu UI
- Quieres explorar alternativas de diseño para un componente
- Necesitas resolver problemas de responsive design
- Tienes bugs específicos de un navegador
- Quieres mejorar la UX de una funcionalidad existente

## Flujo de trabajo

### Paso 1: Diagnóstico

Antes de proponer soluciones, necesito entender el contexto:

1. **Identificar el problema**: ¿Qué está fallando o qué quieres mejorar?
2. **Recopilar contexto**:
   - ¿En qué navegadores/dispositivos ocurre?
   - ¿Es un problema de CSS, JS, o ambos?
   - ¿Hay errores en consola?
3. **Reproducir**: Si es posible, usar Playwright para capturar el estado actual

### Paso 2: Análisis

Dependiendo del tipo de problema:

#### Problema de compatibilidad (navegadores/responsive)
- Verificar soporte de propiedades CSS en caniuse.com
- Identificar prefijos necesarios o polyfills
- Probar en diferentes viewports con Playwright

#### Problema de diseño/UX
- Analizar patrones similares en librerías de componentes
- Revisar guías de accesibilidad (WCAG)
- Considerar estados: hover, focus, disabled, loading, error

#### Mejora de UI existente
- Buscar inspiración en sistemas de diseño establecidos
- Evaluar trade-offs entre opciones
- Considerar consistencia con el resto de la app

### Paso 3: Propuesta de soluciones

Presentaré 2-3 alternativas con:
- **Descripción**: Qué hace y cómo funciona
- **Pros**: Ventajas de esta aproximación
- **Contras**: Desventajas o limitaciones
- **Código**: Ejemplo de implementación
- **Compatibilidad**: Navegadores/dispositivos soportados

### Paso 4: Implementación

Una vez elegida la solución:
1. Implementar los cambios
2. Probar en diferentes viewports/navegadores
3. Verificar accesibilidad básica
4. Documentar decisiones si es relevante

## Herramientas que usaré

- **Playwright**: Para capturas, pruebas visuales y debugging
- **WebSearch/WebFetch**: Para consultar documentación, caniuse, MDN
- **Context7**: Para documentación de librerías de UI (Radix, Tailwind, etc.)
- **Read/Edit**: Para modificar código de componentes

## Preguntas que te haré

Para darte la mejor solución, probablemente necesite saber:

1. ¿Cuál es el problema exacto o qué quieres lograr?
2. ¿En qué archivo/componente está el código afectado?
3. ¿Hay requisitos específicos (accesibilidad, navegadores legacy, etc.)?
4. ¿Tienes preferencia por algún approach (CSS puro, JS, librería)?

## Ejemplos de uso

```
/xmon:ui-ux el dropdown se ve cortado en móvil
/xmon:ui-ux quiero mejorar la UX del formulario de login
/xmon:ui-ux el hover no funciona en Safari
/xmon:ui-ux explorar alternativas para este modal
```
