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
const imageData = new ImageData(Image);
const imageController = new ImageController(imageData);

//get
router.get("/:id", validate(getImageValidations), imageController.get);
router.get("/", imageController.getAll);

//post
router.post(
  "/upload",
  [auth, ...imageForm(), ...validate(createImageValidations)],
  imageController.createImageFile,
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateImageValidations)],
  imageController.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteImageValidations)],
  imageController.remove,
);

export default router;
