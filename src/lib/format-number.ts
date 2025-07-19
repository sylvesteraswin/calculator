/**
 * Formats a number for display, using scientific notation for very large numbers
 * @param value - The number or string to format
 * @param threshold - The threshold above which to use scientific notation (default: 99999999999)
 * @returns Formatted string
 */
export const formatNumberForDisplay = (
  value: string | number,
  threshold: number = 99999999999
): string => {
  // If it's already a string that looks like scientific notation, return as is
  if (typeof value === "string" && value.includes("e")) {
    return value;
  }

  // Convert to number for processing
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  // Handle invalid numbers
  if (isNaN(numValue)) {
    return value.toString();
  }

  // Handle special cases
  if (!isFinite(numValue)) {
    return numValue.toString();
  }

  // Use scientific notation for very large numbers
  if (Math.abs(numValue) > threshold) {
    return numValue.toExponential(2);
  }

  // For regular numbers, preserve the original format if it's a string
  if (typeof value === "string") {
    return value;
  }

  // For numbers, return as string
  return numValue.toString();
};

/**
 * Formats a calculation expression for display, applying scientific notation to large numbers
 * @param expression - The calculation expression string
 * @param threshold - The threshold above which to use scientific notation (default: 99999999999)
 * @returns Formatted expression string
 */
export const formatExpressionForDisplay = (
  expression: string,
  threshold: number = 99999999999
): string => {
  if (!expression) return expression;

  // Split the expression into parts (numbers and operators)
  const parts = expression.split(/([+\-×÷])/);

  return parts
    .map((part) => {
      // Skip operators
      if (["+", "-", "×", "÷"].includes(part)) {
        return part;
      }

      // Format numbers
      return formatNumberForDisplay(part, threshold);
    })
    .join("");
};
