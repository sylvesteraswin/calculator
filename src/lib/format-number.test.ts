import { describe, it, expect } from "vitest";
import {
  formatNumberForDisplay,
  formatExpressionForDisplay,
} from "./format-number";

describe("formatNumberForDisplay", () => {
  it("should return regular numbers as strings", () => {
    expect(formatNumberForDisplay(123)).toBe("123");
    expect(formatNumberForDisplay("456")).toBe("456");
    expect(formatNumberForDisplay(0)).toBe("0");
    expect(formatNumberForDisplay(-42)).toBe("-42");
  });

  it("should use scientific notation for very large numbers", () => {
    expect(formatNumberForDisplay(100000000000)).toBe("1.00e+11");
    expect(formatNumberForDisplay("999999999999")).toBe("1.00e+12");
    expect(formatNumberForDisplay(-100000000000)).toBe("-1.00e+11");
  });

  it("should handle numbers at the threshold boundary", () => {
    expect(formatNumberForDisplay(99999999999)).toBe("99999999999");
    expect(formatNumberForDisplay(100000000000)).toBe("1.00e+11");
  });

  it("should preserve existing scientific notation", () => {
    expect(formatNumberForDisplay("1.23e+10")).toBe("1.23e+10");
    expect(formatNumberForDisplay("5.67e-05")).toBe("5.67e-05");
  });

  it("should handle invalid numbers", () => {
    expect(formatNumberForDisplay("abc")).toBe("abc");
    expect(formatNumberForDisplay("")).toBe("");
  });

  it("should handle special values", () => {
    expect(formatNumberForDisplay(Infinity)).toBe("Infinity");
    expect(formatNumberForDisplay(-Infinity)).toBe("-Infinity");
    expect(formatNumberForDisplay(NaN)).toBe("NaN");
  });

  it("should handle decimal numbers", () => {
    expect(formatNumberForDisplay(3.14159)).toBe("3.14159");
    expect(formatNumberForDisplay("2.71828")).toBe("2.71828");
  });

  it("should handle custom threshold", () => {
    expect(formatNumberForDisplay(1000, 100)).toBe("1.00e+3");
    expect(formatNumberForDisplay(50, 100)).toBe("50");
  });
});

describe("formatExpressionForDisplay", () => {
  it("should format simple expressions", () => {
    expect(formatExpressionForDisplay("123+456")).toBe("123+456");
    expect(formatExpressionForDisplay("10×5")).toBe("10×5");
  });

  it("should format expressions with large numbers", () => {
    expect(formatExpressionForDisplay("100000000000+200000000000")).toBe(
      "1.00e+11+2.00e+11"
    );
    expect(formatExpressionForDisplay("999999999999×2")).toBe("1.00e+12×2");
  });

  it("should handle mixed expressions", () => {
    expect(formatExpressionForDisplay("100000000000+50-200000000000")).toBe(
      "1.00e+11+50-2.00e+11"
    );
    expect(formatExpressionForDisplay("10×100000000000÷5")).toBe(
      "10×1.00e+11÷5"
    );
  });

  it("should handle expressions with existing scientific notation", () => {
    expect(formatExpressionForDisplay("1.23e+10+5")).toBe("1.23e+10+5");
    expect(formatExpressionForDisplay("1.00e+11×2")).toBe("1.00e+11×2");
  });

  it("should handle empty expressions", () => {
    expect(formatExpressionForDisplay("")).toBe("");
  });

  it("should handle expressions with only operators", () => {
    expect(formatExpressionForDisplay("+")).toBe("+");
    expect(formatExpressionForDisplay("×÷")).toBe("×÷");
  });

  it("should handle complex expressions", () => {
    expect(
      formatExpressionForDisplay("100000000000+200000000000×300000000000")
    ).toBe("1.00e+11+2.00e+11×3.00e+11");
  });

  it("should handle custom threshold", () => {
    expect(formatExpressionForDisplay("1000+2000", 100)).toBe(
      "1.00e+3+2.00e+3"
    );
    expect(formatExpressionForDisplay("50+100", 100)).toBe("50+100");
  });

  it("should handle negative numbers in expressions", () => {
    expect(formatExpressionForDisplay("-100000000000+200000000000")).toBe(
      "-1.00e+11+2.00e+11"
    );
    expect(formatExpressionForDisplay("100000000000×-2")).toBe("1.00e+11×-2");
  });

  it("should handle decimal numbers in expressions", () => {
    expect(formatExpressionForDisplay("3.14159×100000000000")).toBe(
      "3.14159×1.00e+11"
    );
    expect(formatExpressionForDisplay("100000000000.5+200000000000.7")).toBe(
      "1.00e+11+2.00e+11"
    );
  });
});
