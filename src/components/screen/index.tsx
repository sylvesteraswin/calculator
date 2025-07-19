import { useStyles } from "./style";

interface Props {
  value: string;
  lastOperation?: string;
}

export const Screen = ({ value, lastOperation }: Props) => {
  const styles = useStyles();

  return (
    <div className={styles.screen}>
      <div className={styles.screenLastOperation}>{lastOperation}</div>
      <div className={styles.screenValue}>{value}</div>
    </div>
  );
};
