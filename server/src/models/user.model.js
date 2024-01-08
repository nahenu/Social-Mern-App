import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    photo: {
      type: String,
      default:
        "https://cambodiaict.net/wp-content/uploads/2019/12/computer-icons-user-profile-google-account-photos-icon-account.jpg",
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
