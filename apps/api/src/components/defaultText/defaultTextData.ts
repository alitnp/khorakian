import { Model } from "mongoose";
import { ApiDataListResponse, IDefaultText } from "@my/types";
import { paginationProps } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";

class DefaultTextData {
  DefaultText: Model<IDefaultText, {}, {}, {}, any>;

  constructor(defaultText: Model<IDefaultText, {}, {}, {}, any>) {
    this.DefaultText = defaultText;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IDefaultText>> => {
    const searchQuery: any = {};
    if (req.query.text)
      searchQuery.text = { $regex: req.query.text, $options: "i" };
    if (req.query.key)
      searchQuery.key = {
        $regex: req.query.key,
        $options: "i",
      };
    if (req.query._id) searchQuery._id = req.query._id;

    const {
      fixedSearchQuery,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc,
    } = await paginationProps(searchQuery, req, this.DefaultText);

    const data: IDefaultText[] = await this.DefaultText.find(fixedSearchQuery)
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

  get = async (id: string): Promise<IDefaultText> => {
    const item = (await this.DefaultText.findById(id).lean()) as IDefaultText;

    if (!item) throw new NotFoundError();
    await this.DefaultText.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

    return item;
  };

  create = async ({ key, text }: IDefaultText): Promise<IDefaultText> => {
    const item = new this.DefaultText({
      text,
      key,
    });
    await item.save();
    return await this.get(item._id);
  };

  update = async ({
    _id,
    key,
    text,
  }: IDefaultText & { _id: string }): Promise<IDefaultText> => {
    const item = await this.DefaultText.findByIdAndUpdate(
      _id,
      {
        $set: {
          key,
          text,
        },
      },
      { new: true },
    );
    if (!item) throw new NotFoundError();

    return await this.get(item._id);
  };

  remove = async (id: string): Promise<IDefaultText> => {
    const item = await this.get(id);
    await this.DefaultText.findByIdAndDelete(id);
    return item;
  };
}

export default DefaultTextData;
