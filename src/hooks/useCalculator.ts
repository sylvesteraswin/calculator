import type { MouseEventHandler } from "react";
import { useMemo, useState, useCallback, useRef } from "react";
import {
  formatNumberForDisplay,
  formatExpressionForDisplay,
} from "../lib/format-number";
import {
  handleNumberInput,
  handleDecimalInput,
  handleInvertedInput,
  handlePercentageInput,
  handleClearOperation,
  handleDeleteOperation,
  handleEqualsOperation,
  handleOperatorInput,
} from "../lib/operations";
import { CALCULATOR_BUTTONS, isOperator } from "../lib/constants";

// Destructure constants for easier use in switch statements
const { DECIMAL, INVERTED, PERCENTAGE, CLEAR, DELETE, EQUALS } =
  CALCULATOR_BUTTONS;

export const useCalculator = () => {
  const [lastOperation, setLastOperation] = useState<string | null>(null);
  const [value, setValue] = useState<string[]>([""]);

  // Ref to store calculation results and avoid nested setState
  const calculationResultRef = useRef<{
    newValue: string[];
    newLastOperation: string | null;
  } | null>(null);

  const displayValue = useMemo(() => {
    const computedValue = value.join("");
    if (computedValue.length === 0) {
      return "0";
    }
    return formatNumberForDisplay(computedValue);
  }, [value]);

  const formattedLastOperation = useMemo(() => {
    if (!lastOperation) return null;
    return formatExpressionForDisplay(lastOperation);
  }, [lastOperation]);

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      const button = e.target as HTMLButtonElement;
      const clickedValue = button.dataset.value;

      if (!clickedValue) {
        return;
      }

      // Reset lastOperation for any button click except equals
      if (clickedValue !== EQUALS) {
        setLastOperation(null);
      }

      switch (true) {
        case DECIMAL === clickedValue:
          setValue(prev => handleDecimalInput(prev));
          break;
        case INVERTED === clickedValue:
          setValue(prev => handleInvertedInput(prev));
          break;
        case PERCENTAGE === clickedValue:
          setValue(prev => handlePercentageInput(prev));
          break;
        case CLEAR === clickedValue:
          setValue(handleClearOperation());
          setLastOperation(null);
          break;
        case DELETE === clickedValue:
          setValue(prev => handleDeleteOperation(prev));
          break;
        case EQUALS === clickedValue: {
          // Handle equals operation and update both value and lastOperation
          setValue(prev => {
            const result = handleEqualsOperation(prev);
            // Store result in ref for later use
            calculationResultRef.current = result;
            return result.newValue;
          });

          // Update lastOperation in the next tick to ensure ref is updated
          setTimeout(() => {
            if (calculationResultRef.current) {
              setLastOperation(calculationResultRef.current.newLastOperation);
            }
          }, 0);
          break;
        }
        case isOperator(clickedValue):
          setValue(prev => handleOperatorInput(prev, clickedValue));
          break;
        default:
          // Numbers (0-9) Logic
          setValue(prev => handleNumberInput(prev, clickedValue));
          break;
      }
    },
    []
  );

  return {
    handleButtonClick,
    lastOperation: formattedLastOperation,
    displayValue,
    value,
  };
};
