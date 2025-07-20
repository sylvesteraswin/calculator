import { describe, it, expect } from "vitest";
import { handleDecimalInput } from "./decimal-input";

describe("Decimal Input Operation", () => {
  describe("Basic decimal input", () => {
    it("should add decimal to empty value", () => {
      const result = handleDecimalInput([""]);
      expect(result).toEqual(["0."]);
    });

    it("should add decimal to existing number", () => {
      const result = handleDecimalInput(["5"]);
      expect(result).toEqual(["5."]);
    });

    it("should add decimal to multi-digit number", () => {
      const result = handleDecimalInput(["50"]);
      expect(result).toEqual(["50."]);
    });

    it("should add decimal to negative number", () => {
      const result = handleDecimalInput(["(-5)"]);
      expect(result).toEqual(["(-5)."]);
    });
  });

  describe("Preventing multiple decimals", () => {
    it("should not add decimal if already present", () => {
      const result = handleDecimalInput(["5."]);
      expect(result).toEqual(["5."]);
    });

    it("should not add decimal to number with decimal", () => {
      const result = handleDecimalInput(["5.5"]);
      expect(result).toEqual(["5.5"]);
    });

    it("should not add decimal to negative number with decimal", () => {
      const result = handleDecimalInput(["(-5.5)"]);
      expect(result).toEqual(["(-5.5)"]);
    });
  });

  describe("Complex expressions", () => {
    it("should add decimal to last number in expression", () => {
      const result = handleDecimalInput(["5", "+", "3"]);
      expect(result).toEqual(["5", "+", "3."]);
    });

    it("should add decimal to last number after operator", () => {
      const result = handleDecimalInput(["5", "+", "30"]);
      expect(result).toEqual(["5", "+", "30."]);
    });

    it("should add decimal to empty value in expression", () => {
      const result = handleDecimalInput(["5", "+", ""]);
      expect(result).toEqual(["5", "+", "0."]);
    });

    it("should not add decimal if last value is operator", () => {
      const result = handleDecimalInput(["5", "+"]);
      expect(result).toEqual(["5", "+"]);
    });
  });

  describe("Edge cases", () => {
    it("should handle single element array", () => {
      const result = handleDecimalInput([""]);
      expect(result).toEqual(["0."]);
    });

    it("should handle percentage numbers", () => {
      const result = handleDecimalInput(["5%"]);
      expect(result).toEqual(["5%."]);
    });

    it("should handle decimal with percentage", () => {
      const result = handleDecimalInput(["5.5%"]);
      expect(result).toEqual(["5.5%"]);
    });
  });
});
