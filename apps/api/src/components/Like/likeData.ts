import { Model } from "mongoose";
import { ApiDataListResponse } from "@my/types";
import { defaultSearchQueries, getAllData } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";

class LikeData<likeModel> {
  Like: Model<likeModel>;

  constructor(Like: Model<likeModel>) {
    this.Like = Like;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<likeModel>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.user) searchQuery.user = req.query.user;
    if (req.query.content) searchQuery.content = req.query.content;

    const populate = [];
    if (req.query.content) populate.push("user");
    if (req.query.user) populate.push("content");
    if (!req.query.content && !req.query.user) populate.push("user", "content");

    return await getAllData<likeModel>(searchQuery, req, this.Like, populate);
  };

  isUserLiked = async (contentId: string, userId: string): Promise<boolean> => {
    if (!userId || !contentId) return false;
    const like = await this.Like.findOne({
      content: contentId,
      user: userId,
    });
    return !!like;
  };

  disLike = async (contentId: string, userId: string): Promise<likeModel> => {
    const like = await this.Like.findOneAndDelete({
      content: contentId,
      user: userId,
    });
    if (!like) throw new NotFoundError();

    return like;
  };

  like = async (contentId: string, userId: string): Promise<likeModel> => {
    const alreadyLiked = await this.Like.findOne({
      content: contentId,
      user: userId,
    });
    if (alreadyLiked) return alreadyLiked;

    const like = new this.Like({
      content: contentId,
      user: userId,
    });

    return await like.save();
  };
}

export default LikeData;
