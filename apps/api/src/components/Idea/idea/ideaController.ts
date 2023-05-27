import { IIdeaComment, IIdeaLike, IIdeaRead } from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import { getUserIdFromReq, getUserIsAdminFromReq } from "@/utils/util";
import IdeaData from "@/components/Idea/idea/ideaData";

class IdeaController {
  data: IdeaData;
  constructor(data: IdeaData) {
    this.data = data;
  }
  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req, getUserIdFromReq(req));
    res.send(apiDataListResponse<IIdeaRead>(result));
  };

  getAllComments = async (req: Req, res: Res) => {
    const result = await this.data.getAllComments(req);
    res.send(apiDataListResponse<IIdeaComment>(result));
  };

  getAllLikes = async (req: Req, res: Res) => {
    const result = await this.data.getAllLikes(req);
    res.send(apiDataListResponse<IIdeaLike>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(req.params.id, getUserIdFromReq(req));
    res.send(apiDataResponse<IIdeaRead>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create({
      ...req.body,
      isAdminSubmitted: getUserIsAdminFromReq(req),
      user: getUserIdFromReq(req),
    });
    res.send(apiDataResponse<IIdeaRead>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({
      _id: req.params.id,
      ...req.body,
      user: getUserIdFromReq(req),
    });
    res.send(apiDataResponse<IIdeaRead>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(
      req.params.id,
      getUserIsAdminFromReq(req),
      getUserIdFromReq(req),
    );
    res.send(apiDataResponse<IIdeaRead>(result));
  };

  comment = async (req: Req, res: Res) => {
    const result = await this.data.comment(
      req.params.id,
      getUserIdFromReq(req),
      req.body.text,
    );
    res.send(apiDataResponse<IIdeaRead>(result));
  };

  reply = async (req: Req, res: Res) => {
    const result = await this.data.reply(
      req.params.id,
      getUserIdFromReq(req),
      req.body.text,
    );
    res.send(apiDataResponse<IIdeaRead>(result));
  };

  like = async (req: Req, res: Res) => {
    const result = await this.data.like(req.params.id, getUserIdFromReq(req));
    res.send(apiDataResponse<IIdeaRead>(result));
  };

  disLike = async (req: Req, res: Res) => {
    const result = await this.data.dislike(
      req.params.id,
      getUserIdFromReq(req),
    );
    res.send(apiDataResponse<IIdeaRead>(result));
  };

  //approve idea bye user or admin
  approve = async (req: Req, res: Res) => {
    const result = await this.data.approve(req.params.id);
    res.send(apiDataResponse<IIdeaRead>(result));
  };

  //approve idea bye user or admin
  disApprove = async (req: Req, res: Res) => {
    const result = await this.data.disApprove(req.params.id);
    res.send(apiDataResponse<IIdeaRead>(result));
  };
}

export default IdeaController;
