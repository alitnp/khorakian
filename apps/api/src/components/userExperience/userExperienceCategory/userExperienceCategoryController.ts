import { IData } from "@/data/globalData";
import { IUserExperienceCategory } from "@my/types";
import BaseController from "@/controller/globalControllers";

class UserExperienceCategoryController extends BaseController<IUserExperienceCategory> {
  constructor(data: IData<IUserExperienceCategory>) {
    super(data);
  }
}

export default UserExperienceCategoryController;
