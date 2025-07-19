import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
  screen: {
    backgroundColor: "var(--lightBackground)",
    borderRadius: tokens.borderRadiusLarge,
    height: "var(--screenHeight)",
    display: "flex",
    flexDirection: "column",
  },
  screenValue: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    color: "var(--screenTextColor)",
    fontSize: tokens.fontSizeHero900,
    lineHeight: tokens.lineHeightBase600,
    fontWeight: tokens.fontWeightRegular,
    textShadow: "var(--textShadow)",
  },
  screenLastOperation: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: tokens.spacingHorizontalXS,
    color: "var(--screenTextColor)",
    fontSize: tokens.fontSizeBase400,
    minHeight: "24px",
  },
});
