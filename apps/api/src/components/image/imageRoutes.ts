import { Router } from "express";
// import sharp from "sharp";
import auth from "@/middlewares/athenticate";
import imageForm from "@/middlewares/imageForm";
import ImageController from "@/components/image/imageController";
import ImageData from "@/components/image/imageData";
import { Image } from "@/components/image/imageModel";

const router = Router();
const imageData = new ImageData(Image);
const imageController = new ImageController(imageData);

//get
// router.get("/:id", validate(paramIdValidations), postCategoryController.get);

//post
router.post("/upload", [auth, ...imageForm()], imageController.create);
router.post("/imageWasUsed/:id", [auth], imageController.imageWasUsed);
router.post("/manyImageWasUsed", [auth], imageController.manyImageWasUsed);

export default router;
