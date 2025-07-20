import { describe, it, expect } from "vitest";
import { handleOperatorInput } from "./operator-input";

describe("Operator Input Operation", () => {
  describe("Adding operators after numbers", () => {
    it("should add operator after single number", () => {
      const result = handleOperatorInput(["5"], "+");
      expect(result).toEqual(["5", "+"]);
    });

    it("should add operator after multi-digit number", () => {
      const result = handleOperatorInput(["50"], "-");
      expect(result).toEqual(["50", "-"]);
    });

    it("should add operator after decimal number", () => {
      const result = handleOperatorInput(["5.5"], "×");
      expect(result).toEqual(["5.5", "×"]);
    });

    it("should add operator after negative number", () => {
      const result = handleOperatorInput(["(-5)"], "÷");
      expect(result).toEqual(["(-5)", "÷"]);
    });
  });

  describe("Replacing existing operators", () => {
    it("should replace existing operator", () => {
      const result = handleOperatorInput(["5", "+"], "-");
      expect(result).toEqual(["5", "-"]);
    });

    it("should replace operator in complex expression", () => {
      const result = handleOperatorInput(["5", "+", "3", "×"], "÷");
      expect(result).toEqual(["5", "+", "3", "÷"]);
    });

    it("should replace multiple operators", () => {
      const result = handleOperatorInput(["5", "+", "×"], "-");
      expect(result).toEqual(["5", "+", "-"]);
    });
  });

  describe("Handling leading operators", () => {
    it("should add 0 before leading operator", () => {
      const result = handleOperatorInput([""], "+");
      expect(result).toEqual(["0", "+"]);
    });

    it("should add 0 before leading operator in single element", () => {
      const result = handleOperatorInput([""], "-");
      expect(result).toEqual(["0", "-"]);
    });
  });

  describe("Complex expressions", () => {
    it("should add operator to complex expression", () => {
      const result = handleOperatorInput(["5", "+", "3"], "×");
      expect(result).toEqual(["5", "+", "3", "×"]);
    });

    it("should replace operator in complex expression", () => {
      const result = handleOperatorInput(["5", "+", "3", "×"], "÷");
      expect(result).toEqual(["5", "+", "3", "÷"]);
    });

    it("should handle multiple operators in sequence", () => {
      let result = handleOperatorInput(["5"], "+");
      expect(result).toEqual(["5", "+"]);

      result = handleOperatorInput(result, "×");
      expect(result).toEqual(["5", "×"]);

      result = handleOperatorInput(result, "-");
      expect(result).toEqual(["5", "-"]);
    });
  });

  describe("All operator types", () => {
    it("should handle addition operator", () => {
      const result = handleOperatorInput(["5"], "+");
      expect(result).toEqual(["5", "+"]);
    });

    it("should handle subtraction operator", () => {
      const result = handleOperatorInput(["5"], "-");
      expect(result).toEqual(["5", "-"]);
    });

    it("should handle multiplication operator", () => {
      const result = handleOperatorInput(["5"], "×");
      expect(result).toEqual(["5", "×"]);
    });

    it("should handle division operator", () => {
      const result = handleOperatorInput(["5"], "÷");
      expect(result).toEqual(["5", "÷"]);
    });
  });

  describe("Edge cases", () => {
    it("should handle single element array", () => {
      const result = handleOperatorInput(["5"], "+");
      expect(result).toEqual(["5", "+"]);
    });

    it("should handle very large numbers", () => {
      const result = handleOperatorInput(["999999999"], "+");
      expect(result).toEqual(["999999999", "+"]);
    });

    it("should handle percentage numbers", () => {
      const result = handleOperatorInput(["50%"], "+");
      expect(result).toEqual(["50%", "+"]);
    });

    it("should handle negative numbers with parentheses", () => {
      const result = handleOperatorInput(["(-5)"], "+");
      expect(result).toEqual(["(-5)", "+"]);
    });
  });

  describe("Operator replacement behavior", () => {
    it("should replace operator when last value is operator", () => {
      const result = handleOperatorInput(["5", "+"], "-");
      expect(result).toEqual(["5", "-"]);
    });

    it("should add operator when last value is number", () => {
      const result = handleOperatorInput(["5"], "+");
      expect(result).toEqual(["5", "+"]);
    });

    it("should handle empty value with leading operator", () => {
      const result = handleOperatorInput([""], "+");
      expect(result).toEqual(["0", "+"]);
    });
  });
});
