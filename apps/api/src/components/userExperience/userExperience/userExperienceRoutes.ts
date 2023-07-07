import UserExperienceController from "@/components/userExperience/userExperience/userExperienceController";
import UserExperienceData from "@/components/userExperience/userExperience/userExperienceData";
import { UserExperience } from "@/components/userExperience/userExperience/userExperienceModel";
import {
  createUserExperienceValidations,
  deleteUserExperienceValidations,
  getUserExperienceValidations,
  updateUserExperienceValidations,
} from "@/components/userExperience/userExperience/userExperienceValidation";
import { UserExperienceLike } from "@/components/userExperience/userExperienceLike/userExperienceLikeModel";
import LikeData from "@/components/Like/likeData";
import CommentData from "@/components/comment/commentData";
import { UserExperienceComment } from "@/components/userExperience/userExperienceComment/userExperienceCommentModel";
import { validate } from "@/helpers";
import auth from "@/middlewares/athenticate";
import isAdmin from "@/middlewares/isAdmin";
import { paramIdValidations } from "@/validation/globalValidations";
import { Router } from "express";
import { User } from "@/components/user/userModel";
import ExperienceCategoryData from "@/components/experience/experienceCategory/experienceCategoryData";
import { ExperienceCategory } from "@/components/experience/experienceCategory/experienceCategoryModel";
import UserData from "@/components/user/userData";
import ImageData from "@/components/image/imageData";
import { Image } from "@/components/image/imageModel";
import FrontEndRouteData from "@/components/frontEndRoute/frontEndRouteData";
import { FrontEndRoute } from "@/components/frontEndRoute/frontEndRouteModel";

const router = Router();
const data = new UserExperienceData(
  UserExperience,
  new ExperienceCategoryData(ExperienceCategory),
  new LikeData(UserExperienceLike),
  new CommentData(UserExperienceComment, User),
  new UserData(User, new ImageData(Image), new FrontEndRouteData(FrontEndRoute))
);

const controller = new UserExperienceController(data);

//get
//get all userExperience likes
router.get("/like", controller.getAllLikes);
//get all userExperience comments
router.get("/comment", controller.getAllComments);
//get all admin post comments
router.get("/adminComments", controller.getAdminComments);
router.get("/myComments/:content", auth, controller.getMyComments);
router.get("/getapproved", controller.getApproved);
router.get("/getmy", auth, controller.getMy);
router.get("/:id", validate(getUserExperienceValidations), controller.get);
router.get("/", controller.getAll);

//post
//add a reply to comment by comment id
router.post(
  "/reply/:id",
  [auth, ...validate(paramIdValidations)],
  controller.reply
);
//add a comment to userExperience with userExperience id and user id
router.post(
  "/comment/:id",
  [auth, ...validate(paramIdValidations)],
  controller.comment
);
//like a userExperience with userExperience id and user id
router.post(
  "/like/:id",
  [auth, ...validate(paramIdValidations)],
  controller.like
);
//dislike a userExperience with userExperience id and user id
router.post(
  "/dislike/:id",
  [auth, ...validate(paramIdValidations)],
  controller.disLike
);
//create a new userExperience - admin only
router.post(
  "/",
  [auth, ...validate(createUserExperienceValidations)],
  controller.create
);

//approve a userExperience -admin only
router.post(
  "/approve/:id",
  [isAdmin, ...validate(paramIdValidations)],
  controller.approve
);
//disapprove a userExperience -admin only
router.post(
  "/disapprove/:id",
  [isAdmin, ...validate(paramIdValidations)],
  controller.disApprove
);

//put
//edit an existing userExperience - admin only
router.put(
  "/:id",
  [auth, ...validate(updateUserExperienceValidations)],
  controller.update
);

//delete
//delete a userExperience - admin only
router.delete(
  "/:id",
  [auth, ...validate(deleteUserExperienceValidations)],
  controller.remove
);

export default router;
