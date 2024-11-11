import mongoose from "mongoose";
const empSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: "Please enter a valid 10-digit mobile number",
      },
    },
    dsg: {
      type: String,
      enum: ["Hr", "Manager", "Sales"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    course: {
      type: String,
      enum: ["mca", "bca", "bsc"],
      required: true,
    },
    imgupload: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", empSchema);
