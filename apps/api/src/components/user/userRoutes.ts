import { Router } from "express";

import auth from "@/middlewares/athenticate";
import {
  changePasswordValidations,
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
import { Image } from "@/components/image/imageModel";
import ImageData from "@/components/image/imageData";
import { imageForm } from "@/middlewares/fileForm";

const router = Router();
const data = new UserData(User, new ImageData(Image));
const controller = new UserController(data);

//get
router.get("/getMyNotifications", auth, controller.getMyNotifications);
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
router.post("/uploadProfile", [auth, ...imageForm()], controller.uploadProfile);
router.post("/", validate(createUserValidations), controller.create);

//put
router.put(
  "/changePassword",
  [auth, ...validate(changePasswordValidations)],
  controller.changePassword,
);
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
