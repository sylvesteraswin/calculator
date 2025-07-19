import type { SelectProps } from "@fluentui/react-components";
import { Select } from "@fluentui/react-components";
import { useStyles } from "./style";

interface ControlsProps {
  selectProps: SelectProps;
}

export const Controls = ({ selectProps }: ControlsProps) => {
  const styles = useStyles();

  return (
    <div className={styles.controlsWrapper}>
      <div className={styles.controls}>
        <div>Layout Style</div>
        <Select {...selectProps}>
          <option value="default">Default</option>
          <option value="corrected">Corrected</option>
          <option value="apple">Apple</option>
        </Select>
      </div>
    </div>
  );
};
