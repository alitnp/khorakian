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
import { ExperienceComment } from "@/components/experience/experienceComment/experienceCommentModel";
import ExperienceData from "@/components/experience/experience/experienceData";
import { Experience } from "@/components/experience/experience/experienceModel";
import { ExperienceCategory } from "@/components/experience/experienceCategory/experienceCategoryModel";
import ExperienceCategoryData from "@/components/experience/experienceCategory/experienceCategoryData";
import { ExperienceLike } from "@/components/experience/experienceLike/experienceLikeModel";
import ExperienceController from "@/components/experience/experience/experienceController";
import {
  createExperienceValidations,
  deleteExperienceValidations,
  getExperienceValidations,
  updateExperienceValidations,
} from "@/components/experience/experience/experienceValidations";
import { User } from "@/components/user/userModel";

const router = Router();
const data = new ExperienceData(
  Experience,
  new ExperienceCategoryData(ExperienceCategory),
  new VideoData(Video, new ImageData(Image)),
  new ImageData(Image),
  new LikeData(ExperienceLike),
  new CommentData(ExperienceComment, User),
);
const controller = new ExperienceController(data);

//get
//get all Experience likes
router.get("/like", controller.getAllLikes);
//get all Experience comments
router.get("/comment", controller.getAllComments);
router.get("/getAllWithComments", controller.getAllWithComments);
router.get("/getAllWithAdminComments", controller.getAllWithAdminComments);
// get a signgle Experience with id
router.get("/:id", validate(getExperienceValidations), controller.get);
// get a list of Experiences
router.get("/", controller.getAll);

//Experience
//add a reply to comment by comment id
router.post(
  "/reply/:id",
  [auth, ...validate(paramIdValidations)],
  controller.reply,
);
//add a comment to post with Experience id and user id
router.post(
  "/comment/:id",
  [auth, ...validate(paramIdValidations)],
  controller.comment,
);
//like a post with Experience id and user id
router.post(
  "/like/:id",
  [auth, ...validate(paramIdValidations)],
  controller.like,
);
//dislike a post with Experience id and user id
router.post(
  "/dislike/:id",
  [auth, ...validate(paramIdValidations)],
  controller.disLike,
);
//create a new Experience - admin only
router.post(
  "/",
  [isAdmin, ...validate(createExperienceValidations)],
  controller.create,
);

//put
//edit an existing Experience - admin only
router.put(
  "/:id",
  [isAdmin, ...validate(updateExperienceValidations)],
  controller.update,
);

//delete
//delete a Experience - admin only
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteExperienceValidations)],
  controller.remove,
);

export default router;
