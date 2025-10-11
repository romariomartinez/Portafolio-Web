import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Certifications } from '../Certifications';

// Mocks necesarios
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'es',
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
t: (es: string, _en: string) => es,

  }),
}));

const mockGetAll = vi.fn();
vi.mock('../../repositories', () => ({
  repositories: {
    certification: {
      getAll: () => mockGetAll(),
    },
  },
}));

describe('Certifications (sin pdf_url)', () => {
  it('no abre nada si no hay pdf_url', async () => {
    // Datos sin URL
    mockGetAll.mockResolvedValueOnce([
      {
        id: 1,
        name_es: 'Certificación React',
        issuer_es: 'Platzi',
        date: '2024-05-01',
      },
    ]);

    // Nuevo mock limpio para window.open
    const openSpy = vi.fn();
    vi.spyOn(window, 'open').mockImplementation(openSpy);

    render(<Certifications />);
    const card = await screen.findByText('Certificación React');

    // Simular clic
    fireEvent.click(card);

    // Esperar que no se haya llamado
    await waitFor(() => {
      expect(openSpy).not.toHaveBeenCalled();
    });

    // Restaurar mock
    vi.restoreAllMocks();
  });
});
