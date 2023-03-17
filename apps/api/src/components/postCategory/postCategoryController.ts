import { IPostCategory } from "@my/types";
import { IData } from "@/data/globalData";
import BaseController from "@/controller/globalControllers";

class PostCategoryController extends BaseController<IPostCategory> {
  constructor(data: IData<IPostCategory>) {
    super(data);
  }
}

export default PostCategoryController;
