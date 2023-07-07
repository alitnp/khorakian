import { Router } from "express";
// import sharp from "sharp";
import auth from "@/middlewares/athenticate";
import ImageController from "@/components/image/imageController";
import ImageData from "@/components/image/imageData";
import { Image } from "@/components/image/imageModel";
import { imageForm } from "@/middlewares/fileForm";
import {
  createImageValidations,
  deleteImageValidations,
  getImageValidations,
  updateImageValidations,
} from "@/components/image/imageValidations";
import { validate } from "@/helpers";
import isAdmin from "@/middlewares/isAdmin";

const router = Router();
const data = new ImageData(Image);
const controller = new ImageController(data);

//get
router.get("/:id", validate(getImageValidations), controller.get);
router.get("/", controller.getAll);

//post
router.post(
  "/upload",
  [auth, ...imageForm(), ...validate(createImageValidations)],
  controller.createImageFile
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateImageValidations)],
  controller.update
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteImageValidations)],
  controller.remove
);

export default router;
