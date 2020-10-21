import formModel from "../models/form.model";

// utils
import catchError from "../utils/catchError";
import response from "../utils/response";

// config
import { app_url } from "../configs/appUrl";

const controller = {};

// for new form
controller.new = catchError(async (req, res, next) => {
  let form = new formModel({
    author: req.user._id,
    title: req.body.title,
    fields: req.body.fields,
  });

  // saving form
  form = await form.save();

  //   saving details in user model
  req.user.forms.push(form._id);

  await req.user.save();

  // for user to use
  let access_link = `${app_url}form/${form._id}`;

  response(res, access_link, "form created successfully", false, 200);
});

export default controller;
