import { Model } from "mongoose";
import { ApiDataListResponse, IHistory } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";

class HistoryData implements IData<IHistory> {
  History: Model<IHistory>;

  constructor(History: Model<IHistory>) {
    this.History = History;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IHistory>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    return getAllData<IHistory>(searchQuery, req, this.History);
  };

  get = async (id: string): Promise<IHistory> => {
    const history = await this.History.findById(id);
    if (!history) throw new NotFoundError();

    return history;
  };

  create = async ({ title }: IHistory): Promise<IHistory> => {
    const existingHistory = await this.History.findOne({ title });
    if (!!existingHistory)
      throw new ConflictError(" تجربه دسته بندی با این نام قبلا ثبت شده است.");

    const History = new this.History({
      title,
    });
    return await History.save();
  };

  update = async ({ _id, title }: IHistory): Promise<IHistory> => {
    const history = await this.History.findById(_id);
    if (!history) throw new NotFoundError();

    const existingHistory = await this.History.findOne({
      title,
    });
    if (!!existingHistory) throw new ConflictError();

    history.title = title;

    return await history.save();
  };

  remove = async (id: string): Promise<IHistory> => {
    const history = await this.History.findById(id);
    if (!history) throw new NotFoundError();

    await this.History.findByIdAndDelete(id);

    return history;
  };
}

export default HistoryData;
