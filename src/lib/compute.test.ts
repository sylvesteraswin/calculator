import { describe, it, expect } from "vitest";
import { compute } from "./compute";

describe("compute", () => {
  it("should handle basic addition", () => {
    expect(compute(["5", "+", "3"])).toBe(8);
  });

  it("should handle basic subtraction", () => {
    expect(compute(["10", "-", "3"])).toBe(7);
  });

  it("should handle basic multiplication", () => {
    expect(compute(["4", "×", "5"])).toBe(20);
  });

  it("should handle basic division", () => {
    expect(compute(["15", "÷", "3"])).toBe(5);
  });

  it("should handle complex expressions", () => {
    expect(compute(["2", "+", "3", "×", "4"])).toBe(14);
  });

  it("should handle division by zero", () => {
    expect(compute(["5", "÷", "0"])).toBe(Infinity);
  });

  it("should handle zero divided by zero", () => {
    expect(compute(["0", "÷", "0"])).toBe(NaN);
  });

  it("should handle percentages", () => {
    expect(compute(["50%"])).toBe(0.5);
  });

  it("should handle negative numbers", () => {
    expect(compute(["(-5)", "+", "3"])).toBe(-2);
  });

  it("should handle empty input", () => {
    expect(compute([])).toBe(0);
  });

  it("should handle single number", () => {
    expect(compute(["42"])).toBe(42);
  });

  it("should handle trailing operators", () => {
    expect(compute(["5", "+"])).toBe(5);
  });

  it("should handle leading operators", () => {
    expect(compute(["+", "5"])).toBe(5);
  });

  // Overflow/Underflow Tests
  describe("Overflow/Underflow handling", () => {
    it("should handle Number.MAX_VALUE overflow", () => {
      const maxValue = Number.MAX_VALUE.toString();
      expect(compute([maxValue, "+", maxValue])).toBe(Infinity);
    });

    it("should handle Number.MAX_VALUE multiplication", () => {
      const maxValue = Number.MAX_VALUE.toString();
      expect(compute([maxValue, "×", "2"])).toBe(Infinity);
    });

    it("should handle Number.MIN_VALUE underflow", () => {
      const minValue = Number.MIN_VALUE.toString();
      expect(compute([minValue, "÷", "2"])).toBe(0);
    });

    it("should handle very large numbers", () => {
      const largeNumber = "1e308";
      expect(compute([largeNumber, "×", "2"])).toBe(Infinity);
    });

    it("should handle very small numbers", () => {
      const smallNumber = "1e-324";
      expect(compute([smallNumber, "÷", "2"])).toBe(0);
    });

    it("should handle overflow in addition chain", () => {
      const maxValue = Number.MAX_VALUE.toString();
      expect(compute([maxValue, "+", maxValue])).toBe(Infinity);
    });

    it("should handle overflow in multiplication chain", () => {
      const largeNumber = "1e200";
      expect(compute([largeNumber, "×", largeNumber])).toBe(Infinity);
    });

    it("should handle underflow in division chain", () => {
      const smallNumber = "1e-200";
      expect(compute([smallNumber, "÷", "1e100"])).toBe(0);
    });

    it("should handle negative overflow", () => {
      const maxValue = Number.MAX_VALUE.toString();
      expect(compute([`(-${maxValue})`, "×", "2"])).toBe(-Infinity);
    });

    it("should handle negative underflow", () => {
      const minValue = Number.MIN_VALUE.toString();
      expect(compute([`(-${minValue})`, "÷", "2"])).toBe(0);
    });

    it("should handle overflow with percentages", () => {
      const maxValue = Number.MAX_VALUE.toString();
      expect(compute([`${maxValue}%`])).toBe(Infinity);
    });

    it("should handle underflow with percentages", () => {
      const minValue = Number.MIN_VALUE.toString();
      expect(compute([`${minValue}%`])).toBe(0);
    });

    it("should handle complex overflow scenarios", () => {
      const largeNumber = "1e200";
      expect(compute([largeNumber, "+", largeNumber, "×", largeNumber])).toBe(
        Infinity
      );
    });

    it("should handle complex underflow scenarios", () => {
      const smallNumber = "1e-200";
      expect(compute([smallNumber, "÷", smallNumber, "÷", "1e100"])).toBe(0);
    });

    it("should handle overflow in scientific notation", () => {
      expect(compute(["1e308", "+", "1e308"])).toBe(2 * 1e308);
    });

    it("should handle underflow in scientific notation", () => {
      expect(compute(["1e-324", "÷", "1e100"])).toBe(0);
    });

    it("should handle overflow with negative numbers", () => {
      const maxValue = Number.MAX_VALUE.toString();
      expect(compute([`(-${maxValue})`, "×", "2"])).toBe(-Infinity);
    });

    it("should handle underflow with negative numbers", () => {
      const minValue = Number.MIN_VALUE.toString();
      expect(compute([`(-${minValue})`, "÷", "1e100"])).toBe(0);
    });

    it("should handle overflow in mixed operations", () => {
      const largeNumber = "1e200";
      expect(compute([largeNumber, "+", "5", "×", largeNumber])).toBe(
        5.999999999999999e200
      );
    });

    it("should handle underflow in mixed operations", () => {
      const smallNumber = "1e-200";
      expect(compute([smallNumber, "+", "5", "÷", "1e100"])).toBe(0);
    });

    it("should handle edge case: Number.MAX_SAFE_INTEGER", () => {
      const maxSafe = Number.MAX_SAFE_INTEGER.toString();
      expect(compute([maxSafe, "+", "1"])).toBe(Number.MAX_SAFE_INTEGER + 1);
    });

    it("should handle edge case: Number.MIN_SAFE_INTEGER", () => {
      const minSafe = Number.MIN_SAFE_INTEGER.toString();
      expect(compute([minSafe, "-", "1"])).toBe(Number.MIN_SAFE_INTEGER - 1);
    });

    it("should handle overflow beyond MAX_SAFE_INTEGER", () => {
      const beyondSafe = "9007199254740992"; // MAX_SAFE_INTEGER + 1
      expect(compute([beyondSafe, "+", beyondSafe])).toBe(18014398509481984);
    });

    it("should handle very large but finite calculations", () => {
      const largeButFinite = "1e100";
      expect(compute([largeButFinite, "×", "2"])).toBe(2e100);
    });

    it("should handle very small but finite calculations", () => {
      const smallButFinite = "1e-100";
      expect(compute([smallButFinite, "÷", "2"])).toBe(0);
    });
  });
});
