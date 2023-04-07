import { Model } from "mongoose";
import { IPageItemStyle } from "@my/types";
import { BasicData } from "@/data/globalData";
import { pageItemTypePersianName } from "@/components/Home/pageItemType/pageItemTypeModel";

class PageItemStyleData extends BasicData<IPageItemStyle> {
  constructor(PageItemType: Model<IPageItemStyle>) {
    super(PageItemType, pageItemTypePersianName);
  }
}

export default PageItemStyleData;
