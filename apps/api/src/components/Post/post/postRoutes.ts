import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { validate } from "@/helpers";
import ImageData from "@/components/image/imageData";
import VideoData from "@/components/video/videoData";
import { Video } from "@/components/video/videoModel";
import { Image } from "@/components/image/imageModel";
import { paramIdValidations } from "@/validation/globalValidations";
import auth from "@/middlewares/athenticate";
import LikeData from "@/components/Like/likeData";
import CommentData from "@/components/comment/commentData";
import { PostComment } from "@/components/Post/postComment/postCommentModel";
import PostData from "@/components/Post/post/postData";
import { Post } from "@/components/Post/post/postModel";
import { PostCategory } from "@/components/Post/postCategory/postCategoryModel";
import PostCategoryData from "@/components/Post/postCategory/postCategoryData";
import { PostLike } from "@/components/Post/postLike/postLikeModel";
import PostController from "@/components/Post/post/postController";
import {
  createPostValidations,
  deletePostValidations,
  getPostValidations,
  updatePostValidations,
} from "@/components/Post/post/postValidations";

const router = Router();
const data = new PostData(
  Post,
  new PostCategoryData(PostCategory),
  new VideoData(Video, new ImageData(Image)),
  new ImageData(Image),
  new LikeData(PostLike),
  new CommentData(PostComment),
);
const controller = new PostController(data);

//get
//get all post likes
router.get("/like", controller.getAllLikes);
//get all post comments
router.get("/comment", controller.getAllComments);
// get a signgle post with id
router.get("/:id", validate(getPostValidations), controller.get);
// get a list of posts
router.get("/", controller.getAll);

//post
//add a reply to comment by comment id
router.post(
  "/reply/:id",
  [auth, ...validate(paramIdValidations)],
  controller.reply,
);
//add a comment to post with post id and user id
router.post(
  "/comment/:id",
  [auth, ...validate(paramIdValidations)],
  controller.comment,
);
//like a post with post id and user id
router.post(
  "/like/:id",
  [auth, ...validate(paramIdValidations)],
  controller.like,
);
//dislike a post with post id and user id
router.post(
  "/dislike/:id",
  [auth, ...validate(paramIdValidations)],
  controller.disLike,
);
//create a new post - admin only
router.post(
  "/",
  [isAdmin, ...validate(createPostValidations)],
  controller.create,
);

//put
//edit an existing post - admin only
router.put(
  "/:id",
  [isAdmin, ...validate(updatePostValidations)],
  controller.update,
);

//delete
//delete a post - admin only
router.delete(
  "/:id",
  [isAdmin, ...validate(deletePostValidations)],
  controller.remove,
);

export default router;
