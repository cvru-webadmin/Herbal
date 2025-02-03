import express from "express";
import cors from "cors";
import session from "express-session";
import { connectDb } from "./database/db.connection";
import authRoute from "./routes/auth.routes";
import herbsRoute from "./routes/herbs.routes";
import { fileUpload } from "./middleware/multer";
import asyncHandler from "./utility/asyncHandler";
import { addHerbs } from "./controllers/herbs.controller";

(async () => {
  await connectDb();
  const app = express();

  app.use(express.json());
  app.use(express.static("public"));

  const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];
  app.use(
    cors({
      origin: function (origin, callback) {
        if (origin && allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(null, true);
        }
      },
      credentials: true,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
      exposedHeaders: ["Set-Cookie"],
    })
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY || "Express Secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000,
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  app.use("/auth", authRoute);
  app.use("/herbs", herbsRoute);
  app.post("/addHerb", fileUpload.single("thumbnail"), asyncHandler(addHerbs));

  app.listen(process.env.PORT, () => {
    console.log("Server is running on ", process.env.PORT);
  });
})();
