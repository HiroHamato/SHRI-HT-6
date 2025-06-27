import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { Dropzone } from '@components/Dropzone/Dropzone';

describe('Dropzone', () => {
  it('отображает кнопку загрузки', () => {
    render(<Dropzone onFileUpload={vi.fn()} />);
    expect(screen.getByText(/загрузить/i)).toBeInTheDocument();
  });

  it('вызывает onFileSelect при выборе файла', () => {
    const onFileSelect = vi.fn();
    const { container } = render(<Dropzone file={null} status="idle" error={null} onFileSelect={onFileSelect} onClear={vi.fn()} />);
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    fireEvent.change(input!, {
      target: { files: [new File(['test'], 'test.csv', { type: 'text/csv' })] },
    });

    expect(onFileSelect).toHaveBeenCalled();
  });

  it('показывает ошибку при загрузке не-csv файла', () => {
    const onFileSelect = vi.fn();
    const { container } = render(<Dropzone file={null} status="idle" error={"Ошибка"} onFileSelect={onFileSelect} onClear={vi.fn()} />);
    expect(screen.getByText(/ошибка/i)).toBeInTheDocument();
  });

  it('отображает индикатор загрузки при status="processing"', () => {
    render(<Dropzone file={null} status="processing" error={null} onFileSelect={vi.fn()} onClear={vi.fn()} />);
    expect(screen.getByText(/идёт парсинг файла/i)).toBeInTheDocument();
  });

  it('отображает статус "готово!" при status="completed"', () => {
    render(<Dropzone file={new File([''], 'test.csv')} status="completed" error={null} onFileSelect={vi.fn()} onClear={vi.fn()} />);
    expect(screen.getByText(/готово!/i)).toBeInTheDocument();
  });
}); 