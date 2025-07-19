import type { SelectProps } from "@fluentui/react-components";
import { Select } from "@fluentui/react-components";
import { useStyles } from "./style";

interface ControlsProps {
  selectProps: SelectProps;
}

export const Controls = ({ selectProps }: ControlsProps) => {
  const styles = useStyles();

  return (
    <section
      className={styles.controlsWrapper}
      role="group"
      aria-label="Calculator settings"
    >
      <div className={styles.controls}>
        <label htmlFor="layout-select">Layout Style</label>
        <Select
          {...selectProps}
          id="layout-select"
          aria-label="Select calculator layout"
        >
          <option value="default">Default</option>
          <option value="corrected">Corrected</option>
          <option value="apple">Apple</option>
        </Select>
      </div>
    </section>
  );
};
