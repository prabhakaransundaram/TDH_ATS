import { test, expect } from "../fixtures/baseTest.js";



test('Add Admission - Generate Invoice', async ({ page }) => {






await page.getByRole('button', { name: 'Add New' }).click();
await page.getByRole('button', { name: 'Add Package' }).click();
await page.getByRole('textbox', { name: 'Search with patient name or' }).click();
await page.getByRole('textbox', { name: 'Search with patient name or' }).click();
await page.getByRole('textbox', { name: 'Search with patient name or' }).fill('Test pack');
await page.getByText('Test pack', { exact: true }).click();
await page.locator('.bookappointmentBody > div:nth-child(3)').click();
await page.getByText('Proceed').click();
await page.locator('div').filter({ hasText: /^Activate Package$/ }).first().click();
await page.getByRole('button', { name: 'Add New' }).click();
await page.getByRole('button', { name: 'Add Package' }).click();
await page.getByRole('textbox', { name: 'Search with patient name or' }).click();
await page.getByRole('textbox', { name: 'Search with patient name or' }).fill('Test pack');
await page.getByText('Test pack', { exact: true }).click();
await page.getByRole('button', { name: 'Book Now' }).click();
await page.locator('app-package-item-card').getByRole('button').filter({ hasText: /^$/ }).click();
await page.locator('.slotButton').first().click();
await page.getByRole('button', { name: 'Next', exact: true }).click();








});








