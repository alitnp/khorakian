import { IDirectMessage, IDirectMessageRead } from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import { getUserIdFromReq, getUserIsAdminFromReq } from "@/utils/util";
import DirectMessageData from "@/components/directMessage/directMessageData";
import { UnauthenticatedError } from "@/helpers/error";

class DirectMessageController {
  data: DirectMessageData;

  constructor(data: DirectMessageData) {
    this.data = data;
  }
  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(
      req,
      getUserIsAdminFromReq(req),
      getUserIdFromReq(req),
    );
    res.send(apiDataListResponse<IDirectMessage>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(
      req.params.id,
      getUserIsAdminFromReq(req),
      getUserIdFromReq(req),
    );
    res.send(apiDataResponse<IDirectMessageRead>(result));
  };

  getMyMessages = async (req: Req, res: Res) => {
    const userId = getUserIdFromReq(req);
    if (!userId) throw new UnauthenticatedError();
    const result = await this.data.getMyMessages(userId);
    res.send(apiDataResponse<IDirectMessageRead>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create(
      req.body.text,
      getUserIdFromReq(req) as string,
    );
    res.send(apiDataResponse<IDirectMessageRead>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<IDirectMessageRead>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<IDirectMessage>(result));
  };

  reply = async (req: Req, res: Res) => {
    const result = await this.data.reply(
      req.params.id,
      req.body.text,
      getUserIdFromReq(req) as string,
    );
    res.send(apiDataResponse<IDirectMessageRead>(result));
  };
}

export default DirectMessageController;
