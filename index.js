import "module-alias/register.js";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./api/routes/user.route.mjs";
import authRoutes from "./api/routes/auth.route.mjs";
import errorHandler from "./api/middlewares/errorHandler.middleware.mjs";
import AppError from "./utils/appError.mjs";
import authenticateToken from "./api/middlewares/auth.middleware.mjs";

const app = express();

dotenv.config();
const mdbURL = process.env.MONGODB_URL;
const port = process.env.PORT || 4000;

mongoose
  .connect(mdbURL)
  .then((success) => {
    console.log("Connected");
    app.listen(port, () => {
      console.log("listening on port", port);
    });
  })
  .catch((error) => console.log("error", error));

app.use(bodyParser.json());
app.use("/api/v1/users",authenticateToken, userRoutes);
app.use("/api/v1/auth", authRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find url: '${req.originalUrl}' on this server`, 404))
})

app.use(errorHandler);
