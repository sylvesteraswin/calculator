import { describe, it, expect } from "vitest";
import { handleEqualsOperation } from "./equals-operation";

describe("Equals Operation", () => {
  describe("Basic calculations", () => {
    it("should calculate simple addition", () => {
      const result = handleEqualsOperation(["5", "+", "3"]);
      expect(result).toEqual({
        newValue: ["8"],
        newLastOperation: "5+3",
      });
    });

    it("should calculate simple subtraction", () => {
      const result = handleEqualsOperation(["5", "-", "3"]);
      expect(result).toEqual({
        newValue: ["2"],
        newLastOperation: "5-3",
      });
    });

    it("should calculate simple multiplication", () => {
      const result = handleEqualsOperation(["5", "×", "3"]);
      expect(result).toEqual({
        newValue: ["15"],
        newLastOperation: "5×3",
      });
    });

    it("should calculate simple division", () => {
      const result = handleEqualsOperation(["6", "÷", "2"]);
      expect(result).toEqual({
        newValue: ["3"],
        newLastOperation: "6÷2",
      });
    });
  });

  describe("Complex calculations", () => {
    it("should calculate multi-step expression", () => {
      const result = handleEqualsOperation(["5", "+", "3", "×", "2"]);
      expect(result).toEqual({
        newValue: ["11"],
        newLastOperation: "5+3×2",
      });
    });

    it("should handle negative numbers", () => {
      const result = handleEqualsOperation(["5", "+", "(-3)"]);
      expect(result).toEqual({
        newValue: ["2"],
        newLastOperation: "5+(-3)",
      });
    });

    it("should handle decimals", () => {
      const result = handleEqualsOperation(["5.5", "+", "3.3"]);
      expect(result).toEqual({
        newValue: ["8.8"],
        newLastOperation: "5.5+3.3",
      });
    });
  });

  describe("Handling trailing operators", () => {
    it("should remove trailing operator", () => {
      const result = handleEqualsOperation(["5", "+", "3", "+"]);
      expect(result).toEqual({
        newValue: ["8"],
        newLastOperation: "5+3",
      });
    });

    it("should handle multiple trailing operators", () => {
      const result = handleEqualsOperation(["5", "+", "3", "×", "2", "÷"]);
      expect(result).toEqual({
        newValue: ["11"],
        newLastOperation: "5+3×2",
      });
    });
  });

  describe("Error handling", () => {
    it("should handle division by zero", () => {
      const result = handleEqualsOperation(["5", "÷", "0"]);
      expect(result).toEqual({
        newValue: ["Error"],
        newLastOperation: null,
      });
    });

    it("should handle empty expression", () => {
      const result = handleEqualsOperation([""]);
      expect(result).toEqual({
        newValue: [""],
        newLastOperation: null,
      });
    });

    it("should handle invalid expression with only operators", () => {
      const result = handleEqualsOperation(["+", "-"]);
      expect(result).toEqual({
        newValue: [""],
        newLastOperation: null,
      });
    });

    it("should handle expression with only one number", () => {
      const result = handleEqualsOperation(["5"]);
      expect(result).toEqual({
        newValue: ["5"],
        newLastOperation: "5",
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle very large numbers", () => {
      const result = handleEqualsOperation(["999999", "+", "1"]);
      expect(result).toEqual({
        newValue: ["1000000"],
        newLastOperation: "999999+1",
      });
    });

    it("should handle percentage calculations", () => {
      const result = handleEqualsOperation(["50", "%"]);
      expect(result).toEqual({
        newValue: ["50"],
        newLastOperation: "50%",
      });
    });

    it("should handle complex percentage expression", () => {
      const result = handleEqualsOperation(["100", "+", "50", "%"]);
      expect(result).toEqual({
        newValue: ["150"],
        newLastOperation: "100+50%",
      });
    });
  });

  describe("Result formatting", () => {
    it("should format large numbers with commas", () => {
      const result = handleEqualsOperation(["1000", "+", "2000"]);
      expect(result).toEqual({
        newValue: ["3000"],
        newLastOperation: "1000+2000",
      });
    });

    it("should handle decimal precision", () => {
      const result = handleEqualsOperation(["1", "÷", "3"]);
      expect(result.newValue[0]).toMatch(/^0\.333/);
      expect(result.newLastOperation).toBe("1÷3");
    });
  });
});
