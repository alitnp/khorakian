import { IPostRead } from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import PostData from "@/components/post/postData";
import { getUserIdFromReq } from "@/utils/util";

class PostController {
  data: PostData;
  constructor(data: PostData) {
    this.data = data;
  }
  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req, getUserIdFromReq(req));
    res.send(apiDataListResponse<IPostRead>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(req.params.id, getUserIdFromReq(req));
    res.send(apiDataResponse<IPostRead>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create(req.body);
    res.send(apiDataResponse<IPostRead>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<IPostRead>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<IPostRead>(result));
  };
  like = async (req: Req, res: Res) => {
    const result = await this.data.like(req.params.id, getUserIdFromReq(req));
    res.send(apiDataResponse<IPostRead>(result));
  };
  disLike = async (req: Req, res: Res) => {
    const result = await this.data.dislike(
      req.params.id,
      getUserIdFromReq(req),
    );
    res.send(apiDataResponse<IPostRead>(result));
  };
}

export default PostController;
