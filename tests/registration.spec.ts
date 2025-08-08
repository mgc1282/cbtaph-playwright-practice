import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.getByRole('link', { name: 'Admin Page' }).click();
    await page.getByRole('button', { name: 'Clean' }).click();
});

test('Verify that user is able to register account', async ({ page }) =>
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.getByRole('link', { name: 'Register' }).click();
    await page.locator('[id="customer.firstName"]').fill('Marianne');
    await page.locator('[id="customer.lastName"]').fill('Cecilio');
    await page.locator('[id="customer.address.street"]').fill('111');
    await page.locator('[id="customer.address.city"]').fill('Pasig City');
    await page.locator('[id="customer.address.state"]').fill('NCR');
    await page.locator('[id="customer.address.zipCode"]').fill('1611');
    await page.locator('[id="customer.phoneNumber"]').fill('0123456789');
    await page.locator('[id="customer.ssn"]').fill('1234');
await page.locator('[id="customer.username"]').fill('mariannetest');
await page.locator('[id="customer.password"]').fill('test');
await page.locator('#repeatedPassword').fill('test');

await page.getByRole('button', { name: 'Register' }).click();

await expect(page.locator('heading', { name: 'Welcome mariannetest' })
await expect(pageXOffset.locator(h1.title)).toContainText('Welcome mariannetest');
});