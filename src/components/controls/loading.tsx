import { useStyles } from "./style";

export const ControlsLoading = () => {
  const styles = useStyles();

  return (
    <section
      className={styles.controlsWrapper}
      role="group"
      aria-label="Calculator settings"
    >
      <div className={styles.controls}>
        <div className={styles.labelSkeleton} />
        <div className={styles.skeleton} />
      </div>
    </section>
  );
};
