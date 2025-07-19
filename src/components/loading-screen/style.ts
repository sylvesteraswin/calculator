import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "var(--lightBackground)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  container: {
    textAlign: "center",
    color: "var(--screenTextColor)",
  },
  title: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightBold,
    marginBottom: tokens.spacingVerticalS,
    color: "var(--screenTextColor)",
  },
  subtitle: {
    fontSize: tokens.fontSizeBase500,
    opacity: 0.9,
    marginBottom: tokens.spacingVerticalXL,
    color: "var(--screenTextColor)",
  },
  progressContainer: {
    width: "256px",
    height: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: tokens.spacingVerticalM,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "var(--screenTextColor)",
    borderRadius: tokens.borderRadiusLarge,
    transition: "width 300ms ease-out",
  },
  progressText: {
    fontSize: tokens.fontSizeBase300,
    opacity: 0.75,
    color: "var(--screenTextColor)",
  },
});
