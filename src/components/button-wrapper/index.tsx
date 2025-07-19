import type { ReactNode } from "react";
import { useStyles } from "./style";

interface Props {
  children: ReactNode;
}

export const ButtonWrapper = ({ children }: Props) => {
  const styles = useStyles();

  return (
    <section
      className={styles.buttonWrapper}
      role="group"
      aria-label="Calculator buttons"
    >
      {children}
    </section>
  );
};
