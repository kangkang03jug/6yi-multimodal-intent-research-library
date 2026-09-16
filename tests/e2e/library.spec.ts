import { test, expect } from '@playwright/test';
test('empty template has accessible primary pages', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Your Research Library' })).toBeVisible();
  await page.getByRole('link', { name: '论文池', exact: true }).click();
  await expect(page.getByRole('heading', { name: '论文池' })).toBeVisible();
  await expect(page.getByText('还没有论文。')).toBeVisible();
});
test('hero title wraps long text without overflowing at desktop and mobile widths', async ({
  page,
}) => {
  await page.goto('/');
  const heroTitle = page.locator('.hero h1');
  await heroTitle.evaluate((element) => {
    element.textContent =
      'A deliberately long research library title that should wrap naturally to fit the available content width without creating horizontal overflow';
  });

  for (const width of [1280, 375]) {
    await page.setViewportSize({ width, height: 800 });
    const metrics = await heroTitle.evaluate((element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      const lineTops = new Set(Array.from(range.getClientRects(), (rect) => Math.round(rect.top)));
      return {
        whiteSpace: getComputedStyle(element).whiteSpace,
        lineCount: lineTops.size,
        titleOverflows: element.scrollWidth > element.clientWidth + 1,
        pageOverflows: document.documentElement.scrollWidth > window.innerWidth + 1,
      };
    });

    expect(metrics.whiteSpace).not.toBe('nowrap');
    expect(metrics.lineCount).toBeGreaterThan(1);
    expect(metrics.titleOverflows).toBe(false);
    expect(metrics.pageOverflows).toBe(false);
  }
});
