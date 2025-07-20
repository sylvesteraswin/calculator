import { isOperator } from "../constants";

/**
 * Delete Operation
 *
 * Handles removing characters or elements from calculator state.
 *
 * Features:
 * - If last value is an operator, remove the entire operator
 * - If last value is a number/decimal/percentage, remove last character
 * - If last value becomes empty after deletion, remove the element
 * - If no values left, reset to empty state
 * - Special handling for negative numbers with parentheses
 *
 * @param currentValue - Current calculator value array
 * @returns New calculator value array with last element/character removed
 *
 * @example
 * ```typescript
 * // Delete last character from number
 * handleDeleteOperation(["5"]) // Returns [""]
 * handleDeleteOperation(["50"]) // Returns ["5"]
 *
 * // Delete operator
 * handleDeleteOperation(["5", "+"]) // Returns ["5"]
 *
 * // Delete from complex expression
 * handleDeleteOperation(["5", "+", "30"]) // Returns ["5", "+", "3"]
 *
 * // Handle negative numbers
 * handleDeleteOperation(["(-5)"]) // Returns ["(-"]
 * handleDeleteOperation(["(-"]) // Returns ["5"]
 *
 * // Reset to empty when nothing left
 * handleDeleteOperation([""]) // Returns [""]
 * ```
 */
export function handleDeleteOperation(currentValue: string[]): string[] {
  if (currentValue.length === 0) {
    return currentValue; // Do nothing if no values
  }

  const newArray = [...currentValue];
  const lastIndex = currentValue.length - 1;
  const lastValue = currentValue[lastIndex];

  // If last value is an operator, remove it entirely
  if (isOperator(lastValue)) {
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
          (newLastValue.startsWith("(-") && !newLastValue.endsWith(")"))
        ) {
          // Extract the number from (-5) -> 5
          const numberPart = lastValue.slice(2, -1);
          newArray[lastIndex] = numberPart;
        } else {
          newArray[lastIndex] = newLastValue;
        }
      } else if (lastValue.startsWith("(-") && !lastValue.endsWith(")")) {
        // Handle incomplete negative numbers like "(-"
        if (newLastValue === "(-") {
          // Extract the number from (-5 -> 5
          const numberPart = lastValue.slice(2);
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
}
