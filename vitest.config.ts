/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: ["tests/e2e/**", "**/*.e2e.test.{js,ts}", "node_modules/**"],
  },
});
