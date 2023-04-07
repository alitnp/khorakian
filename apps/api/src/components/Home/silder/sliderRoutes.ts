import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { validate } from "@/helpers";
import {
  createSliderValidations,
  deleteSliderValidations,
  getSliderValidations,
  updateSliderValidations,
} from "@/components/Home/silder/sliderValidations";
import SliderData from "@/components/Home/silder/sliderData";
import { Slider } from "@/components/Home/silder/sliderModel";
import SliderController from "@/components/Home/silder/sliderController";

const router = Router();
const sliderData = new SliderData(Slider);
const sliderController = new SliderController(sliderData);

//get
router.get("/:id", validate(getSliderValidations), sliderController.get);
router.get("/", sliderController.getAll);

//post
router.post(
  "/",
  [isAdmin, ...validate(createSliderValidations)],
  sliderController.create,
);

//put
router.put(
  "/setIndex/:id",
  [isAdmin, ...validate(updateSliderValidations)],
  sliderController.setIndex,
);
router.put(
  "/:id",
  [isAdmin, ...validate(updateSliderValidations)],
  sliderController.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteSliderValidations)],
  sliderController.remove,
);

export default router;
