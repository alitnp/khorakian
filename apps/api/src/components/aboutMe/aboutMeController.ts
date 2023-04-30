import { IAboutMeRead } from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import AboutMeData from "@/components/aboutMe/aboutMeData";

class AboutMeController {
  data: AboutMeData;
  constructor(data: AboutMeData) {
    this.data = data;
  }

  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req);
    res.send(apiDataListResponse<IAboutMeRead>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(req.params.id);
    res.send(apiDataResponse<IAboutMeRead>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create({
      ...req.body,
    });
    res.send(apiDataResponse<IAboutMeRead>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<IAboutMeRead>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<IAboutMeRead>(result));
  };
}

export default AboutMeController;
