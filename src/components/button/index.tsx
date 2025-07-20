import type { MouseEventHandler } from "react";
import { memo } from "react";
import {
  Button as FluentButton,
  mergeClasses,
} from "@fluentui/react-components";
import { useStyles } from "./style";
import type { ButtonConfig } from "../../lib/button-config";

interface Props extends ButtonConfig {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = memo<Props>(
  ({ value, styleType, span, size, onClick }: Props) => {
    const styles = useStyles();

    // Generate accessible labels based on button value
    const getAccessibleLabel = (buttonValue: string): string => {
      switch (buttonValue) {
        case "AC":
          return "All Clear - Clear all calculations and reset calculator";
        case "±":
          return "Plus Minus - Toggle between positive and negative";
        case "%":
          return "Percentage - Convert number to percentage";
        case "÷":
          return "Divide - Division operator";
        case "×":
          return "Multiply - Multiplication operator";
        case "-":
          return "Minus - Subtraction operator";
        case "+":
          return "Plus - Addition operator";
        case "=":
          return "Equals - Calculate result";
        case ".":
          return "Decimal Point - Add decimal to number";
        case "DEL":
          return "Delete - Remove last character or operation";
        default:
          // For numbers 0-9
          if (/^[0-9]$/.test(buttonValue)) {
            return `Number ${buttonValue}`;
          }
          return buttonValue;
      }
    };

    // Generate keyboard shortcuts for common operations
    const getKeyboardShortcut = (buttonValue: string): string => {
      switch (buttonValue) {
        case "AC":
          return "Escape key";
        case "=":
          return "Enter key";
        case "÷":
          return "/ key";
        case "×":
          return "* key";
        case "-":
          return "- key";
        case "+":
          return "+ key";
        case ".":
          return ". key";
        case "DEL":
          return "Backspace key";
        default:
          if (/^[0-9]$/.test(buttonValue)) {
            return `${buttonValue} key`;
          }
          return "";
      }
    };

    // Determine button type for semantic meaning
    const getButtonType = (buttonValue: string): "button" | "submit" => {
      return buttonValue === "=" ? "submit" : "button";
    };

    const accessibleLabel = getAccessibleLabel(value);
    const keyboardShortcut = getKeyboardShortcut(value);
    const buttonType = getButtonType(value);

    return (
      <FluentButton
        type={buttonType}
        className={mergeClasses(
          styles.button,
          styleType === "inverted" && styles.buttonInverted,
          styleType === "light" && styles.buttonLight,
          span === "2" && styles.buttonSpan2,
          size === "large" && styles.buttonLarge
        )}
        aria-label={accessibleLabel}
        aria-describedby={keyboardShortcut ? `${value}-shortcut` : undefined}
        {...{
          "data-value": value,
        }}
        onClick={onClick}
      >
        {value}
        {keyboardShortcut && (
          <span
            id={`${value}-shortcut`}
            className={styles.srOnly}
            aria-label={`Keyboard shortcut: ${keyboardShortcut}`}
          >
            {keyboardShortcut}
          </span>
        )}
      </FluentButton>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison - exclude onClick from comparison
    return (
      prevProps.value === nextProps.value &&
      prevProps.styleType === nextProps.styleType &&
      prevProps.span === nextProps.span &&
      prevProps.size === nextProps.size
    );
  }
);

Button.displayName = "Button";
