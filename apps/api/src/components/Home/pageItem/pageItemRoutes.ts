import { Router } from "express";
import PageItemController from "@/components/Home/pageItem/pageItemController";
import PageItemData from "@/components/Home/pageItem/pageItemData";
import { PageItem } from "@/components/Home/pageItem/pageItemModel";
import { validate } from "@/helpers";
import isAdmin from "@/middlewares/isAdmin";
import PageItemTypeData from "@/components/Home/pageItemType/pageItemTypeData";
import { PageItemType } from "@/components/Home/pageItemType/pageItemTypeModel";
import PageItemSortingData from "@/components/Home/pageItemSorting/pageItemSortingData";
import { PageItemSorting } from "@/components/Home/pageItemSorting/pageItemSortingModel";
import PageItemStyleData from "@/components/Home/pageItemStyle/pageItemStyleData";
import { PageItemStyle } from "@/components/Home/pageItemStyle/pageItemStyleModel";
import {
  createPageItemValidations,
  deletePageItemValidations,
  getPageItemValidations,
  updatePageItemValidations,
} from "@/components/Home/pageItem/pageItemValidations";
import LikeData from "@/components/Like/likeData";
import { PostLike } from "@/components/Post/postLike/postLikeModel";
import { ExperienceLike } from "@/components/experience/experienceLike/experienceLikeModel";
import { UserExperienceLike } from "@/components/userExperience/userExperienceLike/userExperienceLikeModel";
import { IdeaLike } from "@/components/Idea/ideaLike/ideaLikeModel";

const data = new PageItemData(
  PageItem,
  new PageItemTypeData(PageItemType),
  new PageItemSortingData(PageItemSorting),
  new PageItemStyleData(PageItemStyle),
  new LikeData(PostLike),
  new LikeData(ExperienceLike),
  new LikeData(UserExperienceLike),
  new LikeData(IdeaLike),
);
const controller = new PageItemController(data);

const router = Router();

//get
router.get("/getWithContents", controller.getWithContents);
router.get("/:id", validate(getPageItemValidations), controller.get);
router.get("/", controller.getAll);

//post
router.post(
  "/",
  [isAdmin, ...validate(createPageItemValidations)],
  controller.create,
);

//put
router.put(
  "/setIndex/:id",
  [isAdmin, ...validate(updatePageItemValidations)],
  controller.setIndex,
);
router.put(
  "/:id",
  [isAdmin, ...validate(updatePageItemValidations)],
  controller.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deletePageItemValidations)],
  controller.remove,
);

export default router;
