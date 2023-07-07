import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { validate } from "@/helpers";
import HistoryData from "@/components/Home/history/historyData";
import { History } from "@/components/Home/history/historyModel";
import HistoryController from "@/components/Home/history/historyController";
import {
  createHistoryValidations,
  deleteHistoryValidations,
  getHistoryValidations,
  updateHistoryValidations,
} from "@/components/Home/history/historyValidations";

const router = Router();
const data = new HistoryData(History);
const controller = new HistoryController(data);

//get
router.get("/:id", validate(getHistoryValidations), controller.get);
router.get("/", controller.getAll);

//post
router.post(
  "/",
  [isAdmin, ...validate(createHistoryValidations)],
  controller.create
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateHistoryValidations)],
  controller.update
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteHistoryValidations)],
  controller.remove
);

export default router;
