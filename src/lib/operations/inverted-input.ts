import { isOperator } from "../constants";

/**
 * Inverted Input Operation
 *
 * Handles toggling between positive and negative numbers.
 *
 * Features:
 * - Only works on numbers, not operators or empty values
 * - Toggles between positive and negative with parentheses for visual clarity
 * - Positive: "5" → "(-5)" (adds parentheses and negative)
 * - Negative: "(-5)" → "5" (removes parentheses and negative)
 *
 * @param currentValue - Current calculator value array
 * @returns New calculator value array with sign toggled
 *
 * @example
 * ```typescript
 * // Toggle positive to negative
 * handleInvertedInput(["5"]) // Returns ["(-5)"]
 *
 * // Toggle negative to positive
 * handleInvertedInput(["(-5)"]) // Returns ["5"]
 *
 * // Handle negative without parentheses
 * handleInvertedInput(["-5"]) // Returns ["5"]
 *
 * // Ignore operators
 * handleInvertedInput(["5", "+"]) // Returns ["5", "+"] (unchanged)
 *
 * // Ignore empty values
 * handleInvertedInput([""]) // Returns [""] (unchanged)
 * ```
 */
export function handleInvertedInput(currentValue: string[]): string[] {
  const lastIndex = currentValue.length - 1;
  const lastValue = currentValue[lastIndex];

  // Only work on numbers, not operators, empty values, or percentage numbers
  if (lastValue === "" || isOperator(lastValue) || lastValue.includes("%")) {
    return currentValue;
  }

  const newArray = [...currentValue];

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
}
