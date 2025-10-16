import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Skills } from '../Skills';
import { useLanguage } from '../../contexts/LanguageContext';
import { repositories } from '../../repositories';

// --- Mocks globales ---
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: vi.fn(),
}));

vi.mock('../../repositories', () => ({
  repositories: {
    skill: {
      getAll: vi.fn(),
    },
  },
}));

describe('Skills Component', () => {
  // Silencia los errores de consola
  vi.spyOn(console, 'error').mockImplementation(() => {});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockT = (es: string, _en: string) => es;
  const mockUseLanguage = useLanguage as unknown as vi.Mock;

  beforeEach(() => {
    mockUseLanguage.mockReturnValue({
      language: 'es',
      t: mockT,
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('muestra mensaje de carga al iniciar', async () => {
    (repositories.skill.getAll as vi.Mock).mockResolvedValue([]);
    render(<Skills />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('renderiza correctamente las habilidades agrupadas por categoría', async () => {
    (repositories.skill.getAll as vi.Mock).mockResolvedValue([
      {
        id: 1,
        name_es: 'React',
        name_en: 'React',
        category_es: 'Frontend',
        category_en: 'Frontend',
        level: 90,
        image_url: 'https://example.com/react.png',
      },
      {
        id: 2,
        name_es: 'Node.js',
        name_en: 'Node.js',
        category_es: 'Backend',
        category_en: 'Backend',
        level: 80,
        image_url: 'https://example.com/node.png',
      },
    ]);

    render(<Skills />);

    await waitFor(() => {
      // Busca los encabezados <h3> (categorías)
      const headings = screen.getAllByRole('heading', { level: 3 });
      const titles = headings.map((h) => h.textContent);
      expect(titles).toContain('Frontend');
      expect(titles).toContain('Backend');

      // Verifica las habilidades
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
    });
  });

  it('muestra el porcentaje de nivel correctamente', async () => {
    (repositories.skill.getAll as vi.Mock).mockResolvedValue([
      {
        id: 1,
        name_es: 'JavaScript',
        name_en: 'JavaScript',
        category_es: 'Frontend',
        category_en: 'Frontend',
        level: 75,
      },
    ]);

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
  });

  it('maneja errores sin romper el componente', async () => {
    (repositories.skill.getAll as vi.Mock).mockRejectedValue(new Error('Error de carga'));
    render(<Skills />);

    await waitFor(() => {
      expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
    });
  });
});
