import { chromium } from "@playwright/test";

async function globalSetup() {
  // Set up performance monitoring
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Enable performance monitoring
  await page.addInitScript(() => {
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

  await browser.close();
}

export default globalSetup;
