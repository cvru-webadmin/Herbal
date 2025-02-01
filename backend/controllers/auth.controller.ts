import type { Request, Response } from "express";
import { User } from "../database/user.model";
import ApiError from "../utility/apiError";

export const login = async (req: Request, res: Response) => {
  if (req.session.userSession) {
    throw new ApiError(
      404,
      "Authenticated",
      "Already authorized. No need to request again!"
    );
  }
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ password, email });
  if (!user)
    throw new ApiError(
      404,
      "Wrong credentials",
      "Wrong email or password please try again!"
    );

  // @ts-ignore
  req.session.userSession = user.id;
  res.status(200).json({ email: user.email, name: user.name });
};

export const logout = async (req: Request, res: Response) => {
  if (req.session) {
    req.session.destroy(() => {});
    res.status(200).json({ message: "Logout successfull!" });
  } else {
    throw new ApiError(
      401,
      "Please loging first",
      "You are not authenticated. Please login first!"
    );
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  if (req.session.userSession) {
    const user = await User.findById(req.session.userSession);
    if (!user)
      throw new ApiError(
        404,
        "Wrong credentials",
        "Wrong email or password please try again!"
      );

    // @ts-ignore
    req.session.userSession = user.id;
    res.status(200).json({ email: user.email, name: user.name });
  } else {
    throw new ApiError(
      401,
      "Please loging first",
      "You are not authenticated. Please login first!"
    );
  }
};
