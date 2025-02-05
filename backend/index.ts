import express from "express";
import cors from "cors";
import session from "express-session";
import { connectDb } from "./database/db.connection";
import authRoute from "./routes/auth.routes";
import herbsRoute from "./routes/herbs.routes";
import { fileUpload } from "./middleware/multer";
import asyncHandler from "./utility/asyncHandler";
import { addHerbs } from "./controllers/herbs.controller";
import MongoStore from "connect-mongo";

(async () => {
  await connectDb();
  const app = express();

  app.use(express.json());
  app.use(express.static("public"));

  const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];
  /*app.use((_, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://chhaigaonudyami.com"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true"); // If you are using cookies or sessions
    next();
  });*/
  app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://chhaigaonudyami.com"); // Allow only this origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  app.use(
    cors({
      origin: function (origin, callback) {
        if (origin && allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Origin",
      ],
      exposedHeaders: ["Set-Cookie"],
    })
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY || "Express Secret",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongoUrl: `${process.env.MONGO_URI}/${process.env.DB_NAME}?authSource=${process.env.DB_AUTH_SOURCE}`,
        collectionName: "sessions",
        autoRemove: "native",
        ttl: 86400000,
      }),
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
