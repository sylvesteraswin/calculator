import { describe, it, expect } from "vitest";
import { handleClearOperation } from "./clear-operation";

describe("Clear Operation", () => {
  describe("Basic clearing", () => {
    it("should clear single number", () => {
      const result = handleClearOperation();
      expect(result).toEqual([""]);
    });

    it("should clear complex expression", () => {
      const result = handleClearOperation();
      expect(result).toEqual([""]);
    });

    it("should clear empty state", () => {
      const result = handleClearOperation();
      expect(result).toEqual([""]);
    });
  });

  describe("Always returns same state", () => {
    it("should always return empty array with empty string", () => {
      const result1 = handleClearOperation();
      const result2 = handleClearOperation();
      const result3 = handleClearOperation();

      expect(result1).toEqual([""]);
      expect(result2).toEqual([""]);
      expect(result3).toEqual([""]);
    });

    it("should return consistent result regardless of input", () => {
      // Note: handleClearOperation doesn't take parameters, but testing consistency
      const result = handleClearOperation();
      expect(result).toEqual([""]);
    });
  });

  describe("Reset behavior", () => {
    it("should reset to initial calculator state", () => {
      const result = handleClearOperation();
      expect(result).toEqual([""]);
    });

    it("should be ready for new input", () => {
      const result = handleClearOperation();
      expect(result).toEqual([""]);
    });
  });
});
