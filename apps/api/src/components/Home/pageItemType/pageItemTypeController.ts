import { IPageItemType } from "@my/types";
import { IData } from "@/data/globalData";
import BaseController from "@/controller/globalControllers";

class PageItemTypeController extends BaseController<IPageItemType> {
  constructor(data: IData<IPageItemType>) {
    super(data);
  }
}

export default PageItemTypeController;
