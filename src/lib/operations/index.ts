/**
 * Calculator Operations Module
 *
 * This module exports all atomic calculator operations.
 * Each operation is a pure function that takes current state and returns new state.
 *
 * Operations are organized by functionality:
 * - Number input (0-9)
 * - Decimal input (.)
 * - Operator input (+, -, ×, ÷)
 * - Special operations (AC, DEL, =, ±, %)
 */

// Number input operations
export { handleNumberInput } from "./number-input";

// Decimal and special input operations
export { handleDecimalInput } from "./decimal-input";
export { handleInvertedInput } from "./inverted-input";
export { handlePercentageInput } from "./percentage-input";

// Control operations
export { handleClearOperation } from "./clear-operation";
export { handleDeleteOperation } from "./delete-operation";
export { handleEqualsOperation } from "./equals-operation";

// Operator input operations
export { handleOperatorInput } from "./operator-input";

// Re-export types
export type { EqualsOperationResult } from "./equals-operation";
