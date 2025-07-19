import type { ReactNode } from "react";
import { useStyles } from "./style";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const styles = useStyles();

  return <div className={styles.wrapper}>{children}</div>;
};
