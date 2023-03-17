import { Router } from "express";

import auth from "@/middlewares/athenticate";
import {
  createUserValidations,
  loginValidations,
  updateUserValidations,
} from "@/components/user/userValidations";
import { validate } from "@/helpers";
import isAdmin from "@/middlewares/isAdmin";
import {
  mobileNumberValidations,
  paramIdValidations,
} from "@/validation/globalValidations";
import UserData from "@/components/user/userData";
import UserController from "@/components/user/userController";
import { User } from "@/components/user/userModel";

const router = Router();
const userData = new UserData(User);
const userController = new UserController(userData);

//get
router.get("/getCurrentUser", auth, userController.getCurrentUser);
router.get(
  "/:id",
  [isAdmin, ...validate(paramIdValidations)],
  userController.get,
);
router.get("/", isAdmin, userController.getAll);

//post
router.post("/login", validate(loginValidations), userController.login);
router.post(
  "/toggleUserAdminAccess/:id",
  [isAdmin, ...validate(paramIdValidations)],
  userController.toggleUserAdminAccess,
);
router.post(
  "/iforgot",
  validate(mobileNumberValidations),
  userController.iForgot,
);
router.post("/", validate(createUserValidations), userController.create);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateUserValidations)],
  userController.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(paramIdValidations)],
  userController.remove,
);

export default router;
