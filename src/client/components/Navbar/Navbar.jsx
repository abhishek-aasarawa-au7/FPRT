import React, { Fragment, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

// style
import useStyles from "./navBar.style";

// reducer actions
import {
  signin,
  signup,
  signout,
  profile,
} from "../../redux/actions/sign.action";
import { Button } from "@material-ui/core";

const NavBar = (props) => {
  const {
    toggleSignIn,
    toggleSignUp,
    toggleSignOut,
    toggleProfile,
    isLogin,
    userName,
  } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleModal = (event) => {
    console.log(event.target.innerText);
    if (
      event.target.innerText === "Sign-In" ||
      event.target.innerText === "SIGN IN"
    ) {
      toggleSignIn();
    }
    if (
      event.target.innerText === "Sign-Up" ||
      event.target.innerText === "SIGN UP"
    ) {
      toggleSignUp();
    }
    if (
      event.target.innerText === "Sign-Out" ||
      event.target.innerText === "SIGN OUT"
    ) {
      toggleSignOut();
    }
    if (
      event.target.innerText === "Profile" ||
      event.target.innerText === "PROFILE"
    ) {
      toggleProfile();
    }
    handleMenuClose();
  };

  const toTitleName = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1, name.length);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {" "}
      {isLogin
        ? [
            <MenuItem name="profile" key="profile" onClick={toggleModal}>
              Profile
            </MenuItem>,
            <MenuItem name="signout" key="signout" onClick={toggleModal}>
              Sign-Out
            </MenuItem>,
          ]
        : [
            <MenuItem name="signin" key="signin" onClick={toggleModal}>
              Sign-In
            </MenuItem>,
            <MenuItem name="signup" key="signup" onClick={toggleModal}>
              Sign-Up
            </MenuItem>,
          ]}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isLogin
        ? [
            <MenuItem name="profile" key="profile" onClick={toggleModal}>
              Profile
            </MenuItem>,
            <MenuItem name="signout" key="signout" onClick={toggleModal}>
              Sign-Out
            </MenuItem>,
          ]
        : [
            <MenuItem name="signin" key="signin" onClick={toggleModal}>
              Sign-In
            </MenuItem>,
            <MenuItem name="signup" key="signup" onClick={toggleModal}>
              Sign-Up
            </MenuItem>,
          ]}
    </Menu>
  );

  // return component ----------------------------------------------------------------
  return (
    <div className={classes.grow}>
      <AppBar position="sticky">
        <Toolbar>
          {/*logo*/}
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className={classes.wrapper}>
              <div className={classes.items}>
                <Typography
                  color="secondary"
                  className={classes.title}
                  variant="h6"
                  noWrap
                >
                  MERN
                </Typography>
              </div>
              <div className={classes.items}>
                <Typography
                  color="secondary"
                  className={classes.title}
                  variant="h6"
                  noWrap
                >
                  {" "}
                  -{" "}
                </Typography>
              </div>
              <div className={classes.items}>
                <Typography
                  color="secondary"
                  className={classes.title}
                  variant="h6"
                  noWrap
                >
                  F
                </Typography>
              </div>
              <div className={classes.items}>
                <Typography
                  color="secondary"
                  className={classes.title}
                  variant="h6"
                  noWrap
                >
                  O
                </Typography>
              </div>
              <div className={classes.items}>
                <Typography
                  color="secondary"
                  className={classes.title}
                  variant="h6"
                  noWrap
                >
                  R
                </Typography>
              </div>
              <div className={classes.items}>
                <Typography
                  color="secondary"
                  className={classes.title}
                  variant="h6"
                  noWrap
                >
                  M
                </Typography>
              </div>
              <div className={classes.items}>
                <Typography
                  color="secondary"
                  className={classes.title}
                  variant="h6"
                  noWrap
                >
                  S
                </Typography>
              </div>
            </div>
          </Link>

          {/*space*/}
          <div className={classes.grow} />

          <Typography
            color="secondary"
            className={classes.title}
            variant="subtitle1"
            noWrap
          >
            Hello, {!!userName ? toTitleName(userName) : "Guest"}
          </Typography>

          {/*profile icon*/}
          <div className={classes.sectionDesktop}>
            {/* <IconButton
              edge="end"
              onClick={handleProfileMenuOpen}
              color="secondary"
            >
              <AccountCircle />
            </IconButton> */}
            {!isLogin ? (
              <Fragment>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  name="signin"
                  key="signin"
                  onClick={toggleModal}
                >
                  Sign In
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  name="signup"
                  key="signup"
                  onClick={toggleModal}
                >
                  Sign Up
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  name="profile"
                  key="profile"
                  onClick={toggleModal}
                >
                  Profile
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  name="signout"
                  key="signout"
                  onClick={toggleModal}
                >
                  Sign Out
                </Button>
              </Fragment>
            )}
          </div>

          {/*profile icon mobile version*/}
          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen} color="secondary">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: !isEmpty(state.userData),
    userName: state.userData.name,
    userImg: state.userData.img,
  };
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
    toggleSignOut: () => {
      dispatch({
        type: signout,
      });
    },
    toggleProfile: () => {
      dispatch({
        type: profile,
      });
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(withRouter(NavBar));
