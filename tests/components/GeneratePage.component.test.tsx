import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { waitFor } from '@testing-library/react';
import { GeneratePage } from '@front/pages/Generate/GeneratePage';

beforeAll(() => {
  global.URL.createObjectURL = vi.fn();
  global.URL.revokeObjectURL = vi.fn();
});

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      headers: { get: () => 'attachment; filename="report.csv"' },
      blob: () => Promise.resolve(new Blob(["test"], { type: 'text/csv' })),
    }) as unknown as ReturnType<typeof fetch>
  );
});

describe('GeneratePage', () => {
  it('отображает кнопку генерации', () => {
    render(<GeneratePage />);
    expect(screen.getByRole('button', { name: /начать генерацию/i })).toBeInTheDocument();
  });

  it('отображает сообщение об успехе после генерации', async () => {
    render(<GeneratePage />);
    fireEvent.click(screen.getByRole('button', { name: /начать генерацию/i }));
    await waitFor(() => {
      const success = screen.queryByText((content) => /отч[её]т.*сгенерирован/i.test(content));
      expect(success).toBeInTheDocument();
    });
  });

  it('отображает ошибку при неудаче', async () => {
    (global.fetch as unknown as jest.Mock).mockImplementationOnce(() => Promise.resolve({ ok: false, json: () => Promise.resolve({ error: 'fail' }) }));
    render(<GeneratePage />);
    fireEvent.click(screen.getByRole('button', { name: /начать генерацию/i }));
    await waitFor(() => expect(screen.getByText(/произошла ошибка/i)).toBeInTheDocument());
  });

  it('блокирует кнопку во время генерации', async () => {
    let resolve: (value: unknown) => void;
    (global.fetch as unknown as jest.Mock).mockImplementationOnce(() => new Promise(r => { resolve = r; }));
    render(<GeneratePage />);
    fireEvent.click(screen.getByRole('button', { name: /начать генерацию/i }));
    expect(screen.getByRole('button')).toBeDisabled();
    resolve!({ ok: true, headers: { get: () => '' }, blob: () => Promise.resolve(new Blob()) });
  });
}); 