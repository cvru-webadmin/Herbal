import { Router } from "express";
import {
  fetchUser,
  login,
  logout,
  updatePassword,
} from "../controllers/auth.controller";
import asyncHandler from "../utility/asyncHandler";

const authRoute = Router();

authRoute.route("/login").post(asyncHandler(login));
authRoute.route("/fetchUser").get(asyncHandler(fetchUser));
authRoute.route("/logout").get(asyncHandler(logout));
authRoute.route("/updatePassword").post(asyncHandler(updatePassword));

export default authRoute;
