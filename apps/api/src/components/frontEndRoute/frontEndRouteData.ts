import { Model } from "mongoose";
import { ApiDataListResponse, IFrontEndRoute } from "@my/types";
import { defaultSearchQueries } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import { getAllData } from "@/data/globalData";

class FrontEndRouteData {
  FrontEndRoute: Model<IFrontEndRoute>;

  constructor(frontEndRoute: Model<IFrontEndRoute>) {
    this.FrontEndRoute = frontEndRoute;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IFrontEndRoute>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query.path)
      searchQuery.path = {
        $regex: req.query.path,
        $options: "i",
      };

    return await getAllData<IFrontEndRoute>(
      searchQuery,
      req,
      this.FrontEndRoute,
    );
  };

  get = async (id: string): Promise<IFrontEndRoute> => {
    const item = await this.FrontEndRoute.findById(id);
    if (!item) throw new NotFoundError();
    return item;
  };

  getByTitle = async (title: string): Promise<IFrontEndRoute | undefined> => {
    const item = await this.FrontEndRoute.findOne({ title });
    if (!item) return undefined;
    return item;
  };

  create = async ({ title, path }: IFrontEndRoute): Promise<IFrontEndRoute> => {
    const item = new this.FrontEndRoute({
      title,
      path,
    });
    await item.save();
    return await this.get(item._id + "");
  };

  update = async ({
    _id,
    title,
    path,
  }: IFrontEndRoute & { _id: string }): Promise<IFrontEndRoute> => {
    const item = await this.FrontEndRoute.findByIdAndUpdate(_id, {
      $set: {
        title,
        path,
      },
    });
    if (!item) throw new NotFoundError();

    return await this.get(_id);
  };

  remove = async (id: string): Promise<IFrontEndRoute> => {
    const item = await this.get(id);
    await this.FrontEndRoute.findByIdAndDelete(id);
    return item;
  };
}

export default FrontEndRouteData;
