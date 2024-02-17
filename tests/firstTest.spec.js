const { test, expect } = require('@playwright/test');
const datos = require('../fixtures/datos.json')
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
        await page.locator('#pass').fill(process.env.PASSWORD);
        await page.locator('[value="Male"]').click({ force: true });
        await page.locator('#day').selectOption('10')
        await page.locator('#month').selectOption({ label: "October" })
        await page.locator('#year').selectOption('1940')
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.locator('[id^="user_"]')).toBeVisible();
        await page.getByText("To Do List").click();
        await page.locator(`[id="removeAll"]`).click();
        await expect(page.getByText(datos.tareas.tarea1)).not.toBeVisible();
        await page.locator('#task').fill(datos.tareas.tarea1);
        await page.getByText("Send").click();
        await expect(page.getByText(datos.tareas.tarea1)).toBeVisible();
    });

    test.skip('Deberia registrarse en pushing it 2', async ({ page }) => {

        await page.getByLabel('User').fill('pushingit' + Math.floor(Math.random() * 1000));
        await page.locator('#pass').fill('123456!');
        await page.locator('[value="Male"]').click({ force: true });
        await page.locator('#day').selectOption('10')
        await page.locator('#month').selectOption({ label: "October" })
        await page.locator('#year').selectOption('1940')
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.locator('[id^="user_"]')).toBeVisible();
    });

    test.only('Request en playwright', async ({ request }) => {
        const registrarUsuario = await request.post('https://pushing-it.onrender.com/api/login', {
            data: {
                "username": "pushingit",
                "password": "123456!"
            },
            headers: null
        })
        await expect(registrarUsuario.ok()).toBeTruthy();
        await console.log(registrarUsuario);
    })
});