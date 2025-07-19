import { useAppLoading } from "../../hooks/useAppLoading";
import { useStyles } from "./style";

export const LoadingScreen = () => {
  const { isLoading, loadingProgress } = useAppLoading();
  const styles = useStyles();

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>Calculator</h1>
          <p className={styles.subtitle}>
            {loadingProgress < 100 ? "Loading..." : "Ready!"}
          </p>
        </div>

        {/* Progress bar */}
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        <p className={styles.progressText}>
          {Math.round(loadingProgress)}% loaded
        </p>
      </div>
    </div>
  );
};
