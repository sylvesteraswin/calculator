import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
  buttonWrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gap: "8px",
    paddingTop: "8px",
  },
});
