import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Hero } from '../Hero';
import { useLanguage } from '../../contexts/LanguageContext';
import { repositories } from '../../repositories';

// --- Mocks globales ---
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: vi.fn(),
}));

vi.mock('../../repositories', () => ({
  repositories: {
    profile: {
      getFirst: vi.fn(),
    },
  },
}));

describe('Hero Component', () => {
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
    (repositories.profile.getFirst as vi.Mock).mockResolvedValue(null);
    render(<Hero />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('renderiza correctamente la información del perfil', async () => {
    (repositories.profile.getFirst as vi.Mock).mockResolvedValue({
      id: 1,
      full_name: 'Romario Martínez',
      title_es: 'Desarrollador Web',
      title_en: 'Web Developer',
      bio_es: 'Apasionado por el desarrollo de software y la tecnología.',
      bio_en: 'Passionate about software development and technology.',
      email: 'romario@example.com',
      phone: '+57 300 000 0000',
      location: 'Valledupar, Colombia',
      linkedin: 'https://linkedin.com/in/romario',
      github: 'https://github.com/romario',
      website: 'https://romario.dev',
      photo_url: 'https://example.com/photo.jpg',
    });

    render(<Hero />);

    await waitFor(() => {
      expect(screen.getByText('Romario Martínez')).toBeInTheDocument();
      expect(screen.getByText('Desarrollador Web')).toBeInTheDocument();
      expect(screen.getByText('Apasionado por el desarrollo de software y la tecnología.')).toBeInTheDocument();

      expect(screen.getByText('romario@example.com')).toBeInTheDocument();
      expect(screen.getByText('+57 300 000 0000')).toBeInTheDocument();
      expect(screen.getByText('Valledupar, Colombia')).toBeInTheDocument();

      // Verifica los íconos sociales
      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
      expect(screen.getByLabelText('Website')).toBeInTheDocument();
    });
  });

  it('maneja errores sin romper el componente', async () => {
    (repositories.profile.getFirst as vi.Mock).mockRejectedValue(new Error('Error de carga'));
    render(<Hero />);

    await waitFor(() => {
      expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
    });
  });
});
