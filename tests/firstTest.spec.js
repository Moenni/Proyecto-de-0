const { test, expect } = require('@playwright/test');

test.describe('Primeros tests', () => {
    test.beforeAll(async () => {
        await console.log('Before all')
    })
    test.beforeEach(async ({ page }) => {
        await page.goto('/');

    })
    test.afterEach(async () => {
        await console.log('After each')
    })
    test.afterAll(async () => {
        await console.log('After all')
    })

    test('Deberia registrarse en pushing it', async ({ page }) => {

        await page.getByLabel('User').fill('pushingit' + Math.floor(Math.random() * 1000));
        await page.locator('#pass').fill('123456!');
        await page.locator('[value="Male"]').click({ force: true });
        await page.locator('#day').selectOption('10')
        await page.locator('#month').selectOption({ label: "October" })
        await page.locator('#year').selectOption('1940')
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.locator('[id^="user_"]')).toBeVisible();
    });

    test('Deberia registrarse en pushing it 2', async ({ page }) => {

        await page.getByLabel('User').fill('pushingit' + Math.floor(Math.random() * 1000));
        await page.locator('#pass').fill('123456!');
        await page.locator('[value="Male"]').click({ force: true });
        await page.locator('#day').selectOption('10')
        await page.locator('#month').selectOption({ label: "October" })
        await page.locator('#year').selectOption('1940')
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.locator('[id^="user_"]')).toBeVisible();
    });
});