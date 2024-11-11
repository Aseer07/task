import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("users", userSchema);
