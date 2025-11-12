import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { connectDB } from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";

config();
const app = express(); // create express app

// middlewares
app.use(express.json()); // to parse json data
app.use(cookieParser()); // to parse cookies
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
); // to allow cross-origin requests
app.use(morgan()); // to log HTTP requests
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
); // to set various HTTP headers for security


app.get("/", (req, res) => {
  res.send({
    message: "server is running",
  });
});

app.use('/api/user', userRouter);

const port = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(port, () => {
    console.log("server is running on", port);
  });
});
