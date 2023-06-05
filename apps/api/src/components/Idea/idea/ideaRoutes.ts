import IdeaController from "@/components/Idea/idea/ideaController";
import IdeaData from "@/components/Idea/idea/ideaData";
import { Idea } from "@/components/Idea/idea/ideaModel";
import {
  createIdeaValidations,
  deleteIdeaValidations,
  getIdeaValidations,
  updateIdeaValidations,
} from "@/components/Idea/idea/ideaValidation";
import IdeaCategoryData from "@/components/Idea/ideaCategory/ideaCategoryData";
import { IdeaCategory } from "@/components/Idea/ideaCategory/ideaCategoryModel";
import { IdeaLike } from "@/components/Idea/ideaLike/ideaLikeModel";
import LikeData from "@/components/Like/likeData";
import CommentData from "@/components/comment/commentData";
import { IdeaComment } from "@/components/Idea/ideaComment/ideaCommentModel";
import { validate } from "@/helpers";
import auth from "@/middlewares/athenticate";
import isAdmin from "@/middlewares/isAdmin";
import { paramIdValidations } from "@/validation/globalValidations";
import { Router } from "express";
import { User } from "@/components/user/userModel";
import UserData from "@/components/user/userData";
import ImageData from "@/components/image/imageData";
import { Image } from "@/components/image/imageModel";
import FrontEndRouteData from "@/components/frontEndRoute/frontEndRouteData";
import { FrontEndRoute } from "@/components/frontEndRoute/frontEndRouteModel";
import VideoData from "@/components/video/videoData";
import { Video } from "@/components/video/videoModel";

const router = Router();
const data = new IdeaData(
  Idea,
  new IdeaCategoryData(IdeaCategory),
  new LikeData(IdeaLike),
  new CommentData(IdeaComment, User),
  new UserData(
    User,
    new ImageData(Image),
    new FrontEndRouteData(FrontEndRoute),
  ),
  new VideoData(Video, new ImageData(Image)),
  new ImageData(Image),
);

const controller = new IdeaController(data);

//get
//get all idea likes
router.get("/like", controller.getAllLikes);
//get all idea comments
router.get("/comment", controller.getAllComments);
//get all admin post comments
router.get("/adminComments", controller.getAdminComments);
router.get("/myComments/:content", auth, controller.getMyComments);
router.get("/getapproved", controller.getApproved);
router.get("/getmy", auth, controller.getMy);
router.get("/:id", validate(getIdeaValidations), controller.get);
router.get("/", isAdmin, controller.getAll);

//post
//add a reply to comment by comment id
router.post(
  "/reply/:id",
  [auth, ...validate(paramIdValidations)],
  controller.reply,
);
//add a comment to idea with idea id and user id
router.post(
  "/comment/:id",
  [auth, ...validate(paramIdValidations)],
  controller.comment,
);
//like a idea with idea id and user id
router.post(
  "/like/:id",
  [auth, ...validate(paramIdValidations)],
  controller.like,
);
//dislike a idea with idea id and user id
router.post(
  "/dislike/:id",
  [auth, ...validate(paramIdValidations)],
  controller.disLike,
);

//approve a idea -admin only
router.post(
  "/approve/:id",
  [isAdmin, ...validate(paramIdValidations)],
  controller.approve,
);
//disapprove a idea -admin only
router.post(
  "/disapprove/:id",
  [isAdmin, ...validate(paramIdValidations)],
  controller.disApprove,
);
//create a new idea - admin only
router.post("/", [auth, ...validate(createIdeaValidations)], controller.create);

//put
//edit an existing idea - admin only
router.put(
  "/:id",
  [auth, ...validate(updateIdeaValidations)],
  controller.update,
);

//delete
//delete a idea - admin only
router.delete(
  "/:id",
  [auth, ...validate(deleteIdeaValidations)],
  controller.remove,
);

export default router;
