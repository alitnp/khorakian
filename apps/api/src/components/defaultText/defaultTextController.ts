import { IDefaultText } from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import DefaultTextData from "@/components/defaultText/defaultTextData";

class DefaultTextController {
  data: DefaultTextData;

  constructor(data: DefaultTextData) {
    this.data = data;
  }

  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req);
    res.send(apiDataListResponse<IDefaultText>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(req.params.id);
    res.send(apiDataResponse<IDefaultText>(result));
  };

  getByKey = async (req: Req, res: Res) => {
    const result = await this.data.getByKey(req.params.key);
    res.send(apiDataResponse<IDefaultText>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create(req.body);
    res.send(apiDataResponse<IDefaultText>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<IDefaultText>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<IDefaultText>(result));
  };
}

export default DefaultTextController;
