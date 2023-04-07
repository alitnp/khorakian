import { IData } from "@/data/globalData";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";

export interface IBasicController {
  getAll: (req: Req, res: Res) => void;
  get: (req: Req, res: Res) => void;
  create: (req: Req, res: Res) => void;
  update: (req: Req, res: Res) => void;
  remove: (req: Req, res: Res) => void;
}

class BaseController<Model, CreateModel = {}, UpdateModel = {}>
  implements IBasicController
{
  data: IData<Model, CreateModel, UpdateModel>;

  constructor(data: IData<Model, CreateModel, UpdateModel>) {
    this.data = data;
  }

  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req);
    res.send(apiDataListResponse<Model>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(req.params.id);
    res.send(apiDataResponse<Model>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create(req.body);
    res.send(apiDataResponse<Model>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<Model>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<Model>(result));
  };
}

export default BaseController;
