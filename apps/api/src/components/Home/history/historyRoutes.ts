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
const historyData = new HistoryData(History);
const historyController = new HistoryController(historyData);

//get
router.get("/:id", validate(getHistoryValidations), historyController.get);
router.get("/", historyController.getAll);

//post
router.post(
  "/",
  [isAdmin, ...validate(createHistoryValidations)],
  historyController.create,
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateHistoryValidations)],
  historyController.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(deleteHistoryValidations)],
  historyController.remove,
);

export default router;
