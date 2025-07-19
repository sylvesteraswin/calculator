import type { SwitchProps } from "@fluentui/react-components";
import { Switch } from "@fluentui/react-components";
import { useStyles } from "./style";

interface ControlsProps {
  correctLayoutProps: SwitchProps;
}

export const Controls = ({ correctLayoutProps }: ControlsProps) => {
  const styles = useStyles();

  return (
    <div className={styles.controls}>
      <div>Correct Layout</div>
      <Switch {...correctLayoutProps} />
    </div>
  );
};
