import { IDirectMessage } from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import { getUserIdFromReq } from "@/utils/util";
import DirectMessageData from "@/components/directMessage/directMessageData";

class DirectMessageController {
  data: DirectMessageData;

  constructor(data: DirectMessageData) {
    this.data = data;
  }
  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req, getUserIdFromReq(req) as string);
    res.send(apiDataListResponse<IDirectMessage>(result));
  };
  getAllAdmin = async (req: Req, res: Res) => {
    const result = await this.data.getAllAdmin(req);
    res.send(apiDataListResponse<IDirectMessage>(result));
  };

  // get = async (req: Req, res: Res) => {
  //   const result = await this.data.get(
  //     req.params.id,
  //     getUserIdFromReq(req),
  //     getUserIsAdminFromReq(req),
  //   );
  //   res.send(apiDataResponse<IDirectMessageRead>(result));
  // };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create(
      req.body.text,
      getUserIdFromReq(req) as string,
    );
    res.send(apiDataResponse<IDirectMessage>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<IDirectMessage>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<IDirectMessage>(result));
  };

  reply = async (req: Req, res: Res) => {
    const result = await this.data.reply(
      req.params.id,
      getUserIdFromReq(req) as string,
      req.body.text,
    );
    res.send(apiDataResponse<IDirectMessage>(result));
  };
}

export default DirectMessageController;
