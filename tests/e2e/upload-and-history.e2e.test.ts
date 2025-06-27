import { test, expect } from '@playwright/test';

test('Пользователь может загрузить файл и увидеть его в истории', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  const filePath = './shri2025-back/test1.csv';
  await page.setInputFiles('input[type="file"]', filePath);
  
  await expect(page.getByText('Аналитика')).toBeVisible();
  
  await expect(page.getByText('test1.csv')).toBeVisible();
}); 