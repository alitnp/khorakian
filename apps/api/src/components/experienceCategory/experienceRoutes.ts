import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { validate } from "@/helpers";
import ExperienceCategoryController from "@/components/experienceCategory/experienceController";
import ExperienceCategoryData from "@/components/experienceCategory/experienceData";
import { ExperienceCategory } from "@/components/experienceCategory/experienceModel";
import {
  createExperienceCategoryValidations,
  deleteExperienceCategoryValidations,
  getExperienceCategoryValidations,
  updateExperienceCategoryValidations,
} from "@/components/experienceCategory/experienceValidations";

const router = Router();
const experienceCategoryData = new ExperienceCategoryData(ExperienceCategory);
const experienceCategoryController = new ExperienceCategoryController(
  experienceCategoryData,
);

//get
router.get(
  "/:id",
  validate(getExperienceCategoryValidations),
  experienceCategoryController.get,
);
router.get("/", experienceCategoryController.getAll);

//post
router.post(
  "/",
  [isAdmin, ...validate(createExperienceCategoryValidations)],
  experienceCategoryController.create,
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateExperienceCategoryValidations)],
  experienceCategoryController.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteExperienceCategoryValidations)],
  experienceCategoryController.remove,
);

export default router;
