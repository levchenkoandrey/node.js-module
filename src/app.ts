import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import { cronRunner } from "./crons";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(error.status || 500).json(error.message);
});
app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`Server has started on PORT ${configs.PORT} `);
});
export const NODE_TLS_REJECT_UNAUTHORIZED = "0";
