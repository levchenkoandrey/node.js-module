import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { ApiError } from "./errors";
import { User } from "./models";
import { IUser } from "./Types";
import { UserValidator } from "./validators";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CRUD - create, read, update, delete.

app.get("/users", async (_, res: Response): Promise<Response<IUser[]>> => {
  try {
    const users: IUser[] = await User.find();
    return res.json(users);
  } catch (e) {
    console.log(e);
  }
});

app.post(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) throw new ApiError(error.message, 400);
      const newUser = await User.create(value);
      return res.status(201).json(newUser);
    } catch (e) {
      next(e);
    }
  }
);
app.get(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const user = await User.findById(req.params.id);
      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
);

app.put(
  "/users/:id",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const { id } = req.params;
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) throw new ApiError(error.message, 400);
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { ...value },
        { returnDocument: "after" }
      );
      return res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
);

app.delete(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<void>> => {
    try {
      const { id } = req.params;
      await User.deleteOne({ _id: id });
      return res.json({
        message: "User deleted",
      });
    } catch (e) {
      console.log(e);
    }
  }
);

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(error.status || 500).json(error.message);
});
app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT} `);
});
