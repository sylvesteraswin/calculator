import { isOperator } from "../constants";

/**
 * Operator Input Operation
 *
 * Handles adding operators to calculator expressions.
 *
 * Features:
 * - Replaces existing operator if last value is an operator
 * - Handles leading operators by adding "0" before them
 * - Otherwise adds operator as new element
 * - Prevents consecutive operators in expression
 *
 * @param currentValue - Current calculator value array
 * @param operatorValue - The operator to add (+, -, ×, ÷)
 * @returns New calculator value array with operator added
 *
 * @example
 * ```typescript
 * // Add operator after number
 * handleOperatorInput(["5"], "+") // Returns ["5", "+"]
 *
 * // Replace existing operator
 * handleOperatorInput(["5", "+"], "-") // Returns ["5", "-"]
 *
 * // Handle leading operator
 * handleOperatorInput([""], "+") // Returns ["0", "+"]
 *
 * // Add operator in complex expression
 * handleOperatorInput(["5", "+", "3"], "×") // Returns ["5", "+", "3", "×"]
 *
 * // Replace operator in complex expression
 * handleOperatorInput(["5", "+", "3", "×"], "÷") // Returns ["5", "+", "3", "÷"]
 * ```
 */
export function handleOperatorInput(
  currentValue: string[],
  operatorValue: string
): string[] {
  const lastIndex = currentValue.length - 1;
  const lastValue = currentValue[lastIndex];

  // If last value is an operator, replace it
  if (isOperator(lastValue)) {
    const newArray = [...currentValue];
    newArray[lastIndex] = operatorValue;
    return newArray;
  }

  // If this is the first value and it's empty, add 0 before operator
  if (lastValue === "" && currentValue.length === 1) {
    return ["0", operatorValue];
  }

  // Otherwise, add as new element
  return [...currentValue, operatorValue];
}
