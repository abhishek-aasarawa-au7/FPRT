import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// axios
import httpRequest from "../../config/axios.config";

// styles
import useStyles from "./body.style";

// reducer actions
import { signin, signup } from "../../redux/actions/sign.action";
import { SET_NOTIFICATION } from "../../redux/actions/notification.action";

// user data reducer
import { setUserData } from "../../utils/storageData";

// config
import homeUrl from "../../config/url";

//  signin component -----------------------------------------------
const SignIn = ({
  toggleSignUp,
  toggleSignIn,
  setNotification,
  setUser,
  history,
}) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().trim().required("Required!"),
      password: Yup.string().trim().required("Required!"),
    }),
  });

  // formik input handle
  let onChangeHandle = (e) => {
    formik.setFieldTouched(e.target.id);
    return formik.handleChange(e);
  };

  // on click submit
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        email: formik.values.email,
        password: formik.values.password,
      };
      let response = await httpRequest({
        method: "POST",
        url: `${homeUrl}api/users/login`,
        data,
      });

      // if all good
      setNotification({
        open: true,
        severity: "success",
        msg: response.data.msg,
      });

      // setting data to local storage
      setUser(response.data.data.user, response.data.data.token);

      // switching to user home
      toggleSignIn();

      if (history.location.pathname !== "/form") history.push("/all");
    } catch (err) {
      if (!!err.response) {
        setNotification({
          open: true,
          severity: "error",
          msg: err.response.data.msg,
        });
      }
    }
  };

  // return component -----------------------------------------------------------
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} noValidate onSubmit={onFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onChangeHandle}
            error={formik.errors.email && formik.touched.email}
            helperText={formik.errors.email}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChangeHandle}
            error={formik.errors.password && formik.touched.password}
            helperText={formik.errors.password}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!!formik.errors.email || !!formik.errors.password}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item>
              <Link
                className={classes.link}
                variant="body2"
                onClick={() => {
                  toggleSignIn();
                  toggleSignUp();
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    toggleSignUp: () => {
      dispatch({
        type: signup,
      });
    },
    toggleSignIn: () => {
      dispatch({
        type: signin,
      });
    },
    setNotification: (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { ...data },
      });
    },
    setUser: (data, token) => dispatch(setUserData(data, token)),
  };
};

export default connect(null, mapActionToProps)(withRouter(SignIn));
