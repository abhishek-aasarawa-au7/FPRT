import mongoose, { Schema } from "mongoose";

// making schema
const userSchema = Schema;

// defining schema
const user = new userSchema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default:
        "https://res.cloudinary.com/dtyzqbg4a/image/upload/v1600945821/Default/default_image_rjiswa.png",
    },
    forms: [
      {
        type: Schema.Types.ObjectId,
        ref: "form",
      },
    ],
  },
  {
    versionKey: false,
  }
);

// creating model
const userModel = mongoose.model("user", user);

export default userModel;
