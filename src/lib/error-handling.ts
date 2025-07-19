/**
 * Error types for calculator operations
 */
export const CalculatorError = {
  DIVISION_BY_ZERO: "DIVISION_BY_ZERO",
  ZERO_DIVIDED_BY_ZERO: "ZERO_DIVIDED_BY_ZERO",
  OVERFLOW: "OVERFLOW",
  UNDERFLOW: "UNDERFLOW",
  INVALID_EXPRESSION: "INVALID_EXPRESSION",
  TOO_LARGE_NUMBER: "TOO_LARGE_NUMBER",
  TOO_SMALL_NUMBER: "TOO_SMALL_NUMBER",
  MEMORY_ERROR: "MEMORY_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
} as const;

export type CalculatorErrorType =
  (typeof CalculatorError)[keyof typeof CalculatorError];

/**
 * Error messages for user display
 */
export const ERROR_MESSAGES = {
  [CalculatorError.DIVISION_BY_ZERO]: "Cannot divide by zero",
  [CalculatorError.ZERO_DIVIDED_BY_ZERO]: "Undefined (0÷0)",
  [CalculatorError.OVERFLOW]: "Number too large",
  [CalculatorError.UNDERFLOW]: "Number too small",
  [CalculatorError.INVALID_EXPRESSION]: "Invalid expression",
  [CalculatorError.TOO_LARGE_NUMBER]: "Number too large to display",
  [CalculatorError.TOO_SMALL_NUMBER]: "Number too small to display",
  [CalculatorError.MEMORY_ERROR]: "Memory limit reached",
  [CalculatorError.TIMEOUT_ERROR]: "Calculation too complex",
} as const;

/**
 * Configuration for error handling thresholds
 */
export const ERROR_THRESHOLDS = {
  // Maximum safe number for calculations (allow JavaScript's full range)
  MAX_SAFE_NUMBER: Number.MAX_VALUE,
  // Minimum safe number for calculations (allow JavaScript's full range)
  MIN_SAFE_NUMBER: Number.MIN_VALUE,
  // Maximum number of operations in a single calculation
  MAX_OPERATIONS: 1000,
  // Maximum calculation time in milliseconds
  MAX_CALCULATION_TIME: 5000,
  // Maximum number of digits in a single number
  MAX_DIGITS: 15,
} as const;

/**
 * Error handling result
 */
export interface ErrorResult {
  hasError: boolean;
  error?: CalculatorErrorType;
  message?: string;
  value?: number;
}

/**
 * Validates a number for overflow/underflow conditions
 */
export function validateNumber(value: number): ErrorResult {
  // Check for NaN
  if (isNaN(value)) {
    return {
      hasError: true,
      error: CalculatorError.INVALID_EXPRESSION,
      message: ERROR_MESSAGES[CalculatorError.INVALID_EXPRESSION],
    };
  }

  // Check for Infinity
  if (!isFinite(value)) {
    if (value > 0) {
      return {
        hasError: true,
        error: CalculatorError.OVERFLOW,
        message: ERROR_MESSAGES[CalculatorError.OVERFLOW],
      };
    } else {
      return {
        hasError: true,
        error: CalculatorError.UNDERFLOW,
        message: ERROR_MESSAGES[CalculatorError.UNDERFLOW],
      };
    }
  }

  // Check for very large numbers
  if (Math.abs(value) > ERROR_THRESHOLDS.MAX_SAFE_NUMBER) {
    return {
      hasError: true,
      error: CalculatorError.TOO_LARGE_NUMBER,
      message: ERROR_MESSAGES[CalculatorError.TOO_LARGE_NUMBER],
    };
  }

  // Check for very small numbers
  if (Math.abs(value) < ERROR_THRESHOLDS.MIN_SAFE_NUMBER && value !== 0) {
    return {
      hasError: true,
      error: CalculatorError.TOO_SMALL_NUMBER,
      message: ERROR_MESSAGES[CalculatorError.TOO_SMALL_NUMBER],
    };
  }

  return {
    hasError: false,
    value,
  };
}

/**
 * Validates division operations
 */
export function validateDivision(
  numerator: number,
  denominator: number
): ErrorResult {
  // Check for division by zero
  if (denominator === 0) {
    if (numerator === 0) {
      return {
        hasError: true,
        error: CalculatorError.ZERO_DIVIDED_BY_ZERO,
        message: ERROR_MESSAGES[CalculatorError.ZERO_DIVIDED_BY_ZERO],
      };
    } else {
      return {
        hasError: true,
        error: CalculatorError.DIVISION_BY_ZERO,
        message: ERROR_MESSAGES[CalculatorError.DIVISION_BY_ZERO],
      };
    }
  }

  return {
    hasError: false,
  };
}

/**
 * Validates expression complexity
 */
export function validateExpressionComplexity(operations: number): ErrorResult {
  if (operations > ERROR_THRESHOLDS.MAX_OPERATIONS) {
    return {
      hasError: true,
      error: CalculatorError.TIMEOUT_ERROR,
      message: ERROR_MESSAGES[CalculatorError.TIMEOUT_ERROR],
    };
  }

  return {
    hasError: false,
  };
}

/**
 * Validates input number length
 */
export function validateInputLength(input: string): ErrorResult {
  // Remove decimal point and negative sign for counting
  const cleanInput = input.replace(/[.-]/g, "");

  if (cleanInput.length > ERROR_THRESHOLDS.MAX_DIGITS) {
    return {
      hasError: true,
      error: CalculatorError.TOO_LARGE_NUMBER,
      message: ERROR_MESSAGES[CalculatorError.TOO_LARGE_NUMBER],
    };
  }

  return {
    hasError: false,
  };
}

/**
 * Formats error for display
 */
export function formatErrorForDisplay(error: CalculatorErrorType): string {
  return ERROR_MESSAGES[error];
}

/**
 * Logs error for monitoring (in production, this would send to analytics)
 */
export function logError(
  error: CalculatorErrorType,
  context?: Record<string, unknown>
): void {
  // In production, this would send to error tracking service
  console.warn(`Calculator Error: ${error}`, context);
}
