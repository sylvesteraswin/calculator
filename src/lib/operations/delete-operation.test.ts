import { describe, it, expect } from "vitest";
import { handleDeleteOperation } from "./delete-operation";

describe("Delete Operation", () => {
  describe("Deleting from numbers", () => {
    it("should delete last character from single digit", () => {
      const result = handleDeleteOperation(["5"]);
      expect(result).toEqual([""]);
    });

    it("should delete last character from multi-digit number", () => {
      const result = handleDeleteOperation(["50"]);
      expect(result).toEqual(["5"]);
    });

    it("should delete last character from large number", () => {
      const result = handleDeleteOperation(["12345"]);
      expect(result).toEqual(["1234"]);
    });

    it("should delete last character from decimal", () => {
      const result = handleDeleteOperation(["5.5"]);
      expect(result).toEqual(["5."]);
    });
  });

  describe("Deleting operators", () => {
    it("should remove entire operator", () => {
      const result = handleDeleteOperation(["5", "+"]);
      expect(result).toEqual(["5"]);
    });

    it("should remove operator from complex expression", () => {
      const result = handleDeleteOperation(["5", "+", "3", "×"]);
      expect(result).toEqual(["5", "+", "3"]);
    });

    it("should remove multiple operators", () => {
      const result = handleDeleteOperation(["5", "+", "×"]);
      expect(result).toEqual(["5", "+"]);
    });
  });

  describe("Handling negative numbers", () => {
    it("should delete from negative number with parentheses", () => {
      const result = handleDeleteOperation(["(-5)"]);
      expect(result).toEqual(["5"]);
    });

    it("should convert incomplete negative back to positive", () => {
      const result = handleDeleteOperation(["(-"]);
      expect(result).toEqual(["("]);
    });

    it("should handle negative decimal", () => {
      const result = handleDeleteOperation(["(-5.5)"]);
      expect(result).toEqual(["5.5"]);
    });
  });

  describe("Complex expressions", () => {
    it("should delete from last number in expression", () => {
      const result = handleDeleteOperation(["5", "+", "30"]);
      expect(result).toEqual(["5", "+", "3"]);
    });

    it("should delete operator from expression", () => {
      const result = handleDeleteOperation(["5", "+", "3", "×"]);
      expect(result).toEqual(["5", "+", "3"]);
    });

    it("should delete from percentage number", () => {
      const result = handleDeleteOperation(["5", "+", "30%"]);
      expect(result).toEqual(["5", "+", "30"]);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty array", () => {
      const result = handleDeleteOperation([]);
      expect(result).toEqual([]);
    });

    it("should reset to empty when nothing left", () => {
      const result = handleDeleteOperation([""]);
      expect(result).toEqual([""]);
    });

    it("should handle single character", () => {
      const result = handleDeleteOperation(["5"]);
      expect(result).toEqual([""]);
    });

    it("should handle very large numbers", () => {
      const result = handleDeleteOperation(["999999999"]);
      expect(result).toEqual(["99999999"]);
    });
  });

  describe("Reset behavior", () => {
    it("should reset to empty state when no values left", () => {
      const result = handleDeleteOperation(["5"]);
      expect(result).toEqual([""]);
    });

    it("should handle multiple deletions", () => {
      let result = handleDeleteOperation(["123"]);
      expect(result).toEqual(["12"]);

      result = handleDeleteOperation(result);
      expect(result).toEqual(["1"]);

      result = handleDeleteOperation(result);
      expect(result).toEqual([""]);
    });
  });
});
