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
  // Enable performance monitoring
  await page.context().addInitScript(() => {
    // Monitor Core Web Vitals
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime);
          }
          if (entry.entryType === "first-input") {
            const firstInputEntry = entry as PerformanceEventTiming;
            console.log(
              "FID:",
              firstInputEntry.processingStart - firstInputEntry.startTime
            );
          }
          if (entry.entryType === "layout-shift") {
            const layoutShift = entry as unknown as { value: number };
            console.log("CLS:", layoutShift.value);
          }
        }
      });
      observer.observe({
        entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
      });
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Wait for the page to be fully loaded
  await page.waitForTimeout(1000);

  // Trigger a user interaction to measure FID
  await page.click('[data-value="1"]');

  // Wait for performance metrics to be collected
  await page.waitForTimeout(2000);

  // Get performance metrics using Playwright's built-in methods
  const lcp = await page.evaluate(() => {
    return new Promise(resolve => {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lcpEntry = entries.find(
          entry => entry.entryType === "largest-contentful-paint"
        );
        if (lcpEntry) {
          resolve(lcpEntry.startTime);
        }
      });
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
      setTimeout(() => resolve(null), 3000);
    });
  });

  const fid = await page.evaluate(() => {
    return new Promise(resolve => {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const fidEntry = entries.find(
          entry => entry.entryType === "first-input"
        );
        if (fidEntry) {
          const firstInput = fidEntry as PerformanceEventTiming;
          resolve(firstInput.processingStart - firstInput.startTime);
        }
      });
      observer.observe({ entryTypes: ["first-input"] });
      setTimeout(() => resolve(null), 3000);
    });
  });

  const cls = await page.evaluate(() => {
    return new Promise(resolve => {
      let clsValue = 0;
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "layout-shift") {
            const layoutShift = entry as unknown as { value: number };
            clsValue += layoutShift.value;
          }
        }
      });
      observer.observe({ entryTypes: ["layout-shift"] });
      setTimeout(() => resolve(clsValue), 3000);
    });
  });

  const metrics = { lcp, fid, cls };

  // Log metrics for CI
  console.log("Core Web Vitals:", metrics);

  // Assert performance thresholds (adjust as needed)
  // Note: LCP and FID might be null in test environment, which is normal
  if (lcp) expect(lcp).toBeLessThan(2500); // LCP should be under 2.5s
  if (fid) expect(fid).toBeLessThan(100); // FID should be under 100ms
  expect(cls).toBeLessThan(0.1); // CLS should be under 0.1 (always check this)
});
