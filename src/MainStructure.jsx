import React, { Fragment } from "react";

// components
import SignUp from "./client/components/SignUp/SignUp";
import SignIn from "./client/components/SignIn/SignIn";
import SignOut from "./client/components/SignOut/SignOut";
import Profile from "./client/components/Profile/Profile";
import Notification from "./client/components/Notification/Notification";
import Navbar from "./client/components/Navbar/Navbar";

const MainStructure = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <Notification />
      <SignUp />
      <SignIn />
      <SignOut />
      <Profile />
    </Fragment>
  );
};

export default MainStructure;
