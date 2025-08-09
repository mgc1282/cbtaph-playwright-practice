import { test, expect } from '@playwright/test';

test('Advanced Assertion - Sauce Demo', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');


    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.waitForURL('**/inventory.html', { timeout: 10000 });
   

    // test: auto-retrying assertion
    await expect(page.locator('.title')).toHaveText('Products', { timeout: 5000 });

    // test: non-retrying assertion
    const titleText = await page.locator('.title').textContent();
    expect(titleText).toBe('Products'); // No auto-retry here

    // test: negating matcher
    await expect(page.locator('.title')).not.toHaveText('Non-existent Title');

    // test: soft assertion
    await expect.soft(page.locator('.title')).toHaveText('Products');
    await expect.soft(page.locator('.title')).not.toHaveText('Non-existent Title');

    // test: custom expect message
    const itemCount = await page.locator('.inventory_item').count();
    expect(itemCount, 'Expected at least 6 products on the page').toBeGreaterThanOrEqual(6);
});