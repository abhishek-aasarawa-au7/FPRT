import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";

// import style
import useStyles from "./home.style";
import { Grid } from "@material-ui/core";

const Home = ({ history }) => {
  const classes = useStyles();

  useEffect(() => {
    // checking for token
    if (!!localStorage.getItem("token")) {
      history.push("/all");
    }
  }, [history]);

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} className={classes.heading}>
        <Typography variant="h1" color="primary">
          Welcome
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" color="primary" align="center">
          Please SignUp and/or SignIn to create and see your form responses.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
