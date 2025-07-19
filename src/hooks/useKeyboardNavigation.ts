import { useEffect } from "react";

interface UseKeyboardNavigationProps {
  onButtonClick: (value: string) => void;
}

export const useKeyboardNavigation = ({
  onButtonClick,
}: UseKeyboardNavigationProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Define operator keys that require Shift
      const shiftOperatorKeys = ["+", "*"];

      // Ignore if modifier keys are pressed, except for Shift + operator keys
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      // Allow Shift + operator keys, but ignore other Shift combinations
      if (event.shiftKey && !shiftOperatorKeys.includes(event.key)) {
        return;
      }

      // Prevent default behavior for calculator keys
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

      if (calculatorKeys.includes(event.key)) {
        event.preventDefault();
      }

      // Map keyboard keys to calculator buttons
      switch (event.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          onButtonClick(event.key);
          break;
        case ".":
          onButtonClick(".");
          break;
        case "+":
          onButtonClick("+");
          break;
        case "-":
          onButtonClick("-");
          break;
        case "*":
          onButtonClick("×");
          break;
        case "/":
          onButtonClick("÷");
          break;
        case "Enter":
          onButtonClick("=");
          break;
        case "Escape":
          onButtonClick("AC");
          break;
        case "%":
          onButtonClick("%");
          break;
        case "p":
        case "P":
          // Toggle positive/negative (alternative to ±)
          onButtonClick("±");
          break;
        case "Backspace":
          // Delete last character/operator
          onButtonClick("DEL");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onButtonClick]);
};
