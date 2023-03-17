import { IData } from "@/data/globalData";
import BaseController from "@/controller/globalControllers";
import { IPostCategory } from "@/components/contentType/PostCategoryModel";

class PostCategoryController extends BaseController<IPostCategory> {
  constructor(data: IData<IPostCategory>) {
    super(data);
  }
}

export default PostCategoryController;
