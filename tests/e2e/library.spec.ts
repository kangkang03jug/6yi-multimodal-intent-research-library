import { test, expect } from '@playwright/test';
test('empty template has accessible primary pages', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Your Research Library' })).toBeVisible();
  await page.getByRole('link', { name: 'Paper Pool' }).click();
  await expect(page.getByRole('heading', { name: 'Paper Pool' })).toBeVisible();
  await expect(page.getByText('No papers yet.')).toBeVisible();
});
