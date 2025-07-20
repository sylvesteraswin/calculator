import { test, expect } from "@playwright/test";

test("should display initial calculator UI", async ({ page }) => {
  await page.goto("/");
  // Wait for the calculator to load
  await page.waitForSelector("[data-value]");

  // Take screenshot of initial calculator state (first run creates baseline)
  await expect(page).toHaveScreenshot("calculator-initial-ui.png");

  // Verify calculator is loaded
  await expect(page.locator('[data-value="0"]')).toBeVisible();
  await expect(page.locator('[data-value="AC"]')).toBeVisible();
  await expect(page.locator('[data-value="="]')).toBeVisible();
});

test("should perform basic addition", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("[data-value]");

  // Click 5 + 3 = 8
  await page.click('[data-value="5"]');
  await page.click('[data-value="+"]');
  await page.click('[data-value="3"]');
  await page.click('[data-value="="]');

  // Verify result using more specific selector
  await expect(
    page.locator('[role="status"][aria-label="Current calculation result"]')
  ).toHaveText("8");

  // Take screenshot of result (first run creates baseline)
  await expect(page).toHaveScreenshot("calculator-addition-result.png");
});

test("should perform basic subtraction", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("[data-value]");

  // Click 10 - 3 = 7
  await page.click('[data-value="1"]');
  await page.click('[data-value="0"]');
  await page.click('[data-value="-"]');
  await page.click('[data-value="3"]');
  await page.click('[data-value="="]');

  // Verify result using more specific selector
  await expect(
    page.locator('[role="status"][aria-label="Current calculation result"]')
  ).toHaveText("7");
});

test("should perform multiplication", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("[data-value]");

  // Click 4 × 5 = 20
  await page.click('[data-value="4"]');
  await page.click('[data-value="×"]');
  await page.click('[data-value="5"]');
  await page.click('[data-value="="]');

  // Verify result using more specific selector
  await expect(
    page.locator('[role="status"][aria-label="Current calculation result"]')
  ).toHaveText("20");
});

test("should perform division", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("[data-value]");

  // Click 15 ÷ 3 = 5
  await page.click('[data-value="1"]');
  await page.click('[data-value="5"]');
  await page.click('[data-value="÷"]');
  await page.click('[data-value="3"]');
  await page.click('[data-value="="]');

  // Verify result using more specific selector
  await expect(
    page.locator('[role="status"][aria-label="Current calculation result"]')
  ).toHaveText("5");
});

test("should handle decimal input", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("[data-value]");

  // Click 5.5 + 2.3 = 7.8
  await page.click('[data-value="5"]');
  await page.click('[data-value="."]');
  await page.click('[data-value="5"]');
  await page.click('[data-value="+"]');
  await page.click('[data-value="2"]');
  await page.click('[data-value="."]');
  await page.click('[data-value="3"]');
  await page.click('[data-value="="]');

  // Verify result using more specific selector
  await expect(
    page.locator('[role="status"][aria-label="Current calculation result"]')
  ).toHaveText("7.8");
});

test("should handle percentage calculations", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("[data-value]");

  // Click 50% = 0.5
  await page.click('[data-value="5"]');
  await page.click('[data-value="0"]');
  await page.click('[data-value="%"]');
  await page.click('[data-value="="]');

  // Verify result using more specific selector
  await expect(
    page.locator('[role="status"][aria-label="Current calculation result"]')
  ).toHaveText("0.5");
});

test("should handle clear operation", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("[data-value]");

  // Enter some numbers
  await page.click('[data-value="5"]');
  await page.click('[data-value="+"]');
  await page.click('[data-value="3"]');

  // Clear everything
  await page.click('[data-value="AC"]');

  // Verify calculator is reset using more specific selector
  await expect(
    page.locator('[role="status"][aria-label="Current calculation result"]')
  ).toHaveText("0");
});

test("should handle delete operation", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("[data-value]");

  // Enter 123
  await page.click('[data-value="1"]');
  await page.click('[data-value="2"]');
  await page.click('[data-value="3"]');

  // Delete last digit using keyboard Backspace
  await page.keyboard.press("Backspace");

  // Verify 12 is displayed
  await expect(
    page.locator('[role="status"][aria-label="Current calculation result"]')
  ).toHaveText("12");
});

test("should measure Core Web Vitals", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Wait a bit for performance metrics to be available
  await page.waitForTimeout(2000);

  // Measure performance metrics
  const metrics = await page.evaluate(() => {
    return new Promise(resolve => {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const metrics: Record<string, number> = {};

        entries.forEach(entry => {
          if (entry.entryType === "largest-contentful-paint") {
            metrics.lcp = entry.startTime;
          }
          if (entry.entryType === "first-input") {
            const firstInput = entry as PerformanceEventTiming;
            metrics.fid = firstInput.processingStart - firstInput.startTime;
          }
          if (entry.entryType === "layout-shift") {
            const layoutShift = entry as unknown as { value: number };
            metrics.cls = layoutShift.value;
          }
        });

        resolve(metrics);
      });

      observer.observe({
        entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
      });

      // Timeout after 3 seconds
      setTimeout(() => resolve({}), 3000);
    });
  });

  // Log metrics for CI
  console.log("Core Web Vitals:", metrics);

  // Assert performance thresholds (adjust as needed)
  const typedMetrics = metrics as { lcp?: number; fid?: number; cls?: number };
  if (typedMetrics.lcp) expect(typedMetrics.lcp).toBeLessThan(2500); // LCP should be under 2.5s
  if (typedMetrics.fid) expect(typedMetrics.fid).toBeLessThan(100); // FID should be under 100ms
  if (typedMetrics.cls) expect(typedMetrics.cls).toBeLessThan(0.1); // CLS should be under 0.1
});
