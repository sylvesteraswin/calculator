import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useKeyboardNavigation } from "./useKeyboardNavigation";

describe("useKeyboardNavigation", () => {
  let mockOnButtonClick: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnButtonClick = vi.fn();
    renderHook(() =>
      useKeyboardNavigation({ onButtonClick: mockOnButtonClick })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const createKeyboardEvent = (
    key: string,
    options: {
      ctrlKey?: boolean;
      shiftKey?: boolean;
      metaKey?: boolean;
      altKey?: boolean;
    } = {}
  ) => {
    return new KeyboardEvent("keydown", {
      key,
      ctrlKey: options.ctrlKey || false,
      shiftKey: options.shiftKey || false,
      metaKey: options.metaKey || false,
      altKey: options.altKey || false,
    });
  };

  const simulateKeyPress = (key: string, options = {}) => {
    const event = createKeyboardEvent(key, options);
    document.dispatchEvent(event);
  };

  describe("Number keys", () => {
    it("should handle number keys 0-9", () => {
      const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

      numbers.forEach((number) => {
        simulateKeyPress(number);
        expect(mockOnButtonClick).toHaveBeenCalledWith(number);
        mockOnButtonClick.mockClear();
      });
    });
  });

  describe("Operator keys", () => {
    it("should handle addition operator", () => {
      simulateKeyPress("+");
      expect(mockOnButtonClick).toHaveBeenCalledWith("+");
    });

    it("should handle subtraction operator", () => {
      simulateKeyPress("-");
      expect(mockOnButtonClick).toHaveBeenCalledWith("-");
    });

    it("should handle subtraction operator without Shift", () => {
      simulateKeyPress("-");
      expect(mockOnButtonClick).toHaveBeenCalledWith("-");
    });

    it("should handle multiplication operator", () => {
      simulateKeyPress("*");
      expect(mockOnButtonClick).toHaveBeenCalledWith("×");
    });

    it("should handle division operator", () => {
      simulateKeyPress("/");
      expect(mockOnButtonClick).toHaveBeenCalledWith("÷");
    });

    it("should handle division operator without Shift", () => {
      simulateKeyPress("/");
      expect(mockOnButtonClick).toHaveBeenCalledWith("÷");
    });
  });

  describe("Special keys", () => {
    it("should handle decimal point", () => {
      simulateKeyPress(".");
      expect(mockOnButtonClick).toHaveBeenCalledWith(".");
    });

    it("should handle Enter key for equals", () => {
      simulateKeyPress("Enter");
      expect(mockOnButtonClick).toHaveBeenCalledWith("=");
    });

    it("should handle Escape key for clear", () => {
      simulateKeyPress("Escape");
      expect(mockOnButtonClick).toHaveBeenCalledWith("AC");
    });

    it("should handle percentage key", () => {
      simulateKeyPress("%");
      expect(mockOnButtonClick).toHaveBeenCalledWith("%");
    });

    it("should handle Backspace key for delete", () => {
      simulateKeyPress("Backspace");
      expect(mockOnButtonClick).toHaveBeenCalledWith("DEL");
    });
  });

  describe("Alternative keys", () => {
    it("should handle P key for positive/negative toggle", () => {
      simulateKeyPress("p");
      expect(mockOnButtonClick).toHaveBeenCalledWith("±");
    });

    it("should handle uppercase P key for positive/negative toggle", () => {
      simulateKeyPress("P");
      expect(mockOnButtonClick).toHaveBeenCalledWith("±");
    });
  });

  describe("Modifier key handling", () => {
    it("should ignore Ctrl + key combinations", () => {
      simulateKeyPress("5", { ctrlKey: true });
      expect(mockOnButtonClick).not.toHaveBeenCalled();
    });

    it("should allow Shift + operator keys", () => {
      simulateKeyPress("+", { shiftKey: true });
      expect(mockOnButtonClick).toHaveBeenCalledWith("+");
    });

    it("should allow Shift + multiplication key", () => {
      simulateKeyPress("*", { shiftKey: true });
      expect(mockOnButtonClick).toHaveBeenCalledWith("×");
    });

    it("should ignore Shift + non-operator keys", () => {
      simulateKeyPress("5", { shiftKey: true });
      expect(mockOnButtonClick).not.toHaveBeenCalled();
    });

    it("should ignore Meta (Command) + key combinations", () => {
      simulateKeyPress("1", { metaKey: true });
      expect(mockOnButtonClick).not.toHaveBeenCalled();
    });

    it("should ignore Alt + key combinations", () => {
      simulateKeyPress("2", { altKey: true });
      expect(mockOnButtonClick).not.toHaveBeenCalled();
    });

    it("should ignore multiple modifier keys", () => {
      simulateKeyPress("3", { ctrlKey: true, shiftKey: true });
      expect(mockOnButtonClick).not.toHaveBeenCalled();
    });

    it("should ignore Ctrl + Shift + key combinations", () => {
      simulateKeyPress("Enter", { ctrlKey: true, shiftKey: true });
      expect(mockOnButtonClick).not.toHaveBeenCalled();
    });
  });

  describe("Non-calculator keys", () => {
    it("should not handle non-calculator keys", () => {
      const nonCalculatorKeys = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
      ];

      nonCalculatorKeys.forEach((key) => {
        simulateKeyPress(key);
        expect(mockOnButtonClick).not.toHaveBeenCalled();
        mockOnButtonClick.mockClear();
      });
    });

    it("should not handle function keys", () => {
      const functionKeys = [
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "F11",
        "F12",
      ];

      functionKeys.forEach((key) => {
        simulateKeyPress(key);
        expect(mockOnButtonClick).not.toHaveBeenCalled();
        mockOnButtonClick.mockClear();
      });
    });

    it("should not handle arrow keys", () => {
      const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

      arrowKeys.forEach((key) => {
        simulateKeyPress(key);
        expect(mockOnButtonClick).not.toHaveBeenCalled();
        mockOnButtonClick.mockClear();
      });
    });

    it("should not handle other special keys", () => {
      const otherKeys = [
        "Tab",
        "CapsLock",
        "Space",
        "Insert",
        "Delete",
        "Home",
        "End",
        "PageUp",
        "PageDown",
      ];

      otherKeys.forEach((key) => {
        simulateKeyPress(key);
        expect(mockOnButtonClick).not.toHaveBeenCalled();
        mockOnButtonClick.mockClear();
      });
    });
  });

  describe("Event prevention", () => {
    it("should prevent default behavior for calculator keys", () => {
      const calculatorKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
        "+",
        "-",
        "*",
        "/",
        "Enter",
        "Escape",
      ];

      calculatorKeys.forEach((key) => {
        const event = createKeyboardEvent(key);
        const preventDefaultSpy = vi.spyOn(event, "preventDefault");

        document.dispatchEvent(event);

        expect(preventDefaultSpy).toHaveBeenCalled();
        preventDefaultSpy.mockRestore();
      });
    });

    it("should not prevent default behavior for non-calculator keys", () => {
      const nonCalculatorKeys = ["a", "b", "c", "Tab", "F1"];

      nonCalculatorKeys.forEach((key) => {
        const event = createKeyboardEvent(key);
        const preventDefaultSpy = vi.spyOn(event, "preventDefault");

        document.dispatchEvent(event);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
        preventDefaultSpy.mockRestore();
      });
    });
  });

  describe("Hook lifecycle", () => {
    it("should add event listener on mount", () => {
      const addEventListenerSpy = vi.spyOn(document, "addEventListener");

      renderHook(() =>
        useKeyboardNavigation({ onButtonClick: mockOnButtonClick })
      );

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function)
      );
      addEventListenerSpy.mockRestore();
    });

    it("should remove event listener on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const { unmount } = renderHook(() =>
        useKeyboardNavigation({ onButtonClick: mockOnButtonClick })
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function)
      );
      removeEventListenerSpy.mockRestore();
    });
  });

  describe("Callback updates", () => {
    it("should use updated callback when onButtonClick changes", () => {
      const firstCallback = vi.fn();
      const secondCallback = vi.fn();

      const { rerender } = renderHook(
        ({ callback }) => useKeyboardNavigation({ onButtonClick: callback }),
        { initialProps: { callback: firstCallback } }
      );

      simulateKeyPress("5");
      expect(firstCallback).toHaveBeenCalledWith("5");

      rerender({ callback: secondCallback });
      simulateKeyPress("3");

      expect(secondCallback).toHaveBeenCalledWith("3");
      expect(firstCallback).toHaveBeenCalledTimes(1); // Should not be called again
    });
  });

  describe("Edge cases", () => {
    it("should handle empty key events", () => {
      const event = new KeyboardEvent("keydown", { key: "" });
      document.dispatchEvent(event);
      expect(mockOnButtonClick).not.toHaveBeenCalled();
    });

    it("should handle undefined key events", () => {
      const event = new KeyboardEvent("keydown", {
        key: undefined as unknown as string,
      });
      document.dispatchEvent(event);
      expect(mockOnButtonClick).not.toHaveBeenCalled();
    });

    it("should handle multiple rapid key presses", () => {
      simulateKeyPress("1");
      simulateKeyPress("2");
      simulateKeyPress("3");

      expect(mockOnButtonClick).toHaveBeenCalledTimes(3);
      expect(mockOnButtonClick).toHaveBeenNthCalledWith(1, "1");
      expect(mockOnButtonClick).toHaveBeenNthCalledWith(2, "2");
      expect(mockOnButtonClick).toHaveBeenNthCalledWith(3, "3");
    });
  });
});
