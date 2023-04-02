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
import { paramIdValidations } from "@/validation/globalValidations";
import auth from "@/middlewares/athenticate";
import { PostLike } from "@/components/Like/postLikeModel";
import LikeData from "@/components/Like/likeData";

const router = Router();
const postData = new PostData(
  Post,
  new PostCategoryData(PostCategory),
  new VideoData(Video, new ImageData(Image)),
  new ImageData(Image),
  new LikeData(PostLike),
);
const postController = new PostController(postData);

//get
// get a signgle post with id
router.get("/:id", validate(getPostValidations), postController.get);
// get a list of posts
router.get("/", postController.getAll);

//post
//like a post with post id and user id
router.post(
  "/like/:id",
  [auth, ...validate(paramIdValidations)],
  postController.like,
);
//dislike a post with post id and user id
router.post(
  "/dislike/:id",
  [auth, ...validate(paramIdValidations)],
  postController.disLike,
);
//create a new post - admin only
router.post(
  "/",
  [isAdmin, ...validate(createPostValidations)],
  postController.create,
);

//put
//edit an existing post - admin only
router.put(
  "/:id",
  [isAdmin, ...validate(updatePostValidations)],
  postController.update,
);

//delete
//delete a post - admin only
router.delete(
  "/:id",
  [isAdmin, ...validate(deletePostValidations)],
  postController.remove,
);

export default router;
