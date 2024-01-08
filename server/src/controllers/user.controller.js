import errorHandel from "../errors/errorHandel.js";
import { createToken } from "../utils/Token.js";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
export const userSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return next(errorHandel(401, "user already have an account"));
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashpassword,
    });
    await user.save();
    const { password: pass, ...rest } = user._doc;
    const token = createToken(user._id.toString(), user.email, "7d");
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });

    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandel(401, "User is not Authorized"));
    }
    const checkpassword = bcrypt.compareSync(password, user.password);
    if (!checkpassword) {
      return next(errorHandel(401, "Password is Incorrect !"));
    }
    const { password: pass, ...rest } = user._doc;
    const token = createToken(user._id.toString(), user.email, "7d");
    res
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleUser = async (req, res, next) => {
  const { username, email, photo } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const { password: pass, ...rest } = user._doc;
      const token = createToken(user._id.toString(), user.email, "7d");
      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        photo,
      });
      await newUser.save();
      const { password: pass, ...rest } = newUser._doc;
      const token = createToken(user._id.toString(), user.email, "7d");
      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
    });
    return res.status(200).json("Logout Successfully");
  } catch (error) {
    next(error);
  }
};

export const uploadImage = async (req, res, next) => {
  const { id } = req.params;
  const { photo } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      photo,
    },
    {
      new: true,
    }
  );
  const { password, ...rest } = user._doc;
  res.status(200).json(rest);
};
