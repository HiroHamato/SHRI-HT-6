import { test, expect } from '@playwright/test';

test('Пользовательский флоу: загрузка, анализ, история, очистка', async ({ page }) => {
  await page.goto('http://localhost:5173');

  
  const filePath = './shri2025-back/test1.csv';
  await page.setInputFiles('input[type="file"]', filePath);
  await page.getByRole('button', { name: /отправить/i }).click();
  await expect(page.getByText(/готово/i)).toBeVisible();
  await expect(page.getByText(/Аналитика|highlights|хайлайты/i)).toBeVisible();

  
  await page.getByRole('link', { name: /история/i }).click();
  await expect(page.getByText('test1.csv')).toBeVisible();

  
  if (await page.getByRole('button', { name: /очистить/i }).isVisible()) {
    await page.getByRole('button', { name: /очистить/i }).click();
    await expect(page.locator('text=test1.csv')).not.toBeVisible();
  }

  
  await page.getByRole('link', { name: /генератор/i }).click();
  await expect(page.getByRole('button', { name: /начать генерацию/i })).toBeVisible();
}); 