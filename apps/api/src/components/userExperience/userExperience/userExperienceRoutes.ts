import UserExperienceController from "@/components/userExperience/userExperience/userExperienceController";
import UserExperienceData from "@/components/userExperience/userExperience/userExperienceData";
import { UserExperience } from "@/components/userExperience/userExperience/userExperienceModel";
import {
  createUserExperienceValidations,
  deleteUserExperienceValidations,
  getUserExperienceValidations,
  updateUserExperienceValidations,
} from "@/components/userExperience/userExperience/userExperienceValidation";
import UserExperienceCategoryData from "@/components/userExperience/userExperienceCategory/userExperienceCategoryData";
import { UserExperienceCategory } from "@/components/userExperience/userExperienceCategory/userExperienceCategoryModel";
import { UserExperienceLike } from "@/components/userExperience/userExperienceLike/userExperienceLikeModel";
import LikeData from "@/components/Like/likeData";
import CommentData from "@/components/comment/commentData";
import { UserExperienceComment } from "@/components/userExperience/userExperienceComment/userExperienceCommentModel";
import { validate } from "@/helpers";
import auth from "@/middlewares/athenticate";
import isAdmin from "@/middlewares/isAdmin";
import { paramIdValidations } from "@/validation/globalValidations";
import { Router } from "express";

const router = Router();
const data = new UserExperienceData(
  UserExperience,
  new UserExperienceCategoryData(UserExperienceCategory),
  new LikeData(UserExperienceLike),
  new CommentData(UserExperienceComment),
);

const controller = new UserExperienceController(data);

//get
//get all userExperience likes
router.get("/like", controller.getAllLikes);
//get all userExperience comments
router.get("/comment", controller.getAllComments);
// get a signgle userExperience with id
router.get("/:id", validate(getUserExperienceValidations), controller.get);
// get a list of userExperience
router.get("/", controller.getAll);

//post
//add a reply to comment by comment id
router.post(
  "/reply/:id",
  [auth, ...validate(paramIdValidations)],
  controller.reply,
);
//add a comment to userExperience with userExperience id and user id
router.post(
  "/comment/:id",
  [auth, ...validate(paramIdValidations)],
  controller.comment,
);
//like a userExperience with userExperience id and user id
router.post(
  "/like/:id",
  [auth, ...validate(paramIdValidations)],
  controller.like,
);
//dislike a userExperience with userExperience id and user id
router.post(
  "/dislike/:id",
  [auth, ...validate(paramIdValidations)],
  controller.disLike,
);
//create a new userExperience - admin only
router.post(
  "/",
  [isAdmin, ...validate(createUserExperienceValidations)],
  controller.create,
);

//approve a userExperience -admin only
router.post(
  "/approve/:id",
  [isAdmin, ...validate(paramIdValidations)],
  controller.approve,
);
//disapprove a userExperience -admin only
router.post(
  "/disapprove/:id",
  [isAdmin, ...validate(paramIdValidations)],
  controller.disApprove,
);

//put
//edit an existing userExperience - admin only
router.put(
  "/:id",
  [isAdmin, ...validate(updateUserExperienceValidations)],
  controller.update,
);

//delete
//delete a userExperience - admin only
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteUserExperienceValidations)],
  controller.remove,
);

export default router;
