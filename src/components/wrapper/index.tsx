import type { ReactNode } from "react";
import { useStyles } from "./style";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const styles = useStyles();

  return (
    <main className={styles.wrapper} role="main" aria-label="Calculator">
      {children}
    </main>
  );
};
