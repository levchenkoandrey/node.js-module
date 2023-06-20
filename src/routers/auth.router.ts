import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware, userMiddleware } from "../middelwares";
import { UserValidator } from "../validators";

const router = Router();
router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  authController.register
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isUserExist("email"),
  authController.login
);
export const authRouter = router;
