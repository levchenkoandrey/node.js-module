import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IUser } from "../Types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const user = await userService.getById(userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const updatedUser = await userService.update(userId, req.body);
      return res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;
      await userService.delete(userId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
