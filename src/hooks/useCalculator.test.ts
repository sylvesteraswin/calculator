import { describe, it, expect } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useCalculator } from "./useCalculator";

describe("useCalculator", () => {
  it("should initialize with empty value", () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.displayValue).toBe("0");
    expect(result.current.value).toEqual([""]);
  });

  it("should handle number input", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.displayValue).toBe("5");
    expect(result.current.value).toEqual(["", "5"]);
  });

  it("should handle decimal input", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "." } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.displayValue).toBe("5.");
  });

  it("should handle operator input", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "+" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.value).toEqual(["", "5", "+"]);
  });

  it("should handle DEL for single number", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "DEL" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.displayValue).toBe("0");
    expect(result.current.value).toEqual([""]);
  });

  it("should handle DEL for multi-digit number", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "2" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "DEL" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.displayValue).toBe("5");
    expect(result.current.value).toEqual(["", "5"]);
  });

  it("should handle DEL for operator", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "+" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "DEL" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.displayValue).toBe("5");
    expect(result.current.value).toEqual(["", "5"]);
  });

  it("should handle DEL for decimal number", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "." } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "2" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "DEL" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.displayValue).toBe("5.");
    expect(result.current.value).toEqual(["", "5."]);
  });

  it("should handle DEL for percentage", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "%" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "DEL" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.displayValue).toBe("5");
    expect(result.current.value).toEqual(["", "5"]);
  });

  it("should handle DEL for negative number", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "±" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "DEL" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.displayValue).toBe("5");
    expect(result.current.value).toEqual(["", "5"]);
  });

  it("should handle DEL when empty", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "DEL" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.displayValue).toBe("0");
    expect(result.current.value).toEqual([""]);
  });

  it("should handle DEL for complex expression", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      // Build: 5 + 3
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "+" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "3" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      // Delete the 3
      result.current.handleButtonClick({
        target: { dataset: { value: "DEL" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.displayValue).toBe("5+");
    expect(result.current.value).toEqual(["", "5", "+"]);
  });

  it("should handle clear (AC)", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "AC" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.displayValue).toBe("0");
    expect(result.current.value).toEqual([""]);
  });

  it("should handle inverted (±) for positive number", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "±" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.value).toEqual(["", "(-5)"]);
  });

  it("should handle inverted (±) for negative number", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "±" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "±" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(result.current.value).toEqual(["", "5"]);
  });

  it("should handle inverted (±) for direct negative input", () => {
    const { result } = renderHook(() => useCalculator());

    // Simulate having a negative number directly (like from a previous calculation)
    // Set the state to have a negative number
    act(() => {
      // First create a positive number
      result.current.handleButtonClick({
        target: { dataset: { value: "106" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      // Then make it negative
      result.current.handleButtonClick({
        target: { dataset: { value: "±" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      // Then make it positive again
      result.current.handleButtonClick({
        target: { dataset: { value: "±" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    // Should be back to positive 106
    expect(result.current.value).toEqual(["", "106"]);
  });

  it("should handle inverted (±) for operators (should do nothing)", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick({
        target: { dataset: { value: "5" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "+" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      result.current.handleButtonClick({
        target: { dataset: { value: "±" } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    // Should remain unchanged since ± was clicked on an operator
    expect(result.current.value).toEqual(["", "5", "+"]);
  });

  describe("lastOperation logic", () => {
    it("should initialize with null lastOperation", () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.lastOperation).toBe(null);
    });

    it("should update lastOperation only when equals is pressed", async () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        // Build expression: 5 + 3
        result.current.handleButtonClick({
          target: { dataset: { value: "5" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "+" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "3" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      });

      // lastOperation should still be null before equals
      expect(result.current.lastOperation).toBe(null);

      act(() => {
        // Press equals
        result.current.handleButtonClick({
          target: { dataset: { value: "=" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      });

      // Wait for lastOperation to be updated
      await waitFor(() => {
        expect(result.current.lastOperation).toBe("5+3");
      });
    });

    it("should reset lastOperation when any button other than equals is pressed", async () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        // Build and calculate: 5 + 3 = 8
        result.current.handleButtonClick({
          target: { dataset: { value: "5" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "+" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "3" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "=" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      });

      // Wait for lastOperation to be set
      await waitFor(() => {
        expect(result.current.lastOperation).toBe("5+3");
      });

      act(() => {
        // Press any other button (number)
        result.current.handleButtonClick({
          target: { dataset: { value: "2" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      });

      // lastOperation should be reset
      expect(result.current.lastOperation).toBe(null);
    });

    it("should reset lastOperation when operator is pressed after equals", async () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        // Build and calculate: 5 + 3 = 8
        result.current.handleButtonClick({
          target: { dataset: { value: "5" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "+" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "3" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "=" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      });

      // Wait for lastOperation to be set
      await waitFor(() => {
        expect(result.current.lastOperation).toBe("5+3");
      });

      act(() => {
        // Press operator
        result.current.handleButtonClick({
          target: { dataset: { value: "+" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      });

      // lastOperation should be reset
      expect(result.current.lastOperation).toBe(null);
    });

    it("should reset lastOperation when clear (AC) is pressed", async () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        // Build and calculate: 5 + 3 = 8
        result.current.handleButtonClick({
          target: { dataset: { value: "5" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "+" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "3" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "=" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      });

      // Wait for lastOperation to be set
      await waitFor(() => {
        expect(result.current.lastOperation).toBe("5+3");
      });

      act(() => {
        // Press AC
        result.current.handleButtonClick({
          target: { dataset: { value: "AC" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      });

      // lastOperation should be reset
      expect(result.current.lastOperation).toBe(null);
    });

    it("should handle complex expression in lastOperation", async () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        // Build complex expression: 5 + 3 × 2
        result.current.handleButtonClick({
          target: { dataset: { value: "5" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "+" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "3" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "×" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "2" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "=" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      });

      // Wait for lastOperation to show the full expression
      await waitFor(() => {
        expect(result.current.lastOperation).toBe("5+3×2");
      });
    });

    it("should handle negative numbers in lastOperation", async () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        // Build expression with negative number: 5 + (-3)
        result.current.handleButtonClick({
          target: { dataset: { value: "5" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "+" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "3" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "±" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        result.current.handleButtonClick({
          target: { dataset: { value: "=" } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      });

      // Wait for lastOperation to show the expression with parentheses
      await waitFor(() => {
        expect(result.current.lastOperation).toBe("5+(-3)");
      });
    });
  });
});
