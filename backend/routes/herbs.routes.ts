import { Router } from "express";
import asyncHandler from "../utility/asyncHandler";
import { getHerbs, getHerb, deleteHerb } from "../controllers/herbs.controller";

const herbsRoute = Router();

herbsRoute.route("/get-herbs").get(asyncHandler(getHerbs));
herbsRoute.route("/get/:id").get(asyncHandler(getHerb));
herbsRoute.route("/delete/:id").delete(asyncHandler(deleteHerb));
// herbsRoute
//   .route("/add-data")
//   .post(fileUpload.single("/file"), asyncHandler(addHerbs));

export default herbsRoute;
