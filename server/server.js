import express from "express";
// import { configDotenv } from "dotenv";
// import { config as configDotenv } from "dotenv";
import dotenv from "dotenv";

import cors from "cors";
import { connectDb } from "./config/connectDb.js";
import user from "./route/user.js";
import emp from "./route/emp.js";
// configDotenv();
dotenv.configDotenv();

connectDb();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/public", express.static("public"));
app.use("/api/v1/user", user);
app.use("/api/v1/emp", emp);

const PORT = process.env.Port;
console.log(PORT, "PORT");
app.listen(PORT, () => {
  console.log(`server is running succesfully  at the ${PORT}`);
});
