import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "var(--wrapperBackground)",
    width: "var(--wrapperWidth)",
    height: "var(--wrapperHeight)",
    padding: "var(--wrapperPaddingTop) var(--wrapperPaddingLeft)",
    borderRadius: tokens.borderRadiusLarge,
  },
});
