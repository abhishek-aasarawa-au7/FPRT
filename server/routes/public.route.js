// importing package
import express from "express";

// controller
import publicController from "../controllers/public.controller";

// route
let route = express.Router();

// for fetching form from link
route.get("/search", publicController.search);

// for saving response
route.post("/save", publicController.saveResponse);

export default route;
