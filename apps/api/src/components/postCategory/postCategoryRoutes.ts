import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { validate } from "@/helpers";
import PostCategoryController from "@/components/postCategory/postCategoryController";
import PostCategoryData from "@/components/postCategory/postCategoryData";
import { PostCategory } from "@/components/postCategory/postCategoryModel";
import {
  createPostCategoryValidations,
  deletePostCategoryValidations,
  getPostCategoryValidations,
  updatePostCategoryValidations,
} from "@/components/postCategory/postCategoryValidations";

const router = Router();
const postCategoryData = new PostCategoryData(PostCategory);
const postCategoryController = new PostCategoryController(postCategoryData);

//get
router.get(
  "/:id",
  validate(getPostCategoryValidations),
  postCategoryController.get,
);
router.get("/", postCategoryController.getAll);

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
