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
      let buttonValue: string | null = null;
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
          buttonValue = event.key;
          break;
        case ".":
          buttonValue = ".";
          break;
        case "+":
          buttonValue = "+";
          break;
        case "-":
          buttonValue = "-";
          break;
        case "*":
          buttonValue = "×";
          break;
        case "/":
          buttonValue = "÷";
          break;
        case "Enter":
          buttonValue = "=";
          break;
        case "Escape":
          buttonValue = "AC";
          break;
        case "%":
          buttonValue = "%";
          break;
        case "p":
        case "P":
          // Toggle positive/negative (alternative to ±)
          buttonValue = "±";
          break;
        case "Backspace":
          // Delete last character/operator
          buttonValue = "DEL";
          break;
      }

      if (buttonValue) {
        // Find and highlight the corresponding button (if it exists)
        const buttonElement = document.querySelector(
          `[data-value="${buttonValue}"]`
        ) as HTMLButtonElement;

        if (buttonElement) {
          // Add visual feedback class
          buttonElement.classList.add("keyboard-highlight");

          // Remove the highlight after a short delay
          setTimeout(() => {
            buttonElement.classList.remove("keyboard-highlight");
          }, 150);
        }

        // Always trigger the button click, regardless of whether the element was found
        onButtonClick(buttonValue);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onButtonClick]);
};
