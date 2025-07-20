/**
 * Decimal Input Operation
 *
 * Handles adding decimal points to calculator numbers.
 *
 * Features:
 * - Prevents multiple decimal points in the same number
 * - Adds "0." if the last value is empty
 * - Otherwise appends "." to existing number
 *
 * @param currentValue - Current calculator value array
 * @returns New calculator value array with decimal point added
 *
 * @example
 * ```typescript
 * // Add decimal to empty value
 * handleDecimalInput([""]) // Returns ["0."]
 *
 * // Add decimal to existing number
 * handleDecimalInput(["5"]) // Returns ["5."]
 *
 * // Prevent multiple decimals
 * handleDecimalInput(["5."]) // Returns ["5."] (unchanged)
 *
 * // Add decimal in complex expression
 * handleDecimalInput(["5", "+", "3"]) // Returns ["5", "+", "3."]
 * ```
 */
import { isOperator } from "../constants";

export function handleDecimalInput(currentValue: string[]): string[] {
  const lastIndex = currentValue.length - 1;
  const lastValue = currentValue[lastIndex];

  // Only work on numbers, not operators
  if (isOperator(lastValue)) {
    return currentValue;
  }

  // Prevent multiple decimal points in the same number
  if (lastValue.includes(".")) {
    return currentValue;
  }

  const newArray = [...currentValue];
  const newLastValue = lastValue === "" ? "0." : `${lastValue}.`;
  newArray[lastIndex] = newLastValue;

  return newArray;
}
