import { test, expect } from '@playwright/test';
test('empty template has accessible primary pages', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Your Research Library' })).toBeVisible();
  await page.getByRole('link', { name: '论文池', exact: true }).click();
  await expect(page.getByRole('heading', { name: '论文池' })).toBeVisible();
  await expect(page.getByText('还没有论文。')).toBeVisible();
});
