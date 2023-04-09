import { IdeaLike } from "@/components/Like/ideaLikeModel";
import LikeData from "@/components/Like/likeData";
import CommentData from "@/components/comment/commentData";
import { IdeaComment } from "@/components/comment/ideaCommentModel";
import IdeaController from "@/components/idea/ideaController";
import IdeaData from "@/components/idea/ideaData";
import { Idea } from "@/components/idea/ideaModel";
import {
  createIdeaValidations,
  deleteIdeaValidations,
  getIdeaValidations,
  updateIdeaValidations,
} from "@/components/idea/ideaValidation";
import IdeaCategoryData from "@/components/ideaCategory/ideaCategoryData";
import { IdeaCategory } from "@/components/ideaCategory/ideaCategoryModel";
import { validate } from "@/helpers";
import auth from "@/middlewares/athenticate";
import isAdmin from "@/middlewares/isAdmin";
import { paramIdValidations } from "@/validation/globalValidations";
import { Router } from "express";

const router = Router();
const data = new IdeaData(
  Idea,
  new IdeaCategoryData(IdeaCategory),
  new LikeData(IdeaLike),
  new CommentData(IdeaComment),
);

const controller = new IdeaController(data);

//get
//get all idea likes
router.get("/like", controller.getAllLikes);
//get all idea comments
router.get("/comment", controller.getAllComments);
// get a signgle idea with id
router.get("/:id", validate(getIdeaValidations), controller.get);
// get a list of idea
router.get("/", controller.getAll);

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
//create a new idea - admin only
router.post(
  "/",
  [isAdmin, ...validate(createIdeaValidations)],
  controller.create,
);

//put
//edit an existing idea - admin only
router.put(
  "/:id",
  [isAdmin, ...validate(updateIdeaValidations)],
  controller.update,
);

//delete
//delete a idea - admin only
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteIdeaValidations)],
  controller.remove,
);

export default router;
