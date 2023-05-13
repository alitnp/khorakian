import { Model } from "mongoose";
import { ApiDataListResponse, IHistory } from "@my/types";
import { defaultSearchQueries, getAllData, IData } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";

class HistoryData implements IData<IHistory> {
  History: Model<IHistory>;

  constructor(History: Model<IHistory>) {
    this.History = History;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IHistory>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query.from)
      searchQuery.from = { $regex: req.query.from, $options: "i" };
    if (req.query.to) searchQuery.to = { $regex: req.query.to, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    return await getAllData<IHistory>(searchQuery, req, this.History);
  };

  get = async (id: string): Promise<IHistory> => {
    const history = await this.History.findById(id);
    if (!history) throw new NotFoundError();

    return history;
  };

  create = async ({ title, from, to }: IHistory): Promise<IHistory> => {
    const History = new this.History({
      title,
      from,
      to,
    });
    return await History.save();
  };

  update = async ({ _id, title, from, to }: IHistory): Promise<IHistory> => {
    const history = await this.History.findByIdAndUpdate(
      _id,
      {
        $set: { title, from, to },
      },
      { new: true },
    );
    if (!history) throw new NotFoundError();

    return await history;
  };

  remove = async (id: string): Promise<IHistory> => {
    const history = await this.History.findByIdAndDelete(id);
    if (!history) throw new NotFoundError();

    return history;
  };
}

export default HistoryData;
