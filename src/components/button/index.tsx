import type { MouseEventHandler } from "react";
import type { ButtonConfig } from "../../lib/button-config";
import {
  Button as FluentButton,
  mergeClasses,
} from "@fluentui/react-components";
import { useStyles } from "./style";

interface Props extends ButtonConfig {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ value, styleType, span, size, onClick }: Props) => {
  const styles = useStyles();

  return (
    <FluentButton
      className={mergeClasses(
        styles.button,
        styleType === "inverted" && styles.buttonInverted,
        styleType === "light" && styles.buttonLight,
        span === "2" && styles.buttonSpan2,
        size === "large" && styles.buttonLarge
      )}
      {...{
        "data-value": value,
      }}
      onClick={onClick}
    >
      {value}
    </FluentButton>
  );
};
