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
import ImageData from "@/components/image/imageData";
import VideoData from "@/components/video/videoData";
import PostCategoryData from "@/components/postCategory/postCategoryData";
import { PostCategory } from "@/components/postCategory/postCategoryModel";
import { Video } from "@/components/video/videoModel";
import { Image } from "@/components/image/imageModel";

const router = Router();
const postData = new PostData(
  Post,
  new PostCategoryData(PostCategory),
  new VideoData(Video, new ImageData(Image)),
  new ImageData(Image),
);
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
