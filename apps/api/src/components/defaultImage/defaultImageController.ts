import { IDefaultImage, IDefaultImageRead } from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import DefaultImageData from "@/components/defaultImage/defaultImageData";

class DefaultImageController {
  data: DefaultImageData;

  constructor(data: DefaultImageData) {
    this.data = data;
  }

  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req);
    res.send(apiDataListResponse<IDefaultImage>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(req.params.id);
    res.send(apiDataResponse<IDefaultImageRead>(result));
  };

  getByKey = async (req: Req, res: Res) => {
    const result = await this.data.getByKey(req.params.key);
    res.send(apiDataResponse<IDefaultImageRead>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create(req.body);
    res.send(apiDataResponse<IDefaultImageRead>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<IDefaultImageRead>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<IDefaultImageRead>(result));
  };
}

export default DefaultImageController;
