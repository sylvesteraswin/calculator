/**
 * Clear Operation
 *
 * Handles resetting the calculator to initial state.
 *
 * Features:
 * - Resets calculator to initial state
 * - Clears both current value and last operation history
 * - Always returns the same initial state
 *
 * @returns Initial calculator state
 *
 * @example
 * ```typescript
 * // Clear any state
 * handleClearOperation(["5", "+", "3"]) // Returns [""]
 *
 * // Clear empty state
 * handleClearOperation([""]) // Returns [""]
 *
 * // Clear complex expression
 * handleClearOperation(["5", "+", "3", "×", "2"]) // Returns [""]
 * ```
 */
export function handleClearOperation(): string[] {
  return [""];
}
