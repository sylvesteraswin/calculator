import type { ReactNode } from "react";
import { useStyles } from "./style";

interface Props {
  children: ReactNode;
}

export const ButtonWrapper = ({ children }: Props) => {
  const styles = useStyles();

  return <div className={styles.buttonWrapper}>{children}</div>;
};
