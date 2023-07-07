import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { validate } from "@/helpers";
import FrontEndRouteData from "@/components/frontEndRoute/frontEndRouteData";
import { FrontEndRoute } from "@/components/frontEndRoute/frontEndRouteModel";
import FrontEndRouteController from "@/components/frontEndRoute/frontEndRouteController";
import {
  createFrontEndRouteValidations,
  deleteFrontEndRouteValidations,
  getFrontEndRouteValidations,
  updateFrontEndRouteValidations,
} from "@/components/frontEndRoute/frontEndRouteValidations";

const router = Router();
const data = new FrontEndRouteData(FrontEndRoute);
const controller = new FrontEndRouteController(data);

//get
// get a signgle DefaultText with id
router.get(
  "/:id",
  [isAdmin, ...validate(getFrontEndRouteValidations)],
  controller.get
);
// get a list of DefaultText
router.get("/", isAdmin, controller.getAll);

//post
//create a new DefaultText - admin only
router.post(
  "/",
  [isAdmin, ...validate(createFrontEndRouteValidations)],
  controller.create
);

//put
//edit an existing DefaultText - admin only
router.put(
  "/:id",
  [isAdmin, ...validate(updateFrontEndRouteValidations)],
  controller.update
);

//delete
//delete a DefaultText - admin only
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteFrontEndRouteValidations)],
  controller.remove
);

export default router;
