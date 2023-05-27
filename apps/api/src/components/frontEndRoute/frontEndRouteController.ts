import { IFrontEndRoute } from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import FrontEndRouteData from "@/components/frontEndRoute/frontEndRouteData";

class FrontEndRouteController {
  data: FrontEndRouteData;

  constructor(data: FrontEndRouteData) {
    this.data = data;
  }

  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req);
    res.send(apiDataListResponse<IFrontEndRoute>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(req.params.id);
    res.send(apiDataResponse<IFrontEndRoute>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create(req.body);
    res.send(apiDataResponse<IFrontEndRoute>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<IFrontEndRoute>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<IFrontEndRoute>(result));
  };
}

export default FrontEndRouteController;
