import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import {
  createCategoryValidations,
  deleteCategoryValidations,
  updateCategoryValidations,
} from "@/components/category/categoryValidations";
import { paramIdValidations } from "@/validation/globalValidations";
import { validate } from "@/helpers";
import CategoryData from "@/components/category/categoryData";
import CategoryController from "@/components/category/categoryController";

const router = Router();
const categoryData = new CategoryData();
const categoryController = new CategoryController(categoryData);

//get
router.get("/", categoryController.getAll);
router.get("/:id", validate(paramIdValidations), categoryController.get);

//post
router.post(
  "/",
  [isAdmin, ...validate(createCategoryValidations)],
  categoryController.create,
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateCategoryValidations)],
  categoryController.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteCategoryValidations)],
  categoryController.remove,
);

export default router;
