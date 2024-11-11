import { User } from "../model/user.js";
import { passwordEncrypt } from "../utils/password.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const RegisterController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).send({
        success: false,
        message: "please fill all the feilds",
      });
    }
    const hashed = await passwordEncrypt(password);
    const reg = await User({ userName, password: hashed }).save();
    return res.status(201).send({
      success: true,
      message: "user Register Successfully",
      reg,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "erorr in register",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    console.log(user, "user name");
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "this email is not register",
      });
    }
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(400).send({
        success: false,
        message: "this password is not matched",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.jwtSecret, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "user login successfully",
      token,
      userName: user.userName,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "erorr in login",
      error: error.message,
    });
  }
};
