import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ClearHistoryButton } from '@front/components/ClearHistoryButton/ClearHistoryButton';
import * as storage from '@front/utils/storage';

vi.mock('@front/store/historyStore', () => ({
  useHistoryStore: () => ({
    clearHistory: vi.fn(),
    history: [{ id: '1', fileName: 'file.csv', timestamp: Date.now(), highlights: [{}] }],
  }),
}));

vi.mock('../../../shri-2025/src/utils/storage', () => {
  return {
    clearHistory: vi.fn(),
  };
});

beforeEach(() => {
  vi.spyOn(storage, 'clearHistory').mockImplementation(() => {});
});

describe('ClearHistoryButton', () => {
  it('отображает кнопку и вызывает очистку истории при клике', () => {
    render(<ClearHistoryButton />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(storage.clearHistory).toHaveBeenCalled();
  });
}); 