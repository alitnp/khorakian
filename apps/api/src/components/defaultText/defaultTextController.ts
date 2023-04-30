import { IDefaultText } from "@my/types";
import BaseController from "@/controller/globalControllers";
import { IData } from "@/data/globalData";

class DefaultTextController extends BaseController<IDefaultText> {
  constructor(data: IData<IDefaultText>) {
    super(data);
  }
}

export default DefaultTextController;
