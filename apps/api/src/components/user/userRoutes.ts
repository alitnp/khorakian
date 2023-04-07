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
const data = new UserData(User);
const controller = new UserController(data);

//get
router.get("/getCurrentUser", auth, controller.getCurrentUser);
router.get("/:id", [isAdmin, ...validate(paramIdValidations)], controller.get);
router.get("/", isAdmin, controller.getAll);

//post
router.post(
  "/toggleUserAdminAccess/:id",
  [isAdmin, ...validate(paramIdValidations)],
  controller.toggleUserAdminAccess,
);
router.post("/login", validate(loginValidations), controller.login);
router.post("/iforgot", validate(mobileNumberValidations), controller.iForgot);
router.post("/", validate(createUserValidations), controller.create);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateUserValidations)],
  controller.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(paramIdValidations)],
  controller.remove,
);

export default router;
