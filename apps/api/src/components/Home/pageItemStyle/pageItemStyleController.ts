import { IPageItemStyle } from "@my/types";
import { IData } from "@/data/globalData";
import BaseController from "@/controller/globalControllers";

class PageItemStyleController extends BaseController<IPageItemStyle> {
  constructor(data: IData<IPageItemStyle>) {
    super(data);
  }
}

export default PageItemStyleController;
