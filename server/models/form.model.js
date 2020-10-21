import mongoose, { Schema } from "mongoose";
import moment from "moment";

// making schema
const formSchema = Schema;

// defining schema
const form = new formSchema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    fields: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    responses: [
      {
        type: String,
      },
    ],
    createdOn: {
      type: String,
      default: moment().format("Do MMM, YYYY"),
    },
  },
  {
    versionKey: false,
  }
);

// creating model
const formModel = mongoose.model("form", form);

export default formModel;
