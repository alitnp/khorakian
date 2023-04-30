import { ISocialMediaRead } from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import SocialMediaData from "@/components/socialMedia/socialMediaData";

class SocialMediaController {
  data: SocialMediaData;
  constructor(data: SocialMediaData) {
    this.data = data;
  }

  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req);
    res.send(apiDataListResponse<ISocialMediaRead>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(req.params.id);
    res.send(apiDataResponse<ISocialMediaRead>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create({
      ...req.body,
    });
    res.send(apiDataResponse<ISocialMediaRead>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<ISocialMediaRead>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<ISocialMediaRead>(result));
  };
}

export default SocialMediaController;
