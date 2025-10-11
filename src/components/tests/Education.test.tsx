import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Education } from '../Education';
import { useLanguage } from '../../contexts/LanguageContext';
import { repositories } from '../../repositories';

// --- Mocks globales ---
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: vi.fn(),
}));

vi.mock('../../repositories', () => ({
  repositories: {
    education: {
      getAll: vi.fn(),
    },
  },
}));

describe('Education Component', () => {
  // 🧹 Silencia errores en consola durante los tests
  vi.spyOn(console, 'error').mockImplementation(() => {});

  const mockT = (es: string, _en: string) => es;
  const mockUseLanguage = useLanguage as unknown as vi.Mock;

  beforeEach(() => {
    mockUseLanguage.mockReturnValue({
      language: 'es',
      t: mockT,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('muestra mensaje de carga al iniciar', async () => {
    (repositories.education.getAll as vi.Mock).mockResolvedValue([]);
    render(<Education />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('renderiza correctamente la información educativa', async () => {
    (repositories.education.getAll as vi.Mock).mockResolvedValue([
      {
        id: 1,
        degree_es: 'Ingeniería de Sistemas',
        degree_en: 'Systems Engineering',
        institution_es: 'Universidad Popular del Cesar',
        institution_en: 'Popular University of Cesar',
        start_date: '2018',
        end_date: '2023',
        description_es: 'Formación en desarrollo de software y sistemas informáticos.',
        description_en: 'Training in software and computer systems development.',
      },
    ]);

    render(<Education />);

    await waitFor(() => {
      expect(screen.getByText('Ingeniería de Sistemas')).toBeInTheDocument();
      expect(screen.getByText('Universidad Popular del Cesar')).toBeInTheDocument();
      expect(screen.getByText('2018 - 2023')).toBeInTheDocument();
      expect(screen.getByText(/desarrollo de software/i)).toBeInTheDocument();
    });
  });

  it('maneja errores al cargar educación sin romper el componente', async () => {
    (repositories.education.getAll as vi.Mock).mockRejectedValue(new Error('Error de carga'));

    render(<Education />);

    await waitFor(() => {
      expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
    });
  });
});
