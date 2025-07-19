import { validateNumber, logError } from "./error-handling";

export const compute = (stack: string[]) => {
  // Compute Function Logic Overview:
  // 1. Input validation - handles empty/invalid input
  // 2. Preprocessing - converts percentages and parentheses to pure numbers
  // 3. Multiplication/Division phase - handles × and ÷ with proper precedence
  // 4. Addition/Subtraction phase - handles + and - operations
  // 5. Precision handling - rounds results to avoid floating point errors
  // 6. Error handling - manages division by zero, overflow, invalid numbers

  // Input validation
  if (!stack || stack.length === 0) {
    return 0;
  }

  // Preprocessing Phase:
  // - Converts percentages to decimal equivalents (50% → 0.5)
  // - Converts parentheses to negative numbers ((-5) → -5)
  // - Handles malformed input gracefully
  const processedStack = [...stack];
  for (let i = 0; i < processedStack.length; i++) {
    const currentValue = processedStack[i];

    // Handle percentages
    if (currentValue.includes("%")) {
      const numValue = Number(currentValue.replace("%", ""));
      if (!isNaN(numValue)) {
        processedStack[i] = (numValue / 100).toString();
      }
    }

    // Handle parentheses (negative numbers)
    if (currentValue.startsWith("(-") && currentValue.endsWith(")")) {
      const numValue = Number(currentValue.slice(2, -1));
      if (!isNaN(numValue)) {
        processedStack[i] = (-numValue).toString();
      }
    }
  }

  // Multiplication/Division Phase (Higher Precedence):
  // - Processes × and ÷ operations first (PEMDAS rule)
  // - Handles bounds checking to prevent array out-of-bounds errors
  // - Validates numbers before operations
  // - Handles division by zero and overflow conditions
  // - Updates stack in-place by replacing operands and operator with result
  for (let i = 0; i < processedStack.length; i++) {
    const currentChar = processedStack[i];

    if (currentChar === "+" || currentChar === "-") {
      continue; // Skip addition/subtraction for now
    }

    if (currentChar === "×" || currentChar === "÷") {
      // Bounds checking
      if (i === 0 || i === processedStack.length - 1) {
        continue; // Skip if operator is at start or end
      }

      const prevNum = Number(processedStack[i - 1]);
      const nextNum = Number(processedStack[i + 1]);

      // Validate numbers
      if (isNaN(prevNum) || isNaN(nextNum)) {
        continue; // Skip invalid numbers
      }

      let tempSum = 0;
      if (currentChar == "÷") {
        // Handle division by zero
        if (nextNum === 0) {
          if (prevNum === 0) {
            // 0 ÷ 0 = NaN
            logError("ZERO_DIVIDED_BY_ZERO", {
              numerator: prevNum,
              denominator: nextNum,
            });
            return NaN;
          } else {
            // Any number ÷ 0 = Infinity
            logError("DIVISION_BY_ZERO", {
              numerator: prevNum,
              denominator: nextNum,
            });
            return Infinity;
          }
        }
        tempSum = prevNum / nextNum;
      }

      if (currentChar == "×") {
        tempSum = prevNum * nextNum;
      }

      // Validate result for overflow/underflow
      const numberValidation = validateNumber(tempSum);
      if (numberValidation.hasError) {
        logError(numberValidation.error!, {
          operation: currentChar,
          operands: [prevNum, nextNum],
          result: tempSum,
        });
        return tempSum; // Return the actual result (Infinity, -Infinity, or NaN)
      }

      processedStack.splice(i - 1, 3, `${tempSum}`);
      i = i - 1;
    }
  }

  // Addition/Subtraction Phase (Lower Precedence):
  // - Processes + and - operations after multiplication/division
  // - Maintains current operator state for chained operations
  // - Handles overflow/underflow conditions
  // - Skips invalid numbers and empty values
  // - Accumulates result from left to right
  let result = 0;
  let currentOperator = "+";

  for (let i = 0; i < processedStack.length; i++) {
    const currentChar = processedStack[i];

    if (currentChar === "+" || currentChar === "-") {
      currentOperator = currentChar;
      continue;
    }

    if (currentChar === "") {
      continue;
    }

    const num = Number(currentChar);
    if (isNaN(num)) {
      continue; // Skip invalid numbers
    }

    // Handle overflow/underflow in addition/subtraction
    if (currentOperator === "+") {
      result += num;
    } else if (currentOperator === "-") {
      result -= num;
    }

    // Check for overflow/underflow after each operation
    const numberValidation = validateNumber(result);
    if (numberValidation.hasError) {
      logError(numberValidation.error!, {
        operation: currentOperator,
        operand: num,
        result,
      });
      return result;
    }
  }

  // Handle floating point precision issues
  // Round to reasonable precision to avoid floating point errors
  const roundedResult = Math.round(result * 1000000) / 1000000;

  // Final validation of the result
  const finalValidation = validateNumber(roundedResult);
  if (finalValidation.hasError) {
    logError(finalValidation.error!, { finalResult: roundedResult });
    return roundedResult; // Return the actual result even if it's Infinity/NaN
  }

  return roundedResult;
};
