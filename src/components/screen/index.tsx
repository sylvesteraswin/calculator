import { memo } from "react";
import { useStyles } from "./style";

interface Props {
  value: string;
  lastOperation?: string;
}

export const Screen = memo<Props>(
  ({ value, lastOperation }: Props) => {
    const styles = useStyles();

    return (
      <div
        className={styles.screen}
        role="application"
        aria-label="Calculator display"
      >
        <div
          className={styles.screenLastOperation}
          role="status"
          aria-live="polite"
          aria-label="Previous operation"
        >
          {lastOperation}
        </div>
        <div
          className={styles.screenValue}
          role="status"
          aria-live="assertive"
          aria-label="Current calculation result"
        >
          {value}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for better performance
    return (
      prevProps.value === nextProps.value &&
      prevProps.lastOperation === nextProps.lastOperation
    );
  }
);

Screen.displayName = "Screen";
