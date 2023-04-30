import { validate } from "@/helpers";
import auth from "@/middlewares/athenticate";
import isAdmin from "@/middlewares/isAdmin";
import { Router } from "express";
import AboutMeData from "@/components/aboutMe/aboutMeData";
import { AboutMe } from "@/components/aboutMe/aboutMeModel";
import PostData from "@/components/Post/post/postData";
import { Post } from "@/components/Post/post/postModel";
import AboutMeController from "@/components/aboutMe/aboutMeController";
import {
  createAboutMeValidations,
  deleteAboutMeValidations,
  getAboutMeValidations,
  updateAboutMeValidations,
} from "@/components/aboutMe/aboutMeValidation";
import ImageData from "@/components/image/imageData";
import { Image } from "@/components/image/imageModel";
import { PostCategory } from "@/components/Post/postCategory/postCategoryModel";
import { Video } from "@/components/video/videoModel";
import { PostLike } from "@/components/Post/postLike/postLikeModel";
import { PostComment } from "@/components/Post/postComment/postCommentModel";
import VideoData from "@/components/video/videoData";
import PostCategoryData from "@/components/Post/postCategory/postCategoryData";
import LikeData from "@/components/Like/likeData";
import CommentData from "@/components/comment/commentData";

const router = Router();
const data = new AboutMeData(
  AboutMe,
  new ImageData(Image),
  new PostData(
    Post,
    new PostCategoryData(PostCategory),
    new VideoData(Video, new ImageData(Image)),
    new ImageData(Image),
    new LikeData(PostLike),
    new CommentData(PostComment),
  ),
);

const controller = new AboutMeController(data);

//get
// get a signgle aboutme with id
router.get("/:id", validate(getAboutMeValidations), controller.get);
// get a list of aboutme
router.get("/", controller.getAll);

//create a new aboutme - admin only
router.post(
  "/",
  [auth, ...validate(createAboutMeValidations)],
  controller.create,
);

//put
//edit an existing aboutme - admin only
router.put(
  "/:id",
  [isAdmin, ...validate(updateAboutMeValidations)],
  controller.update,
);

//delete
//delete a aboutme - admin only
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteAboutMeValidations)],
  controller.remove,
);

export default router;
