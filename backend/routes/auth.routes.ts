import { Router } from "express";
import { fetchUser, login, logout } from "../controllers/auth.controller";
import asyncHandler from "../utility/asyncHandler";

const authRoute = Router();

authRoute.route("/login").post(asyncHandler(login));
authRoute.route("/fetchUser").get(asyncHandler(fetchUser));
authRoute.route("/logout").get(asyncHandler(logout));

export default authRoute;
