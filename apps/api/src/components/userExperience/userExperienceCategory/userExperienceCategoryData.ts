import { Model } from "mongoose";
import { IUserExperienceCategory } from "@my/types";
import { BasicData } from "@/data/globalData";
import { userExperienceCategoryPersianName } from "@/components/userExperience/userExperienceCategory/userExperienceCategoryModel";

class UserExperienceCategoryData extends BasicData<IUserExperienceCategory> {
  constructor(PageItemType: Model<IUserExperienceCategory>) {
    super(PageItemType, userExperienceCategoryPersianName);
  }
}

export default UserExperienceCategoryData;
