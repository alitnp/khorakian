import { Model } from "mongoose";
import { ApiDataListResponse, IUser } from "@my/types";
import { defaultSearchQueries, paginationProps } from "@/data/globalData";
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
    console.log("allcomment :", searchQuery);
    const {
      fixedSearchQuery,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc,
    } = await paginationProps(searchQuery, req, this.Comment);

    const data = await this.Comment.find(fixedSearchQuery)
      .populate([
        "user",
        "replies.user",
        { path: "user", populate: { path: "image", model: "Image" } },
        { path: "replies.user", populate: { path: "image", model: "Image" } },
      ])
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort(sortBy ? { [sortBy]: desc } : { creationDate: -1 });

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

  get = async (id: string): Promise<commentModel> => {
    const comment = await this.Comment.findById(id).populate([
      "user",
      "replies.user",
      "content",
      { path: "user", populate: { path: "image", model: "Image" } },
      { path: "replies.user", populate: { path: "image", model: "Image" } },
    ]);
    if (!comment) throw new NotFoundError("نظر یافت نشد.");
    return comment as commentModel;
  };
  getMyComments = async (
    req: Req,
    userId: string
  ): Promise<ApiDataListResponse<commentModel>> => {
    req.query.user = userId;
    return this.getAll(req);
  };

  getAdminComments = async (
    req: Req
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
    }).populate([
      "user",
      "replies.user",
      { path: "user", populate: { path: "image", model: "Image" } },
      { path: "replies.user", populate: { path: "image", model: "Image" } },
    ]);

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
    _id: string
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
    }).populate([
      "user",
      "replies.user",
      "content",
      { path: "user", populate: { path: "image", model: "Image" } },
      { path: "replies.user", populate: { path: "image", model: "Image" } },
    ]);

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
    _id: string
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
    userId: string
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
    text: string
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
      { new: true }
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
      { $set: { "replies.$.text": text } }
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
