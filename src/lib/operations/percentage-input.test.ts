import { describe, it, expect } from "vitest";
import { handlePercentageInput } from "./percentage-input";

describe("Percentage Input Operation", () => {
  describe("Basic percentage input", () => {
    it("should add percentage to number", () => {
      const result = handlePercentageInput(["5"]);
      expect(result).toEqual(["5%"]);
    });

    it("should add percentage to decimal", () => {
      const result = handlePercentageInput(["5.5"]);
      expect(result).toEqual(["5.5%"]);
    });

    it("should add percentage to zero", () => {
      const result = handlePercentageInput(["0"]);
      expect(result).toEqual(["0%"]);
    });

    it("should add percentage to negative number", () => {
      const result = handlePercentageInput(["(-5)"]);
      expect(result).toEqual(["(-5)%"]);
    });
  });

  describe("Multi-digit numbers", () => {
    it("should add percentage to large number", () => {
      const result = handlePercentageInput(["12345"]);
      expect(result).toEqual(["12345%"]);
    });

    it("should add percentage to large decimal", () => {
      const result = handlePercentageInput(["123.456"]);
      expect(result).toEqual(["123.456%"]);
    });
  });

  describe("Ignoring non-numbers", () => {
    it("should ignore operators", () => {
      const result = handlePercentageInput(["5", "+"]);
      expect(result).toEqual(["5", "+"]);
    });

    it("should ignore empty values", () => {
      const result = handlePercentageInput([""]);
      expect(result).toEqual([""]);
    });

    it("should ignore if last value is operator", () => {
      const result = handlePercentageInput(["5", "+"]);
      expect(result).toEqual(["5", "+"]);
    });
  });

  describe("Complex expressions", () => {
    it("should add percentage to last number in expression", () => {
      const result = handlePercentageInput(["5", "+", "3"]);
      expect(result).toEqual(["5", "+", "3%"]);
    });

    it("should add percentage to negative number in expression", () => {
      const result = handlePercentageInput(["5", "+", "(-3)"]);
      expect(result).toEqual(["5", "+", "(-3)%"]);
    });

    it("should add percentage to decimal in expression", () => {
      const result = handlePercentageInput(["5", "+", "3.5"]);
      expect(result).toEqual(["5", "+", "3.5%"]);
    });
  });

  describe("Edge cases", () => {
    it("should handle single element array", () => {
      const result = handlePercentageInput(["5"]);
      expect(result).toEqual(["5%"]);
    });

    it("should handle very large numbers", () => {
      const result = handlePercentageInput(["999999999"]);
      expect(result).toEqual(["999999999%"]);
    });

    it("should handle scientific notation", () => {
      const result = handlePercentageInput(["1e5"]);
      expect(result).toEqual(["1e5%"]);
    });

    it("should handle negative scientific notation", () => {
      const result = handlePercentageInput(["(-1e5)"]);
      expect(result).toEqual(["(-1e5)%"]);
    });
  });
});
