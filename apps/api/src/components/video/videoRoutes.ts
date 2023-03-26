import { Router } from "express";
// import sharp from "sharp";
import auth from "@/middlewares/athenticate";
import { imageAndVideoForm } from "@/middlewares/fileForm";
import VideoData from "@/components/video/videoData";
import VideoController from "@/components/video/videoController";
import { Video } from "@/components/video/videoModel";
import {
  createVideoValidations,
  deleteVideoValidations,
  getVideoValidations,
} from "@/components/video/videoValidations";
import { validate } from "@/helpers";
import { Image } from "@/components/image/imageModel";
import ImageData from "@/components/image/imageData";
import isAdmin from "@/middlewares/isAdmin";

const router = Router();
const videoData = new VideoData(Video, new ImageData(Image));
const videoController = new VideoController(videoData);

//get
router.get("/:filename", validate(getVideoValidations), videoController.get);
router.get("/", videoController.getAll);

//post
router.post(
  "/upload",
  [auth, ...imageAndVideoForm(), ...validate(createVideoValidations)],
  videoController.create,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteVideoValidations)],
  videoController.remove,
);

export default router;
