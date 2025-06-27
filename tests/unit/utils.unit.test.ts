// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';

import { isCsvFile } from '@front/utils/analysis';
import { formatDate } from '@front/utils/formateDate';
import { addToHistory, clearHistory } from '@front/utils/storage';

describe('formatDate', () => {
  it('корректно форматирует дату', () => {
    expect(formatDate(new Date('2024-01-01'))).toBe('01.01.2024');
  });
});

describe('isCsvFile', () => {
  it('распознаёт csv-файл', () => {
    expect(isCsvFile(new File([''], 'test.csv'))).toBe(true);
  });
  it('отклоняет не-csv файл', () => {
    expect(isCsvFile(new File([''], 'test.txt'))).toBe(false);
  });
});

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('добавляет элемент в историю', () => {
    addToHistory({ fileName: 'file.csv' });
    const history = localStorage.getItem('tableHistory');
    expect(history).not.toBeNull();
    expect(history!).toContain('file.csv');
  });
  it('очищает историю', () => {
    addToHistory({ fileName: 'file.csv' });
    clearHistory();
    expect(localStorage.getItem('history')).toBeNull();
  });
}); 