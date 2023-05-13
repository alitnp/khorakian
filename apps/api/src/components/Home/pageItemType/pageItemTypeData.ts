import { Model } from "mongoose";
import { ApiDataListResponse, IPageItemType } from "@my/types";
import { defaultSearchQueries, getAllData } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";

class PageItemTypeData {
  PageItemType;
  constructor(PageItemType: Model<IPageItemType>) {
    this.PageItemType = PageItemType;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IPageItemType>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query.persianTitle)
      searchQuery.persianTitle = {
        $regex: req.query.persianTitle,
        $options: "i",
      };
    if (req.query._id) searchQuery._id = req.query._id;

    return await getAllData<IPageItemType>(searchQuery, req, this.PageItemType);
  };

  get = async (id: string): Promise<IPageItemType> => {
    const item = await this.PageItemType.findById(id);
    if (!item) throw new NotFoundError();
    return item;
  };

  create = async ({
    title,
    persianTitle,
  }: IPageItemType): Promise<IPageItemType> => {
    const item = new this.PageItemType({
      title,
      persianTitle,
    });
    await item.save();
    return await this.get(item._id + "");
  };

  update = async ({
    _id,
    title,
    persianTitle,
  }: IPageItemType & { _id: string }): Promise<IPageItemType> => {
    const item = await this.PageItemType.findByIdAndUpdate(_id, {
      $set: {
        title,
        persianTitle,
      },
    });
    if (!item) throw new NotFoundError();

    return await this.get(_id);
  };

  remove = async (id: string): Promise<IPageItemType> => {
    const item = await this.get(id);
    await this.PageItemType.findByIdAndDelete(id);
    return item;
  };
}

export default PageItemTypeData;
