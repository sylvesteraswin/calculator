/**
 * Calculator Constants
 *
 * Centralized constants used throughout the calculator application.
 */

/**
 * Calculator button values
 */
export const CALCULATOR_BUTTONS = {
  // Numbers
  ZERO: "0",
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",

  // Operators
  ADD: "+",
  SUBTRACT: "-",
  MULTIPLY: "×",
  DIVIDE: "÷",

  // Special buttons
  DECIMAL: ".",
  INVERTED: "±",
  PERCENTAGE: "%",
  CLEAR: "AC",
  DELETE: "DEL",
  EQUALS: "=",
} as const;

/**
 * Mathematical operators supported by the calculator (for backward compatibility)
 */
export const OPERATORS = [
  CALCULATOR_BUTTONS.ADD,
  CALCULATOR_BUTTONS.SUBTRACT,
  CALCULATOR_BUTTONS.MULTIPLY,
  CALCULATOR_BUTTONS.DIVIDE,
] as const;

/**
 * Calculator behavior constants
 */
export const CALCULATOR_LIMITS = {
  MAX_NUMBER_LENGTH: 15,
} as const;

/**
 * Type definitions
 */
export type Operator = (typeof OPERATORS)[number];

/**
 * Utility function to check if a value is an operator
 */
export const isOperator = (value: string): value is Operator => {
  return OPERATORS.includes(value as Operator);
};
