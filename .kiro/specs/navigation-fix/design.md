# Design Document

## Overview

El diseño propuesto implementa un sistema de navegación robusto que resuelve los problemas de scroll impreciso, posicionamiento inicial incorrecto y solapamiento de contenido. La solución se basa en cálculos precisos de posición, manejo mejorado de eventos y optimización del timing de navegación.

## Architecture

### Core Components

1. **Enhanced Navbar Component**: Versión mejorada con cálculos precisos de scroll
2. **Scroll Manager Hook**: Custom hook para manejar toda la lógica de navegación
3. **Section Position Calculator**: Utilidad para calcular posiciones exactas de secciones
4. **URL Hash Manager**: Gestor de URLs y historial del navegador

### Component Interaction Flow

```
User Click → Navbar → Scroll Manager → Position Calculator → Smooth Scroll → URL Update
```

## Components and Interfaces

### 1. Enhanced Navbar Component

**Responsibilities:**
- Capturar eventos de navegación
- Delegar cálculos al Scroll Manager
- Manejar estado del menú móvil
- Actualizar estado visual del navbar

**Key Changes:**
- Reemplazar lógica de scroll manual con hook especializado
- Mejorar timing de navegación
- Optimizar cálculos de offset

### 2. useScrollNavigation Hook

```typescript
interface ScrollNavigationOptions {
  navbarHeight: number;
  additionalOffset: number;
  smoothBehavior: boolean;
}

interface ScrollNavigationReturn {
  navigateToSection: (sectionId: string) => void;
  navigateToPage: (page: 'home' | 'events' | 'news') => void;
  getCurrentSection: () => string | null;
  isScrolling: boolean;
}
```

**Responsibilities:**
- Calcular posiciones exactas de secciones
- Ejecutar scroll suave con timing optimizado
- Manejar navegación entre páginas
- Detectar sección actual durante scroll

### 3. Section Position Calculator

```typescript
interface SectionPosition {
  id: string;
  top: number;
  height: number;
  adjustedTop: number; // Posición ajustada considerando navbar
}

class SectionPositionCalculator {
  calculateSectionPosition(sectionId: string): SectionPosition | null
  calculateOptimalScrollPosition(sectionId: string): number
  getAllSectionPositions(): SectionPosition[]
}
```

### 4. URL Hash Manager

```typescript
interface URLHashManager {
  updateHash: (hash: string) => void;
  getCurrentHash: () => string | null;
  handleBrowserNavigation: (callback: (hash: string) => void) => void;
  navigateToHashOnLoad: () => void;
}
```

## Data Models

### Navigation State

```typescript
interface NavigationState {
  currentSection: string | null;
  currentPage: 'home' | 'events' | 'news';
  isScrolling: boolean;
  isNavigating: boolean;
  lastScrollPosition: number;
}
```

### Scroll Configuration

```typescript
interface ScrollConfig {
  navbarHeight: number;
  additionalOffset: number;
  scrollDuration: number;
  debounceDelay: number;
  mobileBreakpoint: number;
}
```

## Error Handling

### Scroll Calculation Errors

1. **Missing Section**: Si una sección no existe, log error y no ejecutar scroll
2. **Invalid Position**: Si la posición calculada es inválida, usar fallback a top de página
3. **Scroll Interruption**: Si el usuario interrumpe el scroll, cancelar navegación automática

### Browser Compatibility

1. **Smooth Scroll Support**: Detectar soporte nativo y usar polyfill si es necesario
2. **History API**: Verificar soporte para pushState/popState
3. **Mobile Safari**: Manejar quirks específicos de iOS Safari

## Testing Strategy

### Unit Tests

1. **Position Calculator Tests**:
   - Verificar cálculos correctos de posición
   - Probar diferentes alturas de navbar
   - Validar offsets adicionales

2. **Scroll Manager Tests**:
   - Simular navegación entre secciones
   - Verificar timing de scroll
   - Probar cancelación de scroll

### Integration Tests

1. **Navigation Flow Tests**:
   - Probar navegación completa desde navbar
   - Verificar actualización de URL
   - Validar comportamiento en móvil

2. **Browser History Tests**:
   - Probar botón de retroceso
   - Verificar navegación con hash inicial
   - Validar compartir enlaces

### Manual Testing Scenarios

1. **Desktop Navigation**:
   - Hacer clic en cada enlace del navbar
   - Verificar posicionamiento exacto
   - Probar scroll manual vs navegación

2. **Mobile Navigation**:
   - Probar menú hamburguesa
   - Verificar cierre automático
   - Validar scroll en diferentes dispositivos

3. **Edge Cases**:
   - Navegación rápida entre secciones
   - Recarga de página con hash
   - Redimensionamiento de ventana durante scroll

## Implementation Details

### Scroll Calculation Formula

```typescript
const calculateScrollPosition = (sectionElement: HTMLElement): number => {
  const elementTop = sectionElement.offsetTop;
  const navbarHeight = 80; // h-20 en Tailwind
  const additionalOffset = 20; // Margen de seguridad
  const sectionPadding = parseInt(getComputedStyle(sectionElement).paddingTop);
  
  // Ajustar si la sección tiene padding superior significativo
  const paddingAdjustment = sectionPadding > 40 ? sectionPadding / 2 : 0;
  
  return Math.max(0, elementTop - navbarHeight - additionalOffset + paddingAdjustment);
};
```

### Timing Optimization

```typescript
const SCROLL_TIMING = {
  NAVIGATION_DELAY: 150, // Tiempo para completar navegación a home
  SCROLL_DURATION: 800,  // Duración del scroll suave
  DEBOUNCE_DELAY: 100,   // Debounce para eventos de scroll
  MOBILE_DELAY: 200      // Delay adicional en móvil
};
```

### Mobile Considerations

- Detectar dispositivos móviles para ajustar timing
- Considerar altura variable del navbar en móvil
- Manejar orientación de pantalla
- Optimizar para touch events

### Performance Optimizations

- Debounce de eventos de scroll
- Throttle de cálculos de posición
- Lazy calculation de posiciones de secciones
- Cancelación de animaciones interrumpidas