import { Model } from "mongoose";
import { ApiDataListResponse, IUser } from "@my/types";
import {
  defaultSearchQueries,
  getAllData,
  paginationProps,
} from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";

class CommentData<commentModel> {
  Comment: Model<commentModel>;
  User: Model<IUser>;

  constructor(Comment: Model<commentModel>, User: Model<IUser>) {
    this.Comment = Comment;
    this.User = User;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<commentModel>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.user) searchQuery.user = req.query.user;
    if (req.query.content) searchQuery.content = req.query.content;
    const populate = ["replies.user"];
    if (req.query.content) populate.push("user");
    if (req.query.user) populate.push("content");

    if (!req.query.content && !req.query.user)
      populate.push(...["user", "content"]);

    return await getAllData<commentModel>(
      searchQuery,
      req,
      this.Comment,
      populate,
    );
  };

  get = async (id: string): Promise<commentModel> => {
    const comment = await this.Comment.findById(id).populate([
      "user",
      "content",
    ]);
    if (!comment) throw new NotFoundError("نظر یافت نشد.");
    return comment as commentModel;
  };

  getAdminComments = async (
    req: Req,
  ): Promise<ApiDataListResponse<commentModel>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.content) searchQuery.content = req.query.content;
    const { pageNumber, totalItems, totalPages, sortBy, desc, pageSize } =
      await paginationProps(searchQuery, req, this.Comment);
    const data = await this.Comment.find({
      $and: [
        { content: req.query.content },
        {
          user: {
            $in: await this.User.find({ isAdmin: true }).distinct("_id"),
          },
        },
      ],
    }).populate(["user"]);

    return {
      data,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc: desc === -1 ? true : false,
    };
  };

  getAdminCommentsByContentId = async (
    _id: string,
  ): Promise<ApiDataListResponse<commentModel>> => {
    const data = await this.Comment.find({
      $and: [
        { content: _id },
        {
          user: {
            $in: await this.User.find({ isAdmin: true }).distinct("_id"),
          },
        },
      ],
    }).populate(["user"]);

    return {
      data,
      pageNumber: 1,
      pageSize: data.length,
      totalItems: data.length,
      totalPages: 1,
      sortBy: "creationDate",
      desc: false,
    };
  };

  getCommentsByContentId = async (
    _id: string,
  ): Promise<ApiDataListResponse<commentModel>> => {
    const data = await this.Comment.find({
      content: _id,
    })
      .populate(["user"])
      .limit(50);

    return {
      data,
      pageNumber: 1,
      pageSize: data.length,
      totalItems: data.length,
      totalPages: 1,
      sortBy: "creationDate",
      desc: false,
    };
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
