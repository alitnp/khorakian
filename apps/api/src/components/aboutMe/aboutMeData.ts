import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IImage,
  IAboutMe,
  IAboutMeRead,
  IPostRead,
} from "@my/types";
import { paginationProps } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import ImageData from "@/components/image/imageData";
import PostData from "@/components/Post/post/postData";

class AboutMeData {
  AboutMe: Model<IAboutMe, {}, {}, {}, any>;
  Image: ImageData;
  Post: PostData;
  constructor(
    AboutMe: Model<IAboutMe, {}, {}, {}, any>,
    Image: ImageData,
    Post: PostData,
  ) {
    this.AboutMe = AboutMe;
    this.Image = Image;
    this.Post = Post;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IAboutMeRead>> => {
    const searchQuery: any = {};
    if (req.query._id) {
      searchQuery._id = req.query._id;
    }
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };

    if (req.query.text)
      searchQuery.text = {
        $regex: req.query.text,
        $options: "i",
      };

    const {
      fixedSearchQuery,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc,
    } = await paginationProps(searchQuery, req, this.AboutMe);

    const data: IAboutMeRead[] = await this.AboutMe.find(fixedSearchQuery)
      .populate<{ images: IImage[]; posts: IPostRead[] }>(["images", "posts"])
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
    const item = (await this.AboutMe.findById(id)
      .populate<{ images: IImage[]; posts: IPostRead[] }>(["images", "posts"])
      .lean()) as IAboutMeRead;

    if (!item) throw new NotFoundError();
    return item;
  };

  create = async ({
    title,
    text,
    posts,
    images,
  }: IAboutMe): Promise<IAboutMeRead> => {
    const item = new this.AboutMe({
      title,
      text,
      posts,
      images,
    });
    await item.save();
    return await this.get(item._id);
  };

  update = async ({
    _id,
    title,
    text,
    posts,
    images,
  }: IAboutMe): Promise<IAboutMeRead> => {
    const item = await this.AboutMe.findByIdAndUpdate(_id, {
      $set: {
        title,
        text,
        posts,
        images,
      },
    });
    if (!item) throw new NotFoundError();

    return await this.get(item._id);
  };

  remove = async (id: string): Promise<IAboutMeRead> => {
    const item = await this.get(id);
    await this.AboutMe.findByIdAndDelete(id);
    return item;
  };
}

export default AboutMeData;
