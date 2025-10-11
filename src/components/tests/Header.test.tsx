import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Certifications } from '../Certifications';

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

describe('Certifications Component (sin pdf_url)', () => {
  it('no abre nada si no hay pdf_url', async () => {
    mockGetAll.mockResolvedValueOnce([
      {
        id: 1,
        name_es: 'Certificación React',
        issuer_es: 'Platzi',
        date: '2024-05-01',
      },
    ]);

    const openSpy = vi.fn();
    vi.spyOn(window, 'open').mockImplementation(openSpy);

    render(<Certifications />);
    const card = await screen.findByText('Certificación React');
    fireEvent.click(card);

    await waitFor(() => expect(openSpy).not.toHaveBeenCalled());
  });
});
