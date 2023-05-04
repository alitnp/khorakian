import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IDefaultImage,
  IDefaultImageRead,
  IImage,
} from "@my/types";
import { defaultSearchQueries, getAllData } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import BadRequestError from "@/helpers/error/BadRequestError";
import ImageData from "@/components/image/imageData";

class DefaultImageData {
  DefaultImage: Model<IDefaultImage>;
  Image: ImageData;

  constructor(DefaultImage: Model<IDefaultImage>, Image: ImageData) {
    this.DefaultImage = DefaultImage;
    this.Image = Image;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IDefaultImage>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.key)
      searchQuery.key = { $regex: req.query.key, $options: "i" };

    return await getAllData<IDefaultImage>(
      searchQuery,
      req,
      this.DefaultImage,
      ["image"],
    );
  };

  get = async (id: string): Promise<IDefaultImageRead> => {
    const item = await this.DefaultImage.findById(id).populate<{
      image: IImage;
    }>(["image"]);
    if (!item) throw new NotFoundError();

    return item;
  };

  getByKey = async (key: string): Promise<IDefaultImageRead> => {
    if (!key) throw new NotFoundError();
    const item = await this.DefaultImage.findOne({ key }).populate<{
      image: IImage;
    }>(["image"]);
    if (!item) throw new NotFoundError();

    return item;
  };

  create = async ({
    key,
    image,
  }: IDefaultImage): Promise<IDefaultImageRead> => {
    if (!image) throw new BadRequestError("شناسه عکس ارسال نشده");
    await this.Image.get(image);

    const item = new this.DefaultImage({
      key,
      image,
    });
    await item.save();

    return await this.get(item._id);
  };

  update = async ({
    _id,
    key,
    image,
  }: IDefaultImage): Promise<IDefaultImageRead> => {
    if (!image) throw new BadRequestError("شناسه عکس ارسال نشده");
    await this.Image.get(image);

    const item = await this.DefaultImage.findByIdAndUpdate(_id, {
      $set: { key, image },
    });
    if (!item) throw new NotFoundError();

    return await this.get(_id);
  };

  remove = async (id: string): Promise<IDefaultImageRead> => {
    const item = await this.DefaultImage.findByIdAndDelete(id).populate<{
      image: IImage;
    }>(["image"]);
    if (!item) throw new NotFoundError();

    return item;
  };
}

export default DefaultImageData;
