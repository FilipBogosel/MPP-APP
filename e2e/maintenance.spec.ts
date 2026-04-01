import { expect, test } from '@playwright/test';

const APP_URL = 'http://localhost:5173';

function parseTotalResults(summaryText: string): number {
  const match = summaryText.match(/of\s+(\d+)\s+results/i);

  if (!match) {
    throw new Error(`Could not parse total results from pagination text: ${summaryText}`);
  }

  return Number(match[1]);
}

test('Scenario 1: Application Routing', async ({ page }) => {
  await page.goto(`${APP_URL}/`);

  await page.getByRole('button', { name: 'Go to Dashboard' }).click();

  await expect(page).toHaveURL(/\/dashboard\/records/);
});

test('Scenario 2: Create a Record (CRUD)', async ({ page }) => {
  await page.goto(`${APP_URL}/dashboard/records`);

  const summary = page.locator('p', { hasText: /Showing/i });
  const initialTotal = parseTotalResults(await summary.innerText());

  await page.goto(`${APP_URL}/dashboard/records/new`);

  await page.getByLabel('Service Name').fill('E2E Test Service');
  await page.getByLabel('Current Odometer (km)').fill('50000');
  await page.getByLabel('Next Recommended Service (km)').fill('60000');
  await page.getByLabel('Service Shop Name').fill('E2E Auto Shop');
  await page.getByLabel('Location').fill('Test City');
  await page.getByLabel('Total Cost').fill('250');
  await page.getByLabel('Mechanic Notes / Description').fill('Routine E2E maintenance note.');

  await page.getByRole('button', { name: 'Save Record' }).click();

  await expect(page).toHaveURL(/\/dashboard\/records/);

  await expect
    .poll(async () => parseTotalResults(await summary.innerText()))
    .toBe(initialTotal + 1);
});

test('Scenario 3: Table Filtering', async ({ page }) => {
  await page.goto(`${APP_URL}/dashboard/records`);

  const summary = page.locator('p', { hasText: /Showing/i });
  const initialTotal = parseTotalResults(await summary.innerText());

  await page.getByLabel('Select your current car').selectOption('car-001');

  await expect
    .poll(async () => parseTotalResults(await summary.innerText()))
    .toBeLessThan(initialTotal);
});
