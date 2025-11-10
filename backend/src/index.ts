import dotenv from "dotenv";
dotenv.config();

import { connectDb } from "./config/dbConnection";
import express from "express";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import { corsOptions } from "./config/corsOption";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;
connectDb();

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb");
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
