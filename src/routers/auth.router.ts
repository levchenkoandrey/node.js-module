import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware, userMiddleware } from "../middelwares";
import { ICredentials } from "../Types/token.types";
import { UserValidator } from "../validators";

const router = Router();
router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.findAndThrow("email"),
  authController.register
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isUserExist<ICredentials>("email"),
  authController.login
);
export const authRouter = router;
