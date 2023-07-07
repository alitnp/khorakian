import { Router } from "express";
import { validate } from "@/helpers";
import isAdmin from "@/middlewares/isAdmin";
import DefaultImageData from "@/components/defaultImage/defaultImageData";
import { DefaultImage } from "@/components/defaultImage/defaultImageModel";
import ImageData from "@/components/image/imageData";
import { Image } from "@/components/image/imageModel";
import DefaultImageController from "@/components/defaultImage/defaultImageController";
import {
  createDefaultImageValidations,
  deleteDefaultImageValidations,
  getByKeyDefaultImageValidations,
  getDefaultImageValidations,
  updateDefaultImageValidations,
} from "@/components/defaultImage/defaultImageValidations";

const data = new DefaultImageData(DefaultImage, new ImageData(Image));
const controller = new DefaultImageController(data);

const router = Router();

//get
router.get(
  "/getByKey/:key",
  validate(getByKeyDefaultImageValidations),
  controller.getByKey
);
router.get("/:id", validate(getDefaultImageValidations), controller.get);
router.get("/", controller.getAll);

//post
router.post(
  "/",
  [isAdmin, ...validate(createDefaultImageValidations)],
  controller.create
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateDefaultImageValidations)],
  controller.update
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteDefaultImageValidations)],
  controller.remove
);

export default router;
