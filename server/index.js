require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 5000;
const app = express();

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
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
