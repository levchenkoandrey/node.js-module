import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../Types";

class UserMiddleware {
  public isUserExist(field: keyof IUser) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] });
        if (!user) {
          throw new ApiError("user is not found", 422);
        }
        req.res.locals.user = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const userMiddleware = new UserMiddleware();
