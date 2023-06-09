import { Model } from "mongoose";
import { ApiDataListResponse } from "@my/types";
import { getAllData } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";

class CommentData<commentModel> {
  Comment: Model<commentModel>;

  constructor(Comment: Model<commentModel>) {
    this.Comment = Comment;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<commentModel>> => {
    const searchQuery: any = {};
    if (req.query.user) searchQuery.user = req.query.user;
    if (req.query.content) searchQuery.content = req.query.content;
    const populate = ["replies.user"];
    if (req.query.content) populate.push("user");
    if (req.query.user) populate.push("content");
    if (!req.query.content && !req.query.user)
      populate.push(...["user", "content"]);

    return getAllData<commentModel>(searchQuery, req, this.Comment, populate);
  };

  isUserCommented = async (
    contentId: string,
    userId: string,
  ): Promise<boolean> => {
    if (!userId || !contentId) return false;

    const comment = await this.Comment.findOne({
      content: contentId,
      user: userId,
    });
    return !!comment;
  };

  create = async (
    contentId: string,
    userId: string,
    text: string,
  ): Promise<commentModel> => {
    const comment = new this.Comment({
      content: contentId,
      user: userId,
      text,
      replies: [],
    });

    return await comment.save();
  };

  update = async (commentId: string, text: string) => {
    const comment = await this.Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true },
    );
    if (!comment) throw new NotFoundError("نظر یافت نشد");
    return comment;
  };

  removeComment = async (commentId: string) => {
    const comment = await this.Comment.findByIdAndRemove(commentId);
    if (!comment) throw new NotFoundError("نظر یافت نشد");
    return comment;
  };

  reply = async (commentId: string, userId: string, text: string) => {
    const comment = await this.Comment.findByIdAndUpdate(commentId, {
      $push: { replies: { user: userId, text } },
    });
    if (!comment) throw new NotFoundError("نظر یافت نشد");
    return comment;
  };

  updateReply = async (commentId: string, replyId: string, text: string) => {
    const comment = await this.Comment.updateOne(
      {
        _id: commentId,
        "replies._id": replyId,
      },
      { $set: { "replies.$.text": text } },
    );
    if (!comment) throw new NotFoundError("نظر یافت نشد");

    return comment;
  };

  removeReply = async (commentId: string, replyId: string) => {
    const comment = await this.Comment.findByIdAndUpdate(commentId, {
      $pull: { replies: { _id: replyId } },
    });
    if (!comment) throw new NotFoundError("نظر یافت نشد");
    return comment;
  };
}

export default CommentData;
