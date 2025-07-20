import { describe, it, expect } from "vitest";
import { handleInvertedInput } from "./inverted-input";

describe("Inverted Input Operation", () => {
  describe("Basic sign toggling", () => {
    it("should toggle positive to negative with parentheses", () => {
      const result = handleInvertedInput(["5"]);
      expect(result).toEqual(["(-5)"]);
    });

    it("should toggle negative to positive", () => {
      const result = handleInvertedInput(["(-5)"]);
      expect(result).toEqual(["5"]);
    });

    it("should handle negative without parentheses", () => {
      const result = handleInvertedInput(["-5"]);
      expect(result).toEqual(["5"]);
    });

    it("should handle zero", () => {
      const result = handleInvertedInput(["0"]);
      expect(result).toEqual(["(-0)"]);
    });
  });

  describe("Multi-digit numbers", () => {
    it("should toggle large positive number", () => {
      const result = handleInvertedInput(["12345"]);
      expect(result).toEqual(["(-12345)"]);
    });

    it("should toggle large negative number", () => {
      const result = handleInvertedInput(["(-12345)"]);
      expect(result).toEqual(["12345"]);
    });
  });

  describe("Decimal numbers", () => {
    it("should toggle positive decimal", () => {
      const result = handleInvertedInput(["5.5"]);
      expect(result).toEqual(["(-5.5)"]);
    });

    it("should toggle negative decimal", () => {
      const result = handleInvertedInput(["(-5.5)"]);
      expect(result).toEqual(["5.5"]);
    });
  });

  describe("Ignoring non-numbers", () => {
    it("should ignore operators", () => {
      const result = handleInvertedInput(["5", "+"]);
      expect(result).toEqual(["5", "+"]);
    });

    it("should ignore empty values", () => {
      const result = handleInvertedInput([""]);
      expect(result).toEqual([""]);
    });

    it("should ignore percentage numbers", () => {
      const result = handleInvertedInput(["5%"]);
      expect(result).toEqual(["5%"]);
    });
  });

  describe("Complex expressions", () => {
    it("should toggle last number in expression", () => {
      const result = handleInvertedInput(["5", "+", "3"]);
      expect(result).toEqual(["5", "+", "(-3)"]);
    });

    it("should toggle negative number in expression", () => {
      const result = handleInvertedInput(["5", "+", "(-3)"]);
      expect(result).toEqual(["5", "+", "3"]);
    });

    it("should ignore if last value is operator", () => {
      const result = handleInvertedInput(["5", "+"]);
      expect(result).toEqual(["5", "+"]);
    });
  });

  describe("Edge cases", () => {
    it("should handle single element array", () => {
      const result = handleInvertedInput(["5"]);
      expect(result).toEqual(["(-5)"]);
    });

    it("should handle very large numbers", () => {
      const result = handleInvertedInput(["999999999"]);
      expect(result).toEqual(["(-999999999)"]);
    });

    it("should handle scientific notation", () => {
      const result = handleInvertedInput(["1e5"]);
      expect(result).toEqual(["(-1e5)"]);
    });
  });
});
