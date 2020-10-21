// importing package
import express from "express";

// middleware
import formidableMiddleware from "../middlewares/formidable/middleware";
import cloudinaryMiddleware from "../middlewares/upload/cloudinary.middleware";

// controller
import userController from "../controllers/user.controller";
import formController from "../controllers/form.controller";

// route
let route = express.Router();

// for updating user profile
route.post(
  "/profile",
  formidableMiddleware,
  cloudinaryMiddleware,
  userController.profile
);

// for creating form
route.post("/create", formController.new);

// for getting responses
route.post("/responses", userController.getResponses);

export default route;
