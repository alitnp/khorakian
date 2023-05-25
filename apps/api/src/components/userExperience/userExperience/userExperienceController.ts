import {
  IUserExperienceComment,
  IUserExperienceLike,
  IUserExperienceRead,
} from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import { getUserIdFromReq, getUserIsAdminFromReq } from "@/utils/util";
import UserExperienceData from "@/components/userExperience/userExperience/userExperienceData";

class UserExperienceController {
  data: UserExperienceData;
  constructor(data: UserExperienceData) {
    this.data = data;
  }
  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req, getUserIdFromReq(req));
    res.send(apiDataListResponse<IUserExperienceRead>(result));
  };

  getAllComments = async (req: Req, res: Res) => {
    const result = await this.data.getAllComments(req);
    res.send(apiDataListResponse<IUserExperienceComment>(result));
  };

  getAllLikes = async (req: Req, res: Res) => {
    const result = await this.data.getAllLikes(req);
    res.send(apiDataListResponse<IUserExperienceLike>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(req.params.id, getUserIdFromReq(req));
    res.send(apiDataResponse<IUserExperienceRead>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create({
      ...req.body,
      user: getUserIdFromReq(req),
      // isAdminSubmitted: getUserIsAdminFromReq(req),
    });
    res.send(apiDataResponse<IUserExperienceRead>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({
      _id: req.params.id,
      ...req.body,
      user: getUserIdFromReq(req),
    });
    res.send(apiDataResponse<IUserExperienceRead>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(
      req.params.id,
      getUserIsAdminFromReq(req),
      getUserIdFromReq(req),
    );
    res.send(apiDataResponse<IUserExperienceRead>(result));
  };

  comment = async (req: Req, res: Res) => {
    const result = await this.data.comment(
      req.params.id,
      getUserIdFromReq(req),
      req.body.text,
    );
    res.send(apiDataResponse<IUserExperienceRead>(result));
  };

  reply = async (req: Req, res: Res) => {
    const result = await this.data.reply(
      req.params.id,
      getUserIdFromReq(req),
      req.body.text,
    );
    res.send(apiDataResponse<IUserExperienceRead>(result));
  };

  like = async (req: Req, res: Res) => {
    const result = await this.data.like(req.params.id, getUserIdFromReq(req));
    res.send(apiDataResponse<IUserExperienceRead>(result));
  };

  disLike = async (req: Req, res: Res) => {
    const result = await this.data.dislike(
      req.params.id,
      getUserIdFromReq(req),
    );
    res.send(apiDataResponse<IUserExperienceRead>(result));
  };

  //approve userExperience bye user or admin
  approve = async (req: Req, res: Res) => {
    const result = await this.data.approve(req.params.id);
    res.send(apiDataResponse<IUserExperienceRead>(result));
  };

  //approve userExperience bye user or admin
  disApprove = async (req: Req, res: Res) => {
    const result = await this.data.disApprove(req.params.id);
    res.send(apiDataResponse<IUserExperienceRead>(result));
  };
}

export default UserExperienceController;
