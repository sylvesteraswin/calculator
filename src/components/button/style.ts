import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
  button: {
    backgroundColor: "var(--defaultBackground)",
    borderRadius: tokens.borderRadiusLarge,
    border: "none",
    minWidth: 0,
    width: "var(--buttonMinWidth)",
    height: "var(--buttonMinHeight)",
    color: "var(--screenTextColor)",
    // fontFamily: tokens.fontFamilyBase,
    fontFamily: "'Segoe UI Symbol', 'Arial Unicode MS', sans-serif",
    verticalAlign: "middle",
    // lineHeight: "1",
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightRegular,
    textShadow: "var(--textShadow)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "12px",
    "&:focus": {
      border: "1px solid var(--screenTextColor)",
    },
    "&:hover": {
      backgroundColor: "var(--defaultBackgroundHover)",
      color: "var(--screenTextColor)",
    },
  },
  buttonLight: {
    backgroundColor: "var(--lightBackground)",
    "&:hover": {
      backgroundColor: "var(--lightBackgroundHover)",
    },
  },
  buttonInverted: {
    backgroundColor: "var(--invertedBackground)",
    "&:hover": {
      backgroundColor: "var(--invertedBackgroundHover)",
    },
  },
  buttonSpan2: {
    width: "100%",
    gridColumn: "span 2 / span 2",
  },
  buttonLarge: {
    fontSize: tokens.fontSizeHero800,
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  },
});
