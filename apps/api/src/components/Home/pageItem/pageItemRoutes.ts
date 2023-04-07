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

const data = new PageItemData(
  PageItem,
  new PageItemTypeData(PageItemType),
  new PageItemSortingData(PageItemSorting),
  new PageItemStyleData(PageItemStyle),
);
const controller = new PageItemController(data);

const router = Router();

//get
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
