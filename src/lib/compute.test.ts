import { describe, it, expect } from "vitest";
import { compute } from "./compute";

describe("compute", () => {
  it("should handle basic addition", () => {
    expect(compute(["", "5", "+", "3"])).toBe(8);
  });

  it("should handle basic subtraction", () => {
    expect(compute(["", "10", "-", "3"])).toBe(7);
  });

  it("should handle multiplication", () => {
    expect(compute(["", "5", "×", "3"])).toBe(15);
  });

  it("should handle division", () => {
    expect(compute(["", "15", "÷", "3"])).toBe(5);
  });

  it("should handle decimal division", () => {
    expect(compute(["", "36", "÷", "25"])).toBe(1.44);
  });

  it("should handle percentages", () => {
    // 50% should convert to 0.5 (50/100)
    expect(compute(["", "50%"])).toBe(0.5);
    // 100 + 25% should be 100 + 0.25 = 100.25
    expect(compute(["", "100", "+", "25%"])).toBe(100.25);
    // 200 × 50% should be 200 × 0.5 = 100
    expect(compute(["", "200", "×", "50%"])).toBe(100);
  });

  it("should handle negative numbers with parentheses", () => {
    expect(compute(["", "(-5)", "+", "10"])).toBe(5);
    expect(compute(["", "(-10)", "×", "2"])).toBe(-20);
  });

  it("should handle order of operations", () => {
    expect(compute(["", "2", "+", "3", "×", "4"])).toBe(14); // 2 + (3 × 4) = 14
    expect(compute(["", "10", "-", "2", "÷", "2"])).toBe(9); // 10 - (2 ÷ 2) = 9
  });

  it("should handle division by zero", () => {
    expect(compute(["", "5", "÷", "0"])).toBe(Infinity);
  });

  it("should handle empty input", () => {
    expect(compute([])).toBe(0);
    expect(compute([""])).toBe(0);
  });

  it("should handle invalid expressions", () => {
    expect(compute(["", "+"])).toBe(0);
    expect(compute(["", "×"])).toBe(0);
  });

  it("should handle floating point precision", () => {
    expect(compute(["", "0.1", "+", "0.2"])).toBe(0.3);
    expect(compute(["", "1", "÷", "3"])).toBe(0.333333);
  });

  it("should handle large numbers", () => {
    expect(compute(["", "1000000", "+", "2000000"])).toBe(3000000);
  });

  it("should handle operator replacement", () => {
    // This tests the logic that replaces consecutive operators
    expect(compute(["", "5", "+", "-", "3"])).toBe(2);
  });
});
