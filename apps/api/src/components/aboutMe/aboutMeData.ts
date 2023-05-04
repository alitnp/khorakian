import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IAboutMe,
  IAboutMeRead,
  IPostRead,
} from "@my/types";
import { defaultSearchQueries, paginationProps } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import PostData from "@/components/Post/post/postData";
import BadRequestError from "@/helpers/error/BadRequestError";

class AboutMeData {
  AboutMe: Model<IAboutMe>;
  Post: PostData;
  constructor(AboutMe: Model<IAboutMe>, Post: PostData) {
    this.AboutMe = AboutMe;
    this.Post = Post;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IAboutMeRead>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query._id) {
      searchQuery._id = req.query._id;
    }
    if (req.query.name) {
      searchQuery.name = { $regex: req.query.name, $options: "i" };
    }
    if (req.query.position) {
      searchQuery.position = { $regex: req.query.position, $options: "i" };
    }
    if (req.query.text) {
      searchQuery.text = { $regex: req.query.text, $options: "i" };
    }

    const {
      fixedSearchQuery,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc,
    } = await paginationProps(searchQuery, req, this.AboutMe);

    const data = await this.AboutMe.find(fixedSearchQuery)
      .populate<{ post: IPostRead }>({
        path: "post",
        populate: [{ path: "videos" }, { path: "images" }],
      })
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort(sortBy ? { [sortBy]: desc } : { creationDate: -1 })
      .lean();

    return {
      data,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc: desc === -1 ? true : false,
    };
  };

  get = async (id: string): Promise<IAboutMeRead> => {
    const item = await this.AboutMe.findById(id)
      .populate<{ post: IPostRead }>({
        path: "post",
        populate: [{ path: "videos" }, { path: "images" }],
      })
      .lean();

    if (!item) throw new NotFoundError();
    return item;
  };

  create = async ({
    postId,
    name,
    position,
    text,
  }: IAboutMe & { postId: string }): Promise<IAboutMeRead> => {
    if (!postId) throw new BadRequestError("پست ارسال نشده");
    const post = await this.Post.get(postId);
    if (!post) throw new NotFoundError("پستی با این شناسه یافت نشد");
    const item = new this.AboutMe({
      post: postId,
      name,
      position,
      text,
    });
    await item.save();
    return await this.get(item._id);
  };

  update = async ({
    _id,
    postId,
    name,
    position,
    text,
  }: IAboutMe & { postId: string }): Promise<IAboutMeRead> => {
    const aboutMe = await this.get(_id);
    if (!aboutMe) throw new NotFoundError("موردی با این شناسه یافت نشد");
    if (!postId) throw new BadRequestError("پست ارسال نشده");
    const post = await this.Post.get(postId);
    if (!post) throw new NotFoundError("پستی با این شناسه یافت نشد");
    await this.AboutMe.findByIdAndUpdate(_id, {
      $set: { post: postId, name, text, position },
    });
    return await this.get(_id);
  };

  remove = async (id: string): Promise<IAboutMeRead> => {
    const item = await this.get(id);
    await this.AboutMe.findByIdAndDelete(id);
    return item;
  };
}

export default AboutMeData;
