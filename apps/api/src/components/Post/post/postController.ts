import { IPostComment, IPostLike, IPostRead } from "@my/types";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";
import { getUserIdFromReq } from "@/utils/util";
import PostData from "@/components/Post/post/postData";

class PostController {
  data: PostData;
  constructor(data: PostData) {
    this.data = data;
  }
  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req, getUserIdFromReq(req));
    res.send(apiDataListResponse<IPostRead>(result));
  };

  getAllComments = async (req: Req, res: Res) => {
    const result = await this.data.getAllComments(req);
    res.send(apiDataListResponse<IPostComment>(result));
  };

  getAdminComments = async (req: Req, res: Res) => {
    const result = await this.data.getAdminComments(req);
    res.send(apiDataListResponse<IPostComment>(result));
  };

  getAllLikes = async (req: Req, res: Res) => {
    const result = await this.data.getAllLikes(req);
    res.send(apiDataListResponse<IPostLike>(result));
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

  comment = async (req: Req, res: Res) => {
    const result = await this.data.comment(
      req.params.id,
      getUserIdFromReq(req),
      req.body.text,
    );
    res.send(apiDataResponse<IPostRead>(result));
  };

  // getAdminsComments = async (req: Req, res: Res) => {
  //   const result = await this.data.getAdminsComments(
  //     req,
  //     getUserIsAdminFromReq(req),
  //     getUserIdFromReq(req),
  //   );
  //   res.send(apiDataListResponse<IPostComment>(result));
  // };

  reply = async (req: Req, res: Res) => {
    const result = await this.data.reply(
      req.params.id,
      getUserIdFromReq(req),
      req.body.text,
    );
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
