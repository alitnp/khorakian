import { IData } from "@/data/globalData";
import { IIdeaCategory } from "@my/types";
import BaseController from "@/controller/globalControllers";

class IdeaCategoryController extends BaseController<IIdeaCategory> {
  constructor(data: IData<IIdeaCategory>) {
    super(data);
  }
}

export default IdeaCategoryController;
