import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { paramIdValidations } from "@/validation/globalValidations";
import { validate } from "@/helpers";
import PostCategoryController from "@/components/postCategory/postCategoryController";
import PostCategoryData from "@/components/postCategory/postCategoryData";
import { PostCategory } from "@/components/postCategory/postCategoryModel";
import {
  createPostCategoryValidations,
  deletePostCategoryValidations,
  updatePostCategoryValidations,
} from "@/components/postCategory/postCategoryValidations";

const router = Router();
const postCategoryData = new PostCategoryData(PostCategory);
const postCategoryController = new PostCategoryController(postCategoryData);

//get
router.get("/", postCategoryController.getAll);
router.get("/:id", validate(paramIdValidations), postCategoryController.get);

//post
router.post(
  "/",
  [isAdmin, ...validate(createPostCategoryValidations)],
  postCategoryController.create,
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updatePostCategoryValidations)],
  postCategoryController.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deletePostCategoryValidations)],
  postCategoryController.remove,
);

export default router;
