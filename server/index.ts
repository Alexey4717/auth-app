import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import router from "./router/index";
import errorMiddleware from "./middlewares/error-middleware";


const PORT = process.env.PORT || 5000;
const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(
  cors({
    credentials: true, // apply cookie
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware); //custom errorMiddleware always in end of uses chain

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
