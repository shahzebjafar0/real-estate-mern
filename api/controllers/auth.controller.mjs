import AppError from "../../utils/appError.mjs";
import signToken from "../../utils/signJwtToken.mjs";
import { User } from "../models/userModel.mjs";

const userSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new AppError("Incorrect Email or Password", 401));
    }

    const token = signToken(user);
    res.status(200).json({
      message: "Login Successfully",
      token: token,
    });
  } catch (err) {
    console.error(err.message || err);
    next({ ...err, name: err.name });
  }
};

const userSignUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req?.body;
    if (!userName || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const newUser = {
      userName,
      email,
      password,
    };
    const user = await User.create(newUser);
    const token = signToken(newUser);
    res.status(201).json({
      message: "User Added Successfully",
      data: user,
      token: token,
    });
    return res.status(201).send(newUser);
  } catch (err) {
    console.error(err.message || err);
    next({ ...err, name: err.name });
  }
};

export const authController = { userSignIn, userSignUp };
