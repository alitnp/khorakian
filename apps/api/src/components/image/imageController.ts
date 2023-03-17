import { IImage } from "@my/types";
import { IData } from "@/data/globalData";

class PostCategoryController {
  data: IData<IImage>;
  constructor(data: IData<IImage>) {
    this.data = data;
  }
}

export default PostCategoryController;
