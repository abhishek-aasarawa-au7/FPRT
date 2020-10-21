import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: "center",
    width: "50%",
    margin: theme.spacing(5, 2),
    padding: theme.spacing(2, 1),
    background: fade(theme.palette.primary.main, 0.5),
  },
  list: {
    listStyleType: "none",
    paddingLeft: "0px",
  },
  items: {
    margin: theme.spacing(2, 0),
  },
}));

export default useStyles;
