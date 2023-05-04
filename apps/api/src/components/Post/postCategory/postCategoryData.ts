import { Model } from "mongoose";
import { ApiDataListResponse, IPostCategory } from "@my/types";
import { defaultSearchQueries, getAllData, IData } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";

class PostCategoryData implements IData<IPostCategory> {
  PostCategory: Model<IPostCategory, {}, {}, {}, any>;

  constructor(PostCategory: Model<IPostCategory, {}, {}, {}, any>) {
    this.PostCategory = PostCategory;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IPostCategory>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    return await getAllData<IPostCategory>(searchQuery, req, this.PostCategory);
  };

  get = async (id: string): Promise<IPostCategory> => {
    const postCategory = await this.PostCategory.findById(id);
    if (!postCategory)
      throw new NotFoundError("دسته بندی پست مورد نظر یافت نشد.");

    return postCategory;
  };

  create = async ({ title }: IPostCategory): Promise<IPostCategory> => {
    const existingCategory = await this.PostCategory.findOne({ title });
    if (!!existingCategory)
      throw new ConflictError("دسته بندی با این نام قبلا ثبت شده است.");

    const postCategory = new this.PostCategory({
      title,
    });
    return await postCategory.save();
  };

  update = async ({ _id, title }: IPostCategory): Promise<IPostCategory> => {
    const postCategory = await this.PostCategory.findById(_id);
    if (!postCategory) throw new NotFoundError();

    const existingContentType = await this.PostCategory.findOne({ title });
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
    const postCategory = await this.PostCategory.findById(id);
    if (!postCategory) throw new NotFoundError();

    // const postsWithThisCategory = await Post.find({ "category._id": id });
    // if (postsWithThisCategory.length > 0)
    //   throw new ConflictError(
    //     "این دسته بندی در جای دیگر درحال استفاده می باشد.",
    //   );

    await this.PostCategory.findByIdAndDelete(id);

    return postCategory;
  };
}

export default PostCategoryData;
