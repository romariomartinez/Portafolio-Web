import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Experience } from '../Experience';
import { useLanguage } from '../../contexts/LanguageContext';
import { repositories } from '../../repositories';

// --- Mocks globales ---
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: vi.fn(),
}));

vi.mock('../../repositories', () => ({
  repositories: {
    experience: {
      getAll: vi.fn(),
    },
  },
}));

describe('Experience Component', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockT = (es: string, _en: string) => es;
  const mockUseLanguage = useLanguage as unknown as Mock;

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
    (repositories.experience.getAll as Mock).mockResolvedValue([]);
    render(<Experience />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('renderiza correctamente la experiencia laboral', async () => {
    (repositories.experience.getAll as Mock).mockResolvedValue([
      {
        id: 1,
        position_es: 'Desarrollador Frontend',
        position_en: 'Frontend Developer',
        company_es: 'Licores La Sierra',
        company_en: 'Licores La Sierra',
        start_date: '2023',
        end_date: '2024',
        description_es: 'Desarrollo de una aplicación web moderna.',
        description_en: 'Development of a modern web application.',
      },
      {
        id: 2,
        position_es: 'Ingeniero de Software',
        position_en: 'Software Engineer',
        company_es: 'Amaris Consulting',
        company_en: 'Amaris Consulting',
        start_date: '2022',
        end_date: '2023',
        description_es: 'Implementación de arquitecturas escalables.',
        description_en: 'Implementation of scalable architectures.',
      },
    ]);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Desarrollador Frontend')).toBeInTheDocument();
      expect(screen.getByText('Ingeniero de Software')).toBeInTheDocument();
      expect(screen.getByText('Licores La Sierra')).toBeInTheDocument();
      expect(screen.getByText('Amaris Consulting')).toBeInTheDocument();
      expect(screen.getByText('Desarrollo de una aplicación web moderna.')).toBeInTheDocument();
    });
  });

  it('maneja errores sin romper el componente', async () => {
    (repositories.experience.getAll as Mock).mockRejectedValue(new Error('Error de carga'));
    render(<Experience />);

    await waitFor(() => {
      expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
    });
  });
});
