import { Model } from "mongoose";
import { IIdeaCategory } from "@my/types";
import { BasicData } from "@/data/globalData";
import { ideaCategoryPersianName } from "@/components/Idea/ideaCategory/ideaCategoryModel";

class IdeaCategoryData extends BasicData<IIdeaCategory> {
  constructor(PageItemType: Model<IIdeaCategory>) {
    super(PageItemType, ideaCategoryPersianName);
  }
}

export default IdeaCategoryData;
