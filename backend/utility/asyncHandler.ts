import { type Request, type Response, type NextFunction } from "express";
import ApiError from "./apiError";

const asyncHandler = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    func(req, res, next).catch((error: ApiError) => {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message, name: error.name });
    });
  };
};

export default asyncHandler;
