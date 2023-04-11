import { IExperienceCategory } from "@my/types";
import { IData } from "@/data/globalData";
import BaseController from "@/controller/globalControllers";

class ExperienceController extends BaseController<IExperienceCategory> {
  constructor(data: IData<IExperienceCategory>) {
    super(data);
  }
}

export default ExperienceController;
