/**
 * Number Input Operation
 *
 * Handles numeric digit input (0-9) for the calculator.
 * This module manages the core number building functionality.
 */

/**
 * Handles number input (0-9) for the calculator
 *
 * Features supported:
 * - Appends digits to current number
 * - Handles decimal numbers by appending after decimal point
 * - Enforces maximum number length (15 digits) for performance
 * - Creates new array element if last value is an operator
 * - Handles empty state by adding to first element
 * - Supports building multi-digit numbers
 * - Prevents overflow by limiting number length
 *
 * @param currentValue - Current calculator state array
 * @param digit - The digit to append (0-9)
 * @returns New state array with the digit appended
 *
 * @example
 * ```typescript
 * handleNumberInput([""], "5") // → ["", "5"]
 * handleNumberInput(["", "5"], "3") // → ["", "53"]
 * handleNumberInput(["", "5", "+"], "3") // → ["", "5", "+", "3"]
 * handleNumberInput(["", "5."], "2") // → ["", "5.2"]
 * ```
 */
import { isOperator, CALCULATOR_LIMITS } from "../constants";

export function handleNumberInput(
  currentValue: string[],
  digit: string
): string[] {
  const lastIndex = currentValue.length - 1;
  const lastValue = currentValue[lastIndex];

  // If last value ends with decimal, append to it
  if (lastValue.endsWith(".")) {
    const newArray = [...currentValue];
    newArray[lastIndex] = `${lastValue}${digit}`;
    return newArray;
  }

  // If last value is a number, append to it (with length limit)
  if (lastValue !== "" && !isOperator(lastValue)) {
    // Limit number length to prevent performance issues
    if (lastValue.length >= CALCULATOR_LIMITS.MAX_NUMBER_LENGTH) {
      return currentValue; // Return unchanged if at limit
    }
    const newArray = [...currentValue];
    newArray[lastIndex] = `${lastValue}${digit}`;
    return newArray;
  }

  // Otherwise, add as new element
  return [...currentValue, digit];
}
