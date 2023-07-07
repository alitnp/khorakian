import { Router } from "express";
// import sharp from "sharp";
import auth from "@/middlewares/athenticate";
import { videoForm } from "@/middlewares/fileForm";
import VideoData from "@/components/video/videoData";
import VideoController from "@/components/video/videoController";
import { Video } from "@/components/video/videoModel";
import {
  createVideoValidations,
  deleteVideoValidations,
  getVideoValidations,
  playVideoValidations,
  updateVideoValidations,
} from "@/components/video/videoValidations";
import { validate } from "@/helpers";
import { Image } from "@/components/image/imageModel";
import ImageData from "@/components/image/imageData";
import isAdmin from "@/middlewares/isAdmin";

const router = Router();
const data = new VideoData(Video, new ImageData(Image));
const controller = new VideoController(data);

//get
router.get("/detail/:id", validate(getVideoValidations), controller.get);
router.get("/:filename", validate(playVideoValidations), controller.play);
router.get("/", auth, controller.getAll);

//post
router.post(
  "/upload",
  [auth, ...videoForm(), ...validate(createVideoValidations)],
  controller.create
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateVideoValidations)],
  controller.update
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteVideoValidations)],
  controller.remove
);

export default router;
