// model
import formModel from "../models/form.model";

// utils
import response from "../utils/response";
import catchError from "../utils/catchError";

export default {
  // for finding form from link
  search: catchError(async (req, res, next) => {
    let id = req.params.id;
    let form = await formModel.findById(id).populate("author", "name").exec();
    // if not found
    if (!form)
      return response(
        res,
        [],
        "Form not found. Make Sure you have right url",
        true,
        404
      );

    response(res, form, "Form successfully fetched", false, 200);
  }),

  // for saving response
  saveResponse: catchError(async (req, res, next) => {
    let { id, resp } = req.body;

    // find form
    let form = await formModel.findById(id);

    // if not found
    if (!form)
      return response(res, [], "form not found. Please check link", true, 404);

    form.responses.push(resp);

    await form.save();

    response(
      res,
      [],
      "Your response successfully recorded. Thank you!",
      false,
      200
    );
  }),
};
