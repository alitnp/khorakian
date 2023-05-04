import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IImage,
  ISocialMedia,
  ISocialMediaRead,
} from "@my/types";
import { defaultSearchQueries, paginationProps } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import ImageData from "@/components/image/imageData";
import BadRequestError from "@/helpers/error/BadRequestError";

class SocialMediaData {
  SocialMedia: Model<ISocialMedia, {}, {}, {}, any>;
  Image: ImageData;
  constructor(
    SocialMedia: Model<ISocialMedia, {}, {}, {}, any>,
    Image: ImageData,
  ) {
    this.SocialMedia = SocialMedia;
    this.Image = Image;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<ISocialMediaRead>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query._id) {
      searchQuery._id = req.query._id;
    }
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };

    if (req.query.englishTitle)
      searchQuery.englishTitle = {
        $regex: req.query.englishTitle,
        $options: "i",
      };

    if (req.query.url)
      searchQuery.url = { $regex: req.query.url, $option: "i" };

    const {
      fixedSearchQuery,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc,
    } = await paginationProps(searchQuery, req, this.SocialMedia);

    const data: ISocialMediaRead[] = await this.SocialMedia.find(
      fixedSearchQuery,
    )
      .populate<{ image: IImage }>("image")
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

  get = async (id: string): Promise<ISocialMediaRead> => {
    const socialMedia = (await this.SocialMedia.findById(id).populate<{
      image: IImage;
    }>("image")) as ISocialMediaRead;

    if (!socialMedia) throw new NotFoundError();
    return socialMedia;
  };

  create = async ({
    title,
    englishTitle,
    url,
    image,
  }: ISocialMedia): Promise<ISocialMediaRead> => {
    if (!image) throw new BadRequestError("عکس ارسال نشده");
    const existingImage = await this.Image.get(image);
    if (!existingImage) throw new NotFoundError("عکسی با این شناسه یافت نشد");

    const socialMedia = new this.SocialMedia({
      title,
      englishTitle,
      url,
      image: existingImage,
    });
    await socialMedia.save();
    return await this.get(socialMedia._id);
  };

  update = async ({
    _id,
    title,
    englishTitle,
    url,
    image,
  }: ISocialMedia & { _id: string }): Promise<ISocialMediaRead> => {
    if (!image) throw new BadRequestError("عکس ارسال نشده");
    const existingImage = await this.Image.get(image);
    if (!existingImage) throw new NotFoundError("عکسی با این شناسه یافت نشد");
    const socialMedia = await this.SocialMedia.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          englishTitle,
          url,
          image: existingImage,
        },
      },
      { new: true },
    );
    if (!socialMedia) throw new NotFoundError();

    return await this.get(socialMedia._id);
  };

  remove = async (id: string): Promise<ISocialMediaRead> => {
    const item = await this.get(id);
    await this.SocialMedia.findByIdAndDelete(id);
    return item;
  };
}

export default SocialMediaData;
