import { useAppLoading } from "../../hooks/useAppLoading";
import { useStyles } from "./style";

export const LoadingScreen = () => {
  const { isLoading, loadingProgress } = useAppLoading();
  const styles = useStyles();

  if (!isLoading) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-label="Loading calculator"
      aria-describedby="loading-description"
    >
      <div className={styles.container}>
        <header>
          <h1 className={styles.title}>Calculator</h1>
          <p className={styles.subtitle} id="loading-description">
            {loadingProgress < 100 ? "Loading..." : "Ready!"}
          </p>
        </header>

        {/* Progress bar */}
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${loadingProgress}%` }}
            role="progressbar"
            aria-valuenow={loadingProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Loading progress"
            aria-describedby="progress-text"
          />
        </div>

        <p className={styles.progressText} id="progress-text">
          {Math.round(loadingProgress)}% loaded
        </p>
      </div>
    </div>
  );
};
