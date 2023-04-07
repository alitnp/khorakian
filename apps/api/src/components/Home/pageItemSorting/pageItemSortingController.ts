import { IPageItemSorting } from "@my/types";
import { IData } from "@/data/globalData";
import BaseController from "@/controller/globalControllers";

class PageItemSortingController extends BaseController<IPageItemSorting> {
  constructor(data: IData<IPageItemSorting>) {
    super(data);
  }
}

export default PageItemSortingController;
