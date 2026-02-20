import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Hero } from '../Hero';
import { Experience } from '../Experience';
import { Projects } from '../Projects';
import { Skills } from '../Skills';
import { Education } from '../Education';
import { Certifications } from '../Certifications';
import { Header } from '../Header';

// Extender expect con jest-axe
expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  // Test para Hero - requiere mock de datos
  it('should have no accessibility violations in Hero', async () => {
    const { container } = render(<Hero />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test para Experience
  it('should have no accessibility violations in Experience', async () => {
    const { container } = render(<Experience />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test para Projects
  it('should have no accessibility violations in Projects', async () => {
    const { container } = render(<Projects />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test para Skills
  it('should have no accessibility violations in Skills', async () => {
    const { container } = render(<Skills />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test para Education
  it('should have no accessibility violations in Education', async () => {
    const { container } = render(<Education />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test para Certifications
  it('should have no accessibility violations in Certifications', async () => {
    const { container } = render(<Certifications />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test para Header
  it('should have no accessibility violations in Header', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// Lista de verificación de accesibilidad manual
// Esta no es una prueba automatizada, sino una guía para revisión manual

/**
 * Checklist de Accesibilidad WCAG 2.1
 * 
 * ✅ Navegación por teclado
 * - Todos los elementos interactivos son alcanzables via teclado
 * - El orden de tabulación es lógico
 * - Los elementos.focus() tienen indicador visual
 * 
 * ✅ Contraste de colores
 * - Ratio mínimo 4.5:1 para texto normal
 * - Ratio mínimo 3:1 para texto grande (18px+ o 14px bold)
 * - Los modos claro/oscuro mantienen contraste adecuado
 * 
 * ✅ Imágenes
 * - Todas las imágenes tienen alt text descriptivo
 * - Los iconos decorativos tienen alt="" o aria-hidden
 * 
 * ✅ Formularios
 * - Labels asociados correctamente a inputs
 * - Mensajes de error descriptivos
 * - Required fields marcados con aria-required
 * 
 * ✅ Semántica HTML
 * - Encabezados (h1-h6) en orden jerárquico
 * - Landmarks roles (main, nav, header, footer)
 * - Listas usadas para grupos de elementos
 * 
 * ✅ ARIA
 * - Roles aplicables correctamente
 * - Estados comunicados (aria-expanded, aria-selected)
 * - Live regions para contenido dinámico
 */
