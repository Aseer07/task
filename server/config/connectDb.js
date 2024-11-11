import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const res = await mongoose.connect(process.env.mongoUrl);
    if (res) {
      console.log("database connected successfully");
    } else {
      console.log("error in database connection");
    }
  } catch (error) {
    console.log(error);
  }
};
console.log(process.env.mongoUrl, "uri");
