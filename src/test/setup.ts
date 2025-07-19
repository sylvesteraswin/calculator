import "@testing-library/jest-dom";

// Mock ResizeObserver for tests
// @ts-expect-error - ResizeObserver is not a global object
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
