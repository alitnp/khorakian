import { IPost } from "@my/types";
import { IData } from "@/data/globalData";
import BaseController from "@/controller/globalControllers";

class PostController extends BaseController<IPost> {
  constructor(data: IData<IPost>) {
    super(data);
  }
}

export default PostController;
