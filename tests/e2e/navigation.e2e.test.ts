import { test, expect } from '@playwright/test';

test.describe('Навигационное меню', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173');
    });

    test('отображает все элементы навигации', async ({ page }) => {
        // Проверяем наличие всех элементов навигации
        await expect(page.getByRole('link', { name: /csv аналитик/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /csv генератор/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /история/i })).toBeVisible();
    });

    test('активный элемент выделяется при нахождении на главной странице', async ({ page }) => {
        // На главной странице активным должен быть "CSV Аналитик"
        const csvAnalystLink = page.getByRole('link', { name: /csv аналитик/i });
        await expect(csvAnalystLink).toHaveClass(/active/);
        
        // Остальные ссылки не должны быть активными
        const csvGeneratorLink = page.getByRole('link', { name: /csv генератор/i });
        const historyLink = page.getByRole('link', { name: /история/i });
        
        await expect(csvGeneratorLink).not.toHaveClass(/active/);
        await expect(historyLink).not.toHaveClass(/active/);
    });

    test('переход на страницу генератора', async ({ page }) => {
        // Кликаем на "CSV Генератор"
        await page.getByRole('link', { name: /csv генератор/i }).click();
        
        // Проверяем, что перешли на страницу генератора
        await expect(page).toHaveURL(/.*\/generate/);
        
        // Проверяем, что активным стал элемент "CSV Генератор"
        const csvGeneratorLink = page.getByRole('link', { name: /csv генератор/i });
        await expect(csvGeneratorLink).toHaveClass(/active/);
        
        // Проверяем, что на странице есть кнопка генерации
        await expect(page.getByRole('button', { name: /начать генерацию/i })).toBeVisible();
    });

    test('переход на страницу истории', async ({ page }) => {
        // Кликаем на "История"
        await page.getByRole('link', { name: /история/i }).click();
        
        // Проверяем, что перешли на страницу истории
        await expect(page).toHaveURL(/.*\/history/);
        
        // Проверяем, что активным стал элемент "История"
        const historyLink = page.getByRole('link', { name: /история/i });
        await expect(historyLink).toHaveClass(/active/);
        
        // Проверяем, что на странице есть заголовок истории
        await expect(page.getByText(/история/i)).toBeVisible();
    });

    test('возврат на главную страницу', async ({ page }) => {
        // Сначала переходим на страницу генератора
        await page.getByRole('link', { name: /csv генератор/i }).click();
        await expect(page).toHaveURL(/.*\/generate/);
        
        // Возвращаемся на главную страницу
        await page.getByRole('link', { name: /csv аналитик/i }).click();
        
        // Проверяем, что вернулись на главную страницу
        await expect(page).toHaveURL(/.*\/$/);
        
        // Проверяем, что активным стал элемент "CSV Аналитик"
        const csvAnalystLink = page.getByRole('link', { name: /csv аналитик/i });
        await expect(csvAnalystLink).toHaveClass(/active/);
        
        // Проверяем, что на главной странице есть зона загрузки файлов
        await expect(page.getByText(/загрузить/i)).toBeVisible();
    });

    test('навигация между всеми разделами', async ({ page }) => {
        // Проверяем переходы между всеми разделами
        
        // 1. Главная страница -> Генератор
        await page.getByRole('link', { name: /csv генератор/i }).click();
        await expect(page).toHaveURL(/.*\/generate/);
        await expect(page.getByRole('link', { name: /csv генератор/i })).toHaveClass(/active/);
        
        // 2. Генератор -> История
        await page.getByRole('link', { name: /история/i }).click();
        await expect(page).toHaveURL(/.*\/history/);
        await expect(page.getByRole('link', { name: /история/i })).toHaveClass(/active/);
        
        // 3. История -> Главная страница
        await page.getByRole('link', { name: /csv аналитик/i }).click();
        await expect(page).toHaveURL(/.*\/$/);
        await expect(page.getByRole('link', { name: /csv аналитик/i })).toHaveClass(/active/);
        
        // 4. Главная страница -> История
        await page.getByRole('link', { name: /история/i }).click();
        await expect(page).toHaveURL(/.*\/history/);
        await expect(page.getByRole('link', { name: /история/i })).toHaveClass(/active/);
        
        // 5. История -> Генератор
        await page.getByRole('link', { name: /csv генератор/i }).click();
        await expect(page).toHaveURL(/.*\/generate/);
        await expect(page.getByRole('link', { name: /csv генератор/i })).toHaveClass(/active/);
    });

    test('навигация работает после загрузки файла', async ({ page }) => {
        // Загружаем файл на главной странице
        const filePath = './shri2025-back/test1.csv';
        await page.setInputFiles('input[type="file"]', filePath);
        await page.getByRole('button', { name: /отправить/i }).click();
        await expect(page.getByText(/готово/i)).toBeVisible();
        
        // Проверяем, что навигация все еще работает
        await page.getByRole('link', { name: /csv генератор/i }).click();
        await expect(page).toHaveURL(/.*\/generate/);
        
        await page.getByRole('link', { name: /история/i }).click();
        await expect(page).toHaveURL(/.*\/history/);
        
        await page.getByRole('link', { name: /csv аналитик/i }).click();
        await expect(page).toHaveURL(/.*\/$/);
    });
}); 