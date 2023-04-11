import { Model } from "mongoose";
import { ApiDataListResponse, IExperienceCategory } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";

class ExperienceCategoryData implements IData<IExperienceCategory> {
  ExperienceCategory: Model<IExperienceCategory, {}, {}, {}, any>;

  constructor(ExperienceCategory: Model<IExperienceCategory, {}, {}, {}, any>) {
    this.ExperienceCategory = ExperienceCategory;
  }

  getAll = async (
    req: Req,
  ): Promise<ApiDataListResponse<IExperienceCategory>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    return getAllData<IExperienceCategory>(
      searchQuery,
      req,
      this.ExperienceCategory,
    );
  };

  get = async (id: string): Promise<IExperienceCategory> => {
    const experienceCategory = await this.ExperienceCategory.findById(id);
    if (!experienceCategory) throw new NotFoundError();

    return experienceCategory;
  };

  create = async ({
    title,
  }: IExperienceCategory): Promise<IExperienceCategory> => {
    const existingCategory = await this.ExperienceCategory.findOne({ title });
    if (!!existingCategory)
      throw new ConflictError(" تجربه دسته بندی با این نام قبلا ثبت شده است.");

    const experienceCategory = new this.ExperienceCategory({
      title,
    });
    return await experienceCategory.save();
  };

  update = async ({
    _id,
    title,
  }: IExperienceCategory): Promise<IExperienceCategory> => {
    const experienceCategory = await this.ExperienceCategory.findById(_id);
    if (!experienceCategory) throw new NotFoundError();

    const existingContentType = await this.ExperienceCategory.findOne({
      title,
    });
    if (!!existingContentType) throw new ConflictError();

    experienceCategory.title = title;

    return await experienceCategory.save();
  };

  remove = async (id: string): Promise<IExperienceCategory> => {
    const experienceCategory = await this.ExperienceCategory.findById(id);
    if (!experienceCategory) throw new NotFoundError();

    await this.ExperienceCategory.findByIdAndDelete(id);

    return experienceCategory;
  };
}

export default ExperienceCategoryData;
