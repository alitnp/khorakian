import { Model } from "mongoose";
import { IPageItemSorting } from "@my/types";
import { BasicData } from "@/data/globalData";
import { pageItemSortingPersianName } from "@/components/Home/pageItemSorting/pageItemSortingModel";

class PageItemSortingData extends BasicData<IPageItemSorting> {
  constructor(PageItemType: Model<IPageItemSorting>) {
    super(PageItemType, pageItemSortingPersianName);
  }
}

export default PageItemSortingData;
