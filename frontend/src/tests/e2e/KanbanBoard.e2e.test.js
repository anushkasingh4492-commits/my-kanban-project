import { test, expect } from '@playwright/test';

test.describe('Kanban Board E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // This must match the URL where your app is running
    await page.goto('http://localhost:3000');
  });

  test('should display the Kanban Board title', async ({ page }) => {
    const title = page.locator('h2');
    await expect(title).toContainText('Kanban Board');
  });

  test('should add a new task to the Todo column', async ({ page }) => {
    const input = page.locator('input[placeholder="Enter task..."]');
    const addButton = page.getByRole('button', { name: /Add Task/i });

    await input.fill('New E2E Task');
    await addButton.click();

    // Verify the task appears
    const task = page.locator('text=New E2E Task');
    await expect(task).toBeVisible();
  });
});