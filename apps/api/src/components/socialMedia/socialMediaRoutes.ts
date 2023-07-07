import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { validate } from "@/helpers";
import ImageData from "@/components/image/imageData";
import { Image } from "@/components/image/imageModel";
import {
  createSocialMediaValidations,
  deleteSocialMediaValidations,
  getSocialMediaValidations,
  updateSocialMediaValidations,
} from "@/components/socialMedia/SocialMediaValidations";
import SocialMediaData from "@/components/socialMedia/socialMediaData";
import SocialMediaController from "@/components/socialMedia/socialMediaController";
import { SocialMedia } from "@/components/socialMedia/socialMediaModel";

const router = Router();
const data = new SocialMediaData(SocialMedia, new ImageData(Image));
const controller = new SocialMediaController(data);

//get
// get a signgle post with id
router.get("/:id", validate(getSocialMediaValidations), controller.get);
// get a list of posts
router.get("/", controller.getAll);

//post
//create a new post - admin only
router.post(
  "/",
  [isAdmin, ...validate(createSocialMediaValidations)],
  controller.create
);

//put
//edit an existing post - admin only
router.put(
  "/:id",
  [isAdmin, ...validate(updateSocialMediaValidations)],
  controller.update
);

//delete
//delete a post - admin only
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteSocialMediaValidations)],
  controller.remove
);

export default router;
