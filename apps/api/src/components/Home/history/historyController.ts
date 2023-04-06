import { IHistory } from "@my/types";
import BaseController from "@/controller/globalControllers";
import { IData } from "@/data/globalData";

class HistoryController extends BaseController<IHistory> {
  constructor(data: IData<IHistory>) {
    super(data);
  }
}

export default HistoryController;
