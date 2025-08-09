import { test, expect } from '@playwright/test';

test('Should able to login successfully', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/index.htm');

    await page.locator('input[name="username"]').fill('test789');
    await page.locator('input[name="password"]').fill('test');
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
});

test('Should not be able to login with invalid credentials', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/index.htm');

    await page.locator('input[name="username"]').fill('marianne123test'); // intentionally invalid username
    await page.locator('input[name="password"]').fill('test'); 

    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByText('An internal error has')).toBeVisible();
    await expect(page.locator('#rightPanel')).toContainText('An internal error has occurred and has been logged.');
    await page.screenshot({ path: 'screenshots/login-error.png' });
});
