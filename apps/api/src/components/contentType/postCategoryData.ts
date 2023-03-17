import { ApiDataListResponse } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";
import {
  IPostCategory,
  PostCategory,
} from "@/components/contentType/PostCategoryModel";

class PostCategoryData implements IData<IPostCategory> {
  getAll = async (req: Req): Promise<ApiDataListResponse<IPostCategory>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    return getAllData<IPostCategory>(searchQuery, req, PostCategory);
  };

  get = async (id: string): Promise<IPostCategory> => {
    const postCategory = await PostCategory.findById(id);
    if (!postCategory) throw new NotFoundError();

    return postCategory;
  };

  create = async ({ title }: IPostCategory): Promise<IPostCategory> => {
    const existingCategory = await PostCategory.findOne({ title });
    if (!!existingCategory)
      throw new ConflictError("دسته بندی با این نام قبلا ثبت شده است.");

    const postCategory = new PostCategory({
      title,
    });
    return await postCategory.save();
  };

  update = async ({ _id, title }: IPostCategory): Promise<IPostCategory> => {
    const postCategory = await PostCategory.findById(_id);
    if (!postCategory) throw new NotFoundError();

    const existingContentType = await PostCategory.findOne({ title });
    if (!!existingContentType) throw new ConflictError();

    postCategory.title = title;

    // await Post.updateMany(
    //   {
    //     "category._id": _id,
    //   },
    //   {
    //     $set: {
    //       "category.title": title,
    //     },
    //   },
    // );

    return await postCategory.save();
  };

  remove = async (id: string): Promise<IPostCategory> => {
    const postCategory = await PostCategory.findById(id);
    if (!postCategory) throw new NotFoundError();

    // const postsWithThisCategory = await Post.find({ "category._id": id });
    // if (postsWithThisCategory.length > 0)
    //   throw new ConflictError(
    //     "این دسته بندی در جای دیگر درحال استفاده می باشد.",
    //   );

    await PostCategory.findByIdAndDelete(id);

    return postCategory;
  };
}

export default PostCategoryData;
