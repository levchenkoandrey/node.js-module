import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middelwares";
import { UserValidator } from "../validators";

const router = Router();
// CRUD - create, read, update, delete.
router.get("/", userController.getAll);

router.get(
  "/:userId",
  commonMiddleware.isIDValid("userId"),
  userController.getById
);
router.put(
  "/:userId",
  commonMiddleware.isIDValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.update
);
router.delete(
  "/:userId",
  commonMiddleware.isIDValid("userId"),
  userController.delete
);

export const userRouter = router;
