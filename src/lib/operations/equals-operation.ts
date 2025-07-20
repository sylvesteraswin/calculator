import { compute } from "../compute";
import { formatNumberForDisplay } from "../format-number";
import { isOperator } from "../constants";

/**
 * Equals Operation Result
 */
export interface EqualsOperationResult {
  newValue: string[];
  newLastOperation: string | null;
}

/**
 * Equals Operation
 *
 * Handles computing the result of the calculator expression.
 *
 * Features:
 * - Validates expression before computation
 * - Handles empty/invalid expressions by resetting to empty
 * - Removes trailing operators before computation
 * - Handles division by zero and invalid results with "Error"
 * - Stores last operation for potential future use
 *
 * @param currentValue - Current calculator value array
 * @returns Object containing new value array and last operation string
 *
 * @example
 * ```typescript
 * // Basic calculation
 * handleEqualsOperation(["5", "+", "3"]) // Returns { newValue: ["8"], newLastOperation: "5+3" }
 *
 * // Handle trailing operators
 * handleEqualsOperation(["5", "+", "3", "+"]) // Returns { newValue: ["8"], newLastOperation: "5+3" }
 *
 * // Handle division by zero
 * handleEqualsOperation(["5", "÷", "0"]) // Returns { newValue: ["Error"], newLastOperation: null }
 *
 * // Handle empty expression
 * handleEqualsOperation([""]) // Returns { newValue: [""], newLastOperation: null }
 *
 * // Handle invalid expression
 * handleEqualsOperation(["+", "-"]) // Returns { newValue: [""], newLastOperation: null }
 * ```
 */
export function handleEqualsOperation(
  currentValue: string[]
): EqualsOperationResult {
  const valuesToCompute = [...currentValue];

  // Handle empty or invalid expressions
  if (
    valuesToCompute.length === 0 ||
    valuesToCompute.every(val => val === "" || isOperator(val))
  ) {
    return { newValue: [""], newLastOperation: null };
  }

  // Handle trailing operators by removing them
  const cleanValues = valuesToCompute.filter((val, index) => {
    if (index === valuesToCompute.length - 1 && isOperator(val)) {
      return false;
    }
    return true;
  });

  const result = compute(cleanValues);

  // Handle division by zero and other invalid results
  if (!isFinite(result)) {
    return { newValue: ["Error"], newLastOperation: null };
  }

  return {
    newValue: [formatNumberForDisplay(result)],
    newLastOperation: cleanValues.join(""), // Store raw expression
  };
}
