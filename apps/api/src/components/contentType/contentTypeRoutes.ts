import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { paramIdValidations } from "@/validation/globalValidations";
import { validate } from "@/helpers";
import ContentTypeController from "@/components/contentType/contentTypeController";
import ContentTypeData from "@/components/contentType/contentTypeData";
import {
  createContentTypeValidations,
  deleteContentTypeValidations,
  updateContentTypeValidations,
} from "@/components/contentType/contentTypeValidations";

const router = Router();
const contentTypeData = new ContentTypeData();
const contentTypeController = new ContentTypeController(contentTypeData);

//get
router.get("/", contentTypeController.getAll);
router.get("/:id", validate(paramIdValidations), contentTypeController.get);

//post
router.post(
  "/",
  [isAdmin, ...validate(createContentTypeValidations)],
  contentTypeController.create,
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateContentTypeValidations)],
  contentTypeController.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteContentTypeValidations)],
  contentTypeController.remove,
);

export default router;
