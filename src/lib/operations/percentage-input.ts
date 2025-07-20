import { isOperator, CALCULATOR_BUTTONS } from "../constants";

/**
 * Percentage Input Operation
 *
 * Handles adding percentage symbols to calculator numbers.
 *
 * Features:
 * - Only works on numbers, not operators or empty values
 * - Appends "%" symbol to current number
 * - Will be converted to decimal in compute function (50% → 0.5)
 *
 * @param currentValue - Current calculator value array
 * @returns New calculator value array with percentage symbol added
 *
 * @example
 * ```typescript
 * // Add percentage to number
 * handlePercentageInput(["5"]) // Returns ["5%"]
 *
 * // Add percentage to decimal
 * handlePercentageInput(["5.5"]) // Returns ["5.5%"]
 *
 * // Ignore operators
 * handlePercentageInput(["5", "+"]) // Returns ["5", "+"] (unchanged)
 *
 * // Ignore empty values
 * handlePercentageInput([""]) // Returns [""] (unchanged)
 *
 * // Add percentage in complex expression
 * handlePercentageInput(["5", "+", "3"]) // Returns ["5", "+", "3%"]
 * ```
 */
export function handlePercentageInput(currentValue: string[]): string[] {
  const lastIndex = currentValue.length - 1;
  const lastValue = currentValue[lastIndex];

  // Only work on numbers, not operators or empty values
  if (lastValue === "" || isOperator(lastValue)) {
    return currentValue;
  }

  const newArray = [...currentValue];
  newArray[lastIndex] = `${lastValue}${CALCULATOR_BUTTONS.PERCENTAGE}`;

  return newArray;
}
