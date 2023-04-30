import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { validate } from "@/helpers";
import { paramIdValidations } from "@/validation/globalValidations";
import auth from "@/middlewares/athenticate";
import DirectMessageData from "@/components/directMessage/directMessageData";
import {
  createDirectMessageValidations,
  deleteDirectMessageValidations,
  // getDirectMessageValidations,
  updateDirectMessageValidations,
} from "@/components/directMessage/directMessageValidations";
import DirectMessageController from "@/components/directMessage/directMessageController";
import { User } from "@/components/user/userModel";
import { DirectMessage } from "@/components/directMessage/directMessageModel";

const router = Router();
const data = new DirectMessageData(DirectMessage, User);
const controller = new DirectMessageController(data);

//get
// get a signgle  DirectMessage with id
// router.get("/:id", validate(getDirectMessageValidations), controller.get);
// get a list of  DirectMessages
router.get("/", controller.getAll);

//post
//add a reply to comment by comment id
router.post(
  "/reply/:id",
  [auth, ...validate(paramIdValidations)],
  controller.reply,
);
//add a DirectMessage to post with  DirectMessage id and user id
// router.post(
//   "/directMessage/:id",
//   [auth, ...validate(paramIdValidations)],
//   controller.comment,
// );

//create a new  DirectMessage
router.post(
  "/",
  [auth, ...validate(createDirectMessageValidations)],
  controller.create,
);

//put
//edit an existing DirectMessage - admin only
router.put(
  "/:id",
  [isAdmin, ...validate(updateDirectMessageValidations)],
  controller.update,
);

//delete
//delete a DirectMessage - admin only
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteDirectMessageValidations)],
  controller.remove,
);

export default router;
