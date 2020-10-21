// importing package
import express from "express";

// controller
import userController from "../controllers/user.controller";

// route
let route = express.Router();

// paths
route.post("/login", userController.login);
route.post("/signup", userController.signup);

export default route;
