import { IData } from "@/data/globalData";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";

class BaseController<Model, CreateModel = {}, UpdateModel = {}> {
  data: IData<Model, CreateModel, UpdateModel>;

  constructor(data: IData<Model, CreateModel, UpdateModel>) {
    this.data = data;
  }

  getAll = async (req: Req, res: Res): Promise<Res> => {
    const result = await this.data.getAll(req);
    return res.send(apiDataListResponse<Model>(result));
  };

  get = async (req: Req, res: Res): Promise<Res> => {
    const result = await this.data.get(req.params.id);
    return res.send(apiDataResponse<Model>(result));
  };

  create = async (req: Req, res: Res): Promise<Res> => {
    const result = await this.data.create(req.body);
    return res.send(apiDataResponse<Model>(result));
  };

  update = async (req: Req, res: Res): Promise<Res> => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    return res.send(apiDataResponse<Model>(result));
  };

  remove = async (req: Req, res: Res): Promise<Res> => {
    const result = await this.data.remove(req.params.id);
    return res.send(apiDataResponse<Model>(result));
  };
}

export default BaseController;
