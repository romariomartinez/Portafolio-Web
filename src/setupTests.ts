import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { act } from '@testing-library/react';

// --- Mock de IntersectionObserver (para Framer Motion) ---
class MockIntersectionObserver {
  constructor(_callback: any, _options?: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).IntersectionObserver = MockIntersectionObserver;

// --- Silenciar warnings innecesarios de React durante los tests ---
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('act(...)') || args[0].includes('not wrapped in act'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// --- Helper para envolver renders automáticos con act() ---
globalThis.renderWithAct = async (callback: () => void) => {
  await act(async () => {
    callback();
  });
};

// --- Limpiar mocks entre pruebas ---
afterEach(() => {
  vi.clearAllMocks();
});
