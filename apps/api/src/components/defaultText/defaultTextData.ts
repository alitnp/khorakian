import { Model } from "mongoose";
import { ApiDataListResponse, IDefaultText } from "@my/types";
import { defaultSearchQueries } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import { getAllData } from "@/data/globalData";

class DefaultTextData {
  DefaultText: Model<IDefaultText>;

  constructor(defaultText: Model<IDefaultText>) {
    this.DefaultText = defaultText;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IDefaultText>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.text)
      searchQuery.text = { $regex: req.query.text, $options: "i" };
    if (req.query.key)
      searchQuery.key = {
        $regex: req.query.key,
        $options: "i",
      };
    if (req.query._id) searchQuery._id = req.query._id;
    if (req.query.persianKey)
      searchQuery.persianKey = { $regex: req.query.text, $options: "i" };

    return await getAllData<IDefaultText>(searchQuery, req, this.DefaultText);
  };

  getByKey = async (key: string): Promise<IDefaultText> => {
    if (!key) throw new NotFoundError();
    const item = await this.DefaultText.findOne({ key });
    if (!item) throw new NotFoundError();

    return item;
  };

  get = async (id: string): Promise<IDefaultText> => {
    const item = await this.DefaultText.findById(id);
    if (!item) throw new NotFoundError();
    return item;
  };

  create = async ({
    key,
    text,
    persianKey,
  }: IDefaultText): Promise<IDefaultText> => {
    const item = new this.DefaultText({
      text,
      key,
      persianKey,
    });
    await item.save();
    return await this.get(item._id + "");
  };

  update = async ({
    _id,
    key,
    text,
    persianKey,
  }: IDefaultText & { _id: string }): Promise<IDefaultText> => {
    const item = await this.DefaultText.findByIdAndUpdate(_id, {
      $set: {
        key,
        text,
        persianKey,
      },
    });
    if (!item) throw new NotFoundError();

    return await this.get(_id);
  };

  remove = async (id: string): Promise<IDefaultText> => {
    const item = await this.get(id);
    await this.DefaultText.findByIdAndDelete(id);
    return item;
  };
}

export default DefaultTextData;
