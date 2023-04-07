import { Router } from "express";
import { IBasicController } from "@/controller/globalControllers";
import { validate } from "@/helpers";
import auth from "@/middlewares/athenticate";
import isAdmin from "@/middlewares/isAdmin";
import {
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const basicCrud = (controller: IBasicController, adminOnly = false) => {
  const router = Router();
  const authenticator = adminOnly ? isAdmin : auth;

  //get
  router.get("/:id", validate(paramIdValidations), controller.get);
  router.get("/", controller.getAll);

  //idea
  router.post(
    "/",
    [authenticator, ...validate(shortTitleValidations)],
    controller.create,
  );

  //put
  router.put(
    "/:id",
    [isAdmin, ...validate([...paramIdValidations, ...shortTitleValidations])],
    controller.update,
  );

  //delete
  router.delete(
    "/:id",
    [isAdmin, ...validate(paramIdValidations)],
    controller.remove,
  );

  return router;
};
