import { Router } from "express";
// import sharp from "sharp";
import auth from "@/middlewares/athenticate";
import { videoForm } from "@/middlewares/fileForm";
import VideoData from "@/components/video/videoData";
import VideoController from "@/components/video/videoController";
import { Video } from "@/components/video/videoModel";
import {
  createVideoValidations,
  getVideoValidations,
} from "@/components/video/videoValidations";
import { validate } from "@/helpers";

const router = Router();
const videoData = new VideoData(Video);
const videoController = new VideoController(videoData);

//get
router.get("/:filename", validate(getVideoValidations), videoController.get);

//post
router.post(
  "/upload",
  [auth, ...videoForm(), ...validate(createVideoValidations)],
  videoController.create,
);

export default router;
