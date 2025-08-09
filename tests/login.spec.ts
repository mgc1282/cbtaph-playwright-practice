import { test, expect } from '@playwright/test';

test('Should be able to login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.getByText('Swag Labs').click();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');
});

test('Should not be able to login with invalid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  // Attempt to login with invalid credentials
  await page.locator('[data-test="username"]').fill('standarduser'); //intentionally incorrect username
  // await page.locator('[data-test="username"]').fill('standard_user'); //correct
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.locator('[data-test="login-container"]')).toMatchAriaSnapshot(`
    - textbox "Username": standarduser
    - textbox "Password": secret_sauce
    - 'heading "Epic sadface: Username and password do not match any user in this service" [level=3]':
      - button
    - button "Login"
    `);
  await page.screenshot({ path: 'screenshot.png' });
});