import '@testing-library/jest-dom';

// Мок для css-модулей
if (typeof require !== 'undefined') {
  require.extensions['.css'] = () => {};
}

// Моки для window/localStorage (если нужно)
if (typeof window !== 'undefined') {
  window.localStorage = window.localStorage || {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
} 