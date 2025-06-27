import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HistoryList } from '@front/components/HistoryList/HistoryList';
import { useHistoryStore } from '@front/store/historyStore';

vi.mock('@front/store/historyStore', () => {
  const actual = vi.importActual('@front/store/historyStore');
  return {
    ...actual,
    useHistoryStore: vi.fn(),
  };
});

describe('HistoryList', () => {
  beforeEach(() => {
    (useHistoryStore as unknown as jest.Mock).mockReturnValue({
      history: [
        { id: '1', fileName: 'file.csv', timestamp: Date.now(), highlights: [{}] },
      ],
      showModal: vi.fn(),
      setSelectedItem: vi.fn(),
      removeFromHistoryStore: vi.fn(),
      updateHistoryFromStorage: vi.fn(),
    });
  });

  it('отображает элемент истории', () => {
    render(<HistoryList />);
    expect(screen.getByText(/file.csv/i)).toBeInTheDocument();
  });

  it('отображает пустую историю', () => {
    (useHistoryStore as unknown as jest.Mock).mockReturnValue({
      history: [],
      showModal: vi.fn(),
      setSelectedItem: vi.fn(),
      removeFromHistoryStore: vi.fn(),
      updateHistoryFromStorage: vi.fn(),
    });
    render(<HistoryList />);
    expect(screen.queryByText(/file.csv/i)).not.toBeInTheDocument();
  });
}); 