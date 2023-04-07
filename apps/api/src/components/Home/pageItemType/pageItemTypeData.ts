import { Model } from "mongoose";
import { IPageItemType } from "@my/types";
import { BasicData } from "@/data/globalData";
import { pageItemTypePersianName } from "@/components/Home/pageItemType/pageItemTypeModel";

class PageItemTypeData extends BasicData<IPageItemType> {
  constructor(PageItemType: Model<IPageItemType>) {
    super(PageItemType, pageItemTypePersianName);
  }
}

export default PageItemTypeData;
