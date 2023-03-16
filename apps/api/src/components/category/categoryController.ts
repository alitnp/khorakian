import { ICategory } from "@/components/category/categoryModel";
import { IData } from "@/data/globalData";
import BaseController from "@/controller/globalControllers";

class CategoryController extends BaseController<ICategory> {
  constructor(data: IData<ICategory>) {
    super(data);
  }
}

export default CategoryController;
