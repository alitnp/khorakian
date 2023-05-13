import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { validate } from "@/helpers";
import {
  createDefaultTextValidations,
  deleteDefaultTextValidations,
  updateDefaultTextValidations,
  getDefaultTextValidations,
  getByKeyDefaultTextValidations,
} from "@/components/defaultText/defaultTextValidations";
import DefaultTextData from "@/components/defaultText/defaultTextData";
import DefaultTextController from "@/components/defaultText/defaultTextController";
import { DefaultText } from "@/components/defaultText/defaultTextModel";

const router = Router();
const data = new DefaultTextData(DefaultText);
const controller = new DefaultTextController(data);

//get
router.get(
  "/getByKey/:key",
  validate(getByKeyDefaultTextValidations),
  controller.getByKey,
);
// get a signgle DefaultText with id
router.get("/:id", validate(getDefaultTextValidations), controller.get);
// get a list of DefaultText
router.get("/", controller.getAll);

//post
//create a new DefaultText - admin only
router.post(
  "/",
  [isAdmin, ...validate(createDefaultTextValidations)],
  controller.create,
);

//put
//edit an existing DefaultText - admin only
router.put(
  "/:id",
  [isAdmin, ...validate(updateDefaultTextValidations)],
  controller.update,
);

//delete
//delete a DefaultText - admin only
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteDefaultTextValidations)],
  controller.remove,
);

export default router;
