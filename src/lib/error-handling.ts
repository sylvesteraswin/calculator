/**
 * Error handling result
 */
export interface ErrorResult {
  hasError: boolean;
  error?: string;
  value?: number;
}

/**
 * Validates a number for overflow/underflow conditions
 *
 * Overflow: When a calculation result exceeds JavaScript's Number.MAX_VALUE (1.7976931348623157e+308)
 * - Examples: Number.MAX_VALUE + 1, Number.MAX_VALUE * 2, 1e308 * 2
 * - Result: Returns Infinity
 *
 * Underflow: When a calculation result goes below JavaScript's Number.MIN_VALUE (-1.7976931348623157e+308)
 * - Examples: -Number.MAX_VALUE * 2, -1e308 * 2
 * - Result: Returns -Infinity
 */
export function validateNumber(value: number): ErrorResult {
  // Check for NaN (Not a Number) - invalid mathematical operations
  if (isNaN(value)) {
    return {
      hasError: true,
      error: "INVALID_EXPRESSION",
    };
  }

  // Check for Infinity (overflow/underflow)
  if (!isFinite(value)) {
    if (value > 0) {
      // Overflow: Result is too large to represent
      return {
        hasError: true,
        error: "OVERFLOW",
      };
    } else {
      // Underflow: Result is too small (negative) to represent
      return {
        hasError: true,
        error: "UNDERFLOW",
      };
    }
  }

  return {
    hasError: false,
    value,
  };
}

/**
 * Logs error for monitoring (in production, this would send to analytics)
 */
export function logError(
  error: string,
  context?: Record<string, unknown>
): void {
  // In production, this would send to error tracking service
  console.warn(`Calculator Error: ${error}`, context);
}
