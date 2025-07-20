import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
  controlsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: tokens.spacingHorizontalS,
  },
  skeleton: {
    height: "20px",
    width: "120px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
    animation: "pulse 1.5s ease-in-out infinite",
  },
  labelSkeleton: {
    height: "16px",
    width: "80px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
    animation: "pulse 1.5s ease-in-out infinite",
  },
});
