import type { MouseEventHandler } from "react";
import { useMemo, useState, useCallback } from "react";
import { compute } from "../lib/compute";
import {
  formatNumberForDisplay,
  formatExpressionForDisplay,
} from "../lib/format-number";

const operators = ["+", "-", "×", "÷"];
const decimal = ".";
const inverted = "±";
const percentage = "%";
const clear = "AC";
const del = "DEL";
const equals = "=";

export const useCalculator = () => {
  const [lastOperation, setLastOperation] = useState<string | null>(null);
  const [value, setValue] = useState<string[]>([""]);

  const displayValue = useMemo(() => {
    const computedValue = value.join("");
    if (computedValue.length === 0) {
      return "0";
    }
    return formatNumberForDisplay(computedValue);
  }, [value]);

  const formattedLastOperation = useMemo(() => {
    if (!lastOperation) return null;
    return formatExpressionForDisplay(lastOperation);
  }, [lastOperation]);

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const button = e.target as HTMLButtonElement;
      const clickedValue = button.dataset.value;

      if (!clickedValue) {
        return;
      }

      // Calculator Logic Overview:
      // 1. Decimal (.) - Adds decimal point to current number, prevents multiple decimals
      // 2. Inverted (±) - Toggles negative/positive with parentheses for visual clarity
      // 3. Percentage (%) - Adds % symbol to current number, only works on numbers
      // 4. Clear (AC) - Resets calculator to initial state
      // 5. Equals (=) - Computes result with validation for division by zero, trailing operators, etc.
      // 6. Operators (+, -, ×, ÷) - Handles operator replacement and leading operators
      // 7. Numbers (0-9) - Appends to current number with length limits

      switch (true) {
        case decimal === clickedValue:
          // Decimal Logic:
          // - Prevents multiple decimal points in same number
          // - If last value is empty, adds "0." instead of just "."
          // - Otherwise appends "." to existing number
          setValue((prev) => {
            const lastIndex = prev.length - 1;
            const lastValue = prev[lastIndex];
            if (lastValue.includes(".")) {
              return prev; // Prevent multiple decimals
            }
            const newLastValue = lastValue === "" ? "0." : `${lastValue}.`;
            const newArray = [...prev];
            newArray[lastIndex] = newLastValue;
            return newArray;
          });
          break;
        case inverted === clickedValue:
          // Inverted (±) Logic:
          // - Only works on numbers, not operators or empty values
          // - Toggles between positive and negative with parentheses for visual clarity
          // - Positive: "5" → "(-5)" (adds parentheses and negative)
          // - Negative: "(-5)" → "5" (removes parentheses and negative)
          setValue((prev) => {
            const lastIndex = prev.length - 1;
            const lastValue = prev[lastIndex];
            if (lastValue === "" || operators.includes(lastValue)) {
              return prev; // Only work on numbers
            }

            const newArray = [...prev];

            // Check if the number is already negative (has parentheses or starts with -)
            if (lastValue.startsWith("(-") && lastValue.endsWith(")")) {
              // Remove parentheses and negative sign
              const positiveNumber = lastValue.slice(2, -1);
              newArray[lastIndex] = positiveNumber;
            } else if (lastValue.startsWith("-")) {
              // Remove negative sign (convert to positive)
              const positiveNumber = lastValue.slice(1);
              newArray[lastIndex] = positiveNumber;
            } else {
              // Add parentheses and negative sign
              newArray[lastIndex] = `(-${lastValue})`;
            }

            return newArray;
          });
          break;
        case percentage === clickedValue:
          // Percentage (%) Logic:
          // - Only works on numbers, not operators or empty values
          // - Appends "%" symbol to current number
          // - Will be converted to decimal in compute function (50% → 0.5)
          setValue((prev) => {
            const lastIndex = prev.length - 1;
            const lastValue = prev[lastIndex];
            if (lastValue === "" || operators.includes(lastValue)) {
              return prev; // Only work on numbers
            }
            const newArray = [...prev];
            newArray[lastIndex] = `${lastValue}${clickedValue}`;
            return newArray;
          });
          break;
        case clear === clickedValue:
          // Clear (AC) Logic:
          // - Resets calculator to initial state
          // - Clears both current value and last operation history
          setValue([""]);
          setLastOperation(null);
          break;
        case del === clickedValue:
          // Delete (DEL) Logic:
          // - If last value is an operator, remove the entire operator
          // - If last value is a number/decimal/percentage, remove last character
          // - If last value becomes empty after deletion, remove the element
          // - If no values left, reset to empty state
          setValue((prev) => {
            if (prev.length === 0) {
              return prev; // Do nothing if no values
            }

            const newArray = [...prev];
            const lastIndex = prev.length - 1;
            const lastValue = prev[lastIndex];

            // If last value is an operator, remove it entirely
            if (operators.includes(lastValue)) {
              newArray.splice(lastIndex, 1);
            } else {
              // For numbers, decimals, percentages, etc.
              if (lastValue.length === 1) {
                // If it's the last character, remove the element entirely
                newArray.splice(lastIndex, 1);
              } else {
                // Remove last character
                const newLastValue = lastValue.slice(0, -1);

                // Special handling for negative numbers with parentheses
                if (lastValue.startsWith("(-") && lastValue.endsWith(")")) {
                  // For negative numbers like (-5), if we're deleting and end up with incomplete parentheses
                  // or just the opening, convert back to positive number
                  if (
                    newLastValue === "(-" ||
                    (newLastValue.startsWith("(-") &&
                      !newLastValue.endsWith(")"))
                  ) {
                    // Extract the number from (-5) -> 5
                    const numberPart = lastValue.slice(2, -1);
                    newArray[lastIndex] = numberPart;
                  } else {
                    newArray[lastIndex] = newLastValue;
                  }
                } else {
                  newArray[lastIndex] = newLastValue;
                }
              }
            }

            // If we end up with no values, reset to empty state
            if (newArray.length === 0) {
              return [""];
            }

            return newArray;
          });
          break;
        case equals === clickedValue: {
          // Equals (=) Logic:
          // - Validates expression before computation
          // - Handles empty/invalid expressions by resetting to empty
          // - Removes trailing operators before computation
          // - Handles division by zero and invalid results with "Error"
          // - Stores last operation for potential future use
          const valuesToCompute = [...value];

          // Handle empty or invalid expressions
          if (
            valuesToCompute.length === 0 ||
            valuesToCompute.every(
              (val) => val === "" || operators.includes(val)
            )
          ) {
            setValue([""]);
            return;
          }

          // Handle trailing operators by removing them
          const cleanValues = valuesToCompute.filter((val, index) => {
            if (
              index === valuesToCompute.length - 1 &&
              operators.includes(val)
            ) {
              return false;
            }
            return true;
          });

          const result = compute(cleanValues);

          // Handle division by zero and other invalid results
          if (!isFinite(result)) {
            setValue(["Error"]);
            return;
          }

          setLastOperation(formatExpressionForDisplay(cleanValues.join("")));
          setValue([formatNumberForDisplay(result)]);
          break;
        }
        case operators.includes(clickedValue):
          // Operators (+, -, ×, ÷) Logic:
          // - Replaces existing operator if last value is an operator
          // - Handles leading operators by adding "0" before them
          // - Otherwise adds operator as new element
          // - Prevents consecutive operators in expression
          setValue((prev) => {
            const lastIndex = prev.length - 1;
            const lastValue = prev[lastIndex];

            // If last value is an operator, replace it
            if (operators.includes(lastValue)) {
              const newArray = [...prev];
              newArray[lastIndex] = clickedValue;
              return newArray;
            }

            // If this is the first value and it's empty, add 0 before operator
            if (lastValue === "" && prev.length === 1) {
              return [...prev, "0", clickedValue];
            }

            // Otherwise, add as new element
            return [...prev, clickedValue];
          });
          break;
        default:
          // Numbers (0-9) Logic:
          // - Appends to current number if last value is a number or decimal
          // - Handles decimal numbers by appending after decimal point
          // - Limits number length to 15 digits for performance
          // - Adds as new element if last value is operator or empty
          setValue((prev) => {
            const lastIndex = prev.length - 1;
            const lastValue = prev[lastIndex];

            // If last value ends with decimal, append to it
            if (lastValue.endsWith(".")) {
              const newArray = [...prev];
              newArray[lastIndex] = `${lastValue}${clickedValue}`;
              return newArray;
            }

            // If last value is a number, append to it (with length limit)
            if (lastValue !== "" && !operators.includes(lastValue)) {
              // Limit number length to prevent performance issues
              if (lastValue.length >= 15) {
                return prev;
              }
              const newArray = [...prev];
              newArray[lastIndex] = `${lastValue}${clickedValue}`;
              return newArray;
            }

            // Otherwise, add as new element
            return [...prev, clickedValue];
          });
          break;
      }
    },
    [value]
  );

  return {
    handleButtonClick,
    lastOperation: formattedLastOperation,
    displayValue,
    value,
  };
};
