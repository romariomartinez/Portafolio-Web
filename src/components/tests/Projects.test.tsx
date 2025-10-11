import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Projects } from '../Projects';

// Mock del contexto de idioma
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'es',
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
t: (es: string, _en: string) => es,

  }),
}));

// Mock del repositorio
const mockGetAll = vi.fn();
vi.mock('../../repositories', () => ({
  repositories: {
    project: {
      getAll: () => mockGetAll(),
    },
  },
}));

describe('Projects Component', () => {
  it('muestra mensaje de carga al iniciar', () => {
    // No resolvemos el mock todavía
    mockGetAll.mockResolvedValueOnce([]);
    render(<Projects />);
    expect(screen.getByText('Cargando proyectos...')).toBeInTheDocument();
  });

  it('renderiza los proyectos cuando hay datos', async () => {
    mockGetAll.mockResolvedValueOnce([
      {
        id: 1,
        name_es: 'Portafolio Web',
        description_es: 'Aplicación moderna con React y Supabase',
        technologies: ['React', 'Tailwind', 'Supabase'],
        image_url: 'https://example.com/image.jpg',
        demo_url: 'https://demo.example.com',
        repo_url: 'https://github.com/example/repo',
      },
    ]);

    render(<Projects />);

    await waitFor(() => {
      expect(screen.getByText('Portafolio Web')).toBeInTheDocument();
      expect(screen.getByText('Aplicación moderna con React y Supabase')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Tailwind')).toBeInTheDocument();
      expect(screen.getByText('Supabase')).toBeInTheDocument();
    });
  });

  it('muestra los enlaces de demo y código', async () => {
    mockGetAll.mockResolvedValueOnce([
      {
        id: 1,
        name_es: 'Licores La Sierra',
        description_es: 'Menú digital para licorería local',
        technologies: ['React', 'Supabase'],
        image_url: 'https://example.com/licores.jpg',
        demo_url: 'https://demo.licores.com',
        repo_url: 'https://github.com/licores/repo',
      },
    ]);

    render(<Projects />);

    const demoLink = await screen.findByText('Demo');
    const codeLink = await screen.findByText('Código');

    expect(demoLink.closest('a')).toHaveAttribute('href', 'https://demo.licores.com');
    expect(codeLink.closest('a')).toHaveAttribute('href', 'https://github.com/licores/repo');
  });
});
