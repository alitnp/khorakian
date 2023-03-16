import { IAuthor } from "@/components/author/authorModel";
import BaseController from "@/controller/globalControllers";
import { IData } from "@/data/globalData";

class AuthorController extends BaseController<IAuthor> {
  constructor(data: IData<IAuthor>) {
    super(data);
  }
}

export default AuthorController;
