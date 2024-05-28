import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

dotenv.config();
const mdbURL = process.env.MONGODB_URL;
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

mongoose
  .connect(mdbURL)
  .then((success) => {
    console.log("Connected");
    app.listen(port, () => {
      console.log("listening on port", port);
    });
  })
  .catch((error) => console.log("error", error));
