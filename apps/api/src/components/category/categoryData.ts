import { ApiDataListResponse } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";
import { Book } from "@/components/book/bookModel";
import { Category, ICategory } from "@/components/category/categoryModel";

class CategoryData implements IData<ICategory> {
  getAll = async (req: Req): Promise<ApiDataListResponse<ICategory>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    return getAllData<ICategory>(searchQuery, req, Category);
  };

  get = async (id: string): Promise<ICategory> => {
    const category = await Category.findById(id);
    if (!category) throw new NotFoundError();

    return category;
  };

  create = async ({ title }: ICategory): Promise<ICategory> => {
    const existingCategory = await Category.findOne({ title });
    if (!!existingCategory)
      throw new ConflictError("دسته بندی با این نام قبلا ثبت شده است.");

    const category = new Category({
      title,
    });
    return await category.save();
  };

  update = async ({ _id, title }: ICategory): Promise<ICategory> => {
    const category = await Category.findById(_id);
    if (!category) throw new NotFoundError();

    const existingCategory = await Category.findOne({ title });
    if (!!existingCategory) throw new ConflictError();

    category.title = title;

    await Book.updateMany(
      {
        "category._id": _id,
      },
      {
        $set: {
          "category.title": title,
        },
      },
    );

    return await category.save();
  };

  remove = async (id: string): Promise<ICategory> => {
    const category = await Category.findById(id);
    if (!category) throw new NotFoundError();

    const booksWithThisCategory = await Book.find({ "category._id": id });
    if (booksWithThisCategory.length > 0)
      throw new ConflictError(
        "این دسته بندی در جای دیگر درحال استفاده می باشد.",
      );

    await Category.findByIdAndDelete(id);

    return category;
  };
}

export default CategoryData;
