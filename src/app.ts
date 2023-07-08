import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import reteLimit from "express-rate-limit";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

const apiLimiter = reteLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
});
app.use("/*", apiLimiter);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Origin",
      "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(error.status || 500).json(error.message);
});
app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`Server has started on PORT ${configs.PORT} `);
});
export const NODE_TLS_REJECT_UNAUTHORIZED = "0";
