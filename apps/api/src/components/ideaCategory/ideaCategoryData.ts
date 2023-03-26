import { Model } from "mongoose";
import { ApiDataListResponse, IIdeaCategory } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";

class IdeaCategoryData implements IData<IIdeaCategory> {
  IdeaCategory: Model<IIdeaCategory, {}, {}, {}, any>;

  constructor(IdeaCategory: Model<IIdeaCategory, {}, {}, {}, any>) {
    this.IdeaCategory = IdeaCategory;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IIdeaCategory>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = { $regex: req.query._id };
    return getAllData<IIdeaCategory>(searchQuery, req, this.IdeaCategory);
  };

  get = async (id: string): Promise<IIdeaCategory> => {
    const ideaCategory = await this.IdeaCategory.findById(id);
    if (!ideaCategory) throw new NotFoundError();
    return ideaCategory;
  };

  create = async ({ title }: IIdeaCategory): Promise<IIdeaCategory> => {
    const existingCategory = await this.IdeaCategory.findOne({ title });
    if (!!existingCategory)
      throw new ConflictError(" این ایده قبلا ثبت شده است.");
    const ideaCategory = new this.IdeaCategory({
      title,
    });
    return await ideaCategory.save();
  };

  update = async ({ _id, title }: IIdeaCategory): Promise<IIdeaCategory> => {
    const ideaCategory = await this.IdeaCategory.findById(_id);
    if (!ideaCategory) throw new NotFoundError();

    const existingContentType = await this.IdeaCategory.findOne({ title });
    if (!!existingContentType) throw new ConflictError();

    ideaCategory.title = title;
    return await ideaCategory.save();
  };

  remove = async (id: string): Promise<IIdeaCategory> => {
    const ideaCategory = await this.IdeaCategory.findById(id);
    if (!ideaCategory) throw new NotFoundError();
    await this.IdeaCategory.findByIdAndDelete(id);
    return ideaCategory;
  };
}

export default IdeaCategoryData;
