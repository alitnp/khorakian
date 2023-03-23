import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { validate } from "@/helpers";
import { Post } from "@/components/post/postModel";
import PostData from "@/components/post/postData";
import PostController from "@/components/post/postController";
import {
  createPostValidations,
  deletePostValidations,
  getPostValidations,
  updatePostValidations,
} from "@/components/post/postValidations";

const router = Router();
const postData = new PostData(Post);
const postController = new PostController(postData);

//get
router.get("/:id", validate(getPostValidations), postController.get);
router.get("/", postController.getAll);

//post
router.post(
  "/",
  [isAdmin, ...validate(createPostValidations)],
  postController.create,
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updatePostValidations)],
  postController.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deletePostValidations)],
  postController.remove,
);

export default router;
