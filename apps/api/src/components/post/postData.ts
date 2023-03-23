import { Model } from "mongoose";
import { ApiDataListResponse, IPost } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";

class PostData implements IData<IPost> {
  Post: Model<IPost, {}, {}, {}, any>;

  constructor(PostCategory: Model<IPost, {}, {}, {}, any>) {
    this.Post = PostCategory;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IPost>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    return getAllData<IPost>(searchQuery, req, this.Post);
  };

  get = async (id: string): Promise<IPost> => {
    const postCategory = await this.Post.findById(id);
    if (!postCategory) throw new NotFoundError();

    return postCategory;
  };

  create = async ({ title }: IPost): Promise<IPost> => {
    const existingCategory = await this.Post.findOne({ title });
    if (!!existingCategory)
      throw new ConflictError("دسته بندی با این نام قبلا ثبت شده است.");

    const postCategory = new this.Post({
      title,
    });
    return await postCategory.save();
  };

  update = async ({ _id, title }: IPost): Promise<IPost> => {
    const postCategory = await this.Post.findById(_id);
    if (!postCategory) throw new NotFoundError();

    const existingContentType = await this.Post.findOne({ title });
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

  remove = async (id: string): Promise<IPost> => {
    const postCategory = await this.Post.findById(id);
    if (!postCategory) throw new NotFoundError();

    // const postsWithThisCategory = await Post.find({ "category._id": id });
    // if (postsWithThisCategory.length > 0)
    //   throw new ConflictError(
    //     "این دسته بندی در جای دیگر درحال استفاده می باشد.",
    //   );

    await this.Post.findByIdAndDelete(id);

    return postCategory;
  };
}

export default PostData;
