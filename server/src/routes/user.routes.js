import { Router } from "express";
import {
  userSignup,
  userLogin,
  userLogout,
  googleUser,
  uploadImage,
} from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.post("/signup", userSignup);

userRouter.post("/login", userLogin);
userRouter.get("/logout", userLogout);
userRouter.post("/googleuser", googleUser);
userRouter.post("/uploadimage/:id", uploadImage);

export default userRouter;
