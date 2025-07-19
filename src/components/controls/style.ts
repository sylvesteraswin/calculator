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
});
