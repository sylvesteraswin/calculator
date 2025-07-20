import { describe, it, expect } from "vitest";
import { handleNumberInput } from "./number-input";

describe("Number Input Operation", () => {
  describe("Basic number input", () => {
    it("should add digit to empty state", () => {
      const result = handleNumberInput([""], "5");
      expect(result).toEqual(["", "5"]);
    });

    it("should append digit to existing number", () => {
      const result = handleNumberInput(["", "5"], "3");
      expect(result).toEqual(["", "53"]);
    });

    it("should create multi-digit numbers", () => {
      const result = handleNumberInput(["", "12"], "7");
      expect(result).toEqual(["", "127"]);
    });
  });

  describe("Decimal number handling", () => {
    it("should append digit after decimal point", () => {
      const result = handleNumberInput(["", "5."], "2");
      expect(result).toEqual(["", "5.2"]);
    });

    it("should continue building decimal numbers", () => {
      const result = handleNumberInput(["", "5.2"], "7");
      expect(result).toEqual(["", "5.27"]);
    });
  });

  describe("Operator separation", () => {
    it("should create new element after addition operator", () => {
      const result = handleNumberInput(["", "5", "+"], "3");
      expect(result).toEqual(["", "5", "+", "3"]);
    });

    it("should create new element after subtraction operator", () => {
      const result = handleNumberInput(["", "5", "-"], "3");
      expect(result).toEqual(["", "5", "-", "3"]);
    });

    it("should create new element after multiplication operator", () => {
      const result = handleNumberInput(["", "5", "×"], "3");
      expect(result).toEqual(["", "5", "×", "3"]);
    });

    it("should create new element after division operator", () => {
      const result = handleNumberInput(["", "5", "÷"], "3");
      expect(result).toEqual(["", "5", "÷", "3"]);
    });
  });

  describe("Length limits", () => {
    it("should enforce 15-digit limit", () => {
      const longNumber = "123456789012345"; // 15 digits
      const result = handleNumberInput(["", longNumber], "6");
      expect(result).toEqual(["", longNumber]); // Unchanged
    });

    it("should allow numbers up to 15 digits", () => {
      const longNumber = "12345678901234"; // 14 digits
      const result = handleNumberInput(["", longNumber], "5");
      expect(result).toEqual(["", longNumber + "5"]);
    });
  });

  describe("Complex expressions", () => {
    it("should handle numbers in complex expressions", () => {
      const result = handleNumberInput(["", "5", "+", "3", "×"], "2");
      expect(result).toEqual(["", "5", "+", "3", "×", "2"]);
    });

    it("should append to last number in expression", () => {
      const result = handleNumberInput(["", "5", "+", "3"], "7");
      expect(result).toEqual(["", "5", "+", "37"]);
    });
  });

  describe("Edge cases", () => {
    it("should handle single element array", () => {
      const result = handleNumberInput([""], "9");
      expect(result).toEqual(["", "9"]);
    });

    it("should handle negative numbers", () => {
      const result = handleNumberInput(["", "(-5"], "2");
      expect(result).toEqual(["", "(-52"]);
    });

    it("should handle percentage numbers", () => {
      const result = handleNumberInput(["", "50%"], "0");
      expect(result).toEqual(["", "50%0"]);
    });
  });
});
