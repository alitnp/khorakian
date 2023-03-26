import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { validate } from "@/helpers";
import IdeaCategoryController from "@/components/ideaCategory/ideaCategoryController";
import IdeaCategoryData from "@/components/ideaCategory/ideaCategoryData";
import { IdeaCategory } from "@/components/ideaCategory/ideaCategoryModel";
import {
  createIdeaCategoryValidations,
  deleteIdeaCategoryValidations,
  getIdeaCategoryValidations,
  updateIdeaCategoryValidations,
} from "@/components/ideaCategory/ideaCategoryValidations";

const router = Router();
const ideaCategoryData = new IdeaCategoryData(IdeaCategory);
const ideaCategoryController = new IdeaCategoryController(ideaCategoryData);

//get
router.get(
  "/:id",
  validate(getIdeaCategoryValidations),
  ideaCategoryController.get,
);
router.get("/", ideaCategoryController.getAll);

//idea
router.post(
  "/",
  [isAdmin, ...validate(createIdeaCategoryValidations)],
  ideaCategoryController.create,
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateIdeaCategoryValidations)],
  ideaCategoryController.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteIdeaCategoryValidations)],
  ideaCategoryController.remove,
);

export default router;
