import {
  IExperienceComment,
  IExperienceLike,
  IExperienceRead,
} from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import { getUserIdFromReq } from "@/utils/util";
import ExperienceData from "@/components/experience/experience/experienceData";

class ExperienceController {
  data: ExperienceData;
  constructor(data: ExperienceData) {
    this.data = data;
  }
  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req, getUserIdFromReq(req));
    res.send(apiDataListResponse<IExperienceRead>(result));
  };
  getAllWithComments = async (req: Req, res: Res) => {
    const result = await this.data.getAllWithComments(
      req,
      getUserIdFromReq(req),
    );
    res.send(apiDataListResponse<IExperienceRead>(result));
  };
  getAllWithAdminComments = async (req: Req, res: Res) => {
    const result = await this.data.getAllWithAdminComments(
      req,
      getUserIdFromReq(req),
    );
    res.send(apiDataListResponse<IExperienceRead>(result));
  };

  getAllComments = async (req: Req, res: Res) => {
    const result = await this.data.getAllComments(req);
    res.send(apiDataListResponse<IExperienceComment>(result));
  };

  getAllLikes = async (req: Req, res: Res) => {
    const result = await this.data.getAllLikes(req);
    res.send(apiDataListResponse<IExperienceLike>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(
      req.params.id,
      getUserIdFromReq(req),
      true,
    );
    res.send(apiDataResponse<IExperienceRead>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create(req.body);
    res.send(apiDataResponse<IExperienceRead>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<IExperienceRead>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<IExperienceRead>(result));
  };

  comment = async (req: Req, res: Res) => {
    const result = await this.data.comment(
      req.params.id,
      getUserIdFromReq(req),
      req.body.text,
    );
    res.send(apiDataResponse<IExperienceRead>(result));
  };

  reply = async (req: Req, res: Res) => {
    const result = await this.data.reply(
      req.params.id,
      getUserIdFromReq(req),
      req.body.text,
    );
    res.send(apiDataResponse<IExperienceRead>(result));
  };

  like = async (req: Req, res: Res) => {
    const result = await this.data.like(req.params.id, getUserIdFromReq(req));
    res.send(apiDataResponse<IExperienceRead>(result));
  };

  disLike = async (req: Req, res: Res) => {
    const result = await this.data.dislike(
      req.params.id,
      getUserIdFromReq(req),
    );
    res.send(apiDataResponse<IExperienceRead>(result));
  };
}

export default ExperienceController;
