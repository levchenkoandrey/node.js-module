import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware, commonMiddleware } from "../middelwares";
import { UserValidator } from "../validators";

const router = Router();
// CRUD - create, read, update, delete.
router.get("/", userController.getAll);

router.get(
  "/:userId",
  commonMiddleware.isIDValid("userId"),
  authMiddleware.checkAccessToken,
  userController.getById
);
router.put(
  "/:userId",
  commonMiddleware.isIDValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  authMiddleware.checkAccessToken,
  userController.update
);
router.delete(
  "/:userId",
  commonMiddleware.isIDValid("userId"),
  authMiddleware.checkAccessToken,
  userController.delete
);

export const userRouter = router;
