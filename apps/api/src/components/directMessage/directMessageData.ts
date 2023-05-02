import { Model } from "mongoose";
import { ApiDataListResponse, IDirectMessage } from "@my/types";
import { NotFoundError } from "@/helpers/error";
import { getAllData } from "@/data/globalData";
import BadRequestError from "@/helpers/error/BadRequestError";
import UserData from "@/components/user/userData";

class DirectMessageData {
  DirectMessage: Model<IDirectMessage>;
  User: UserData;

  constructor(DirectMessage: Model<IDirectMessage>, User: UserData) {
    this.DirectMessage = DirectMessage;
    this.User = User;
  }

  getAll = async (
    req: Req,
    userId: string,
  ): Promise<ApiDataListResponse<IDirectMessage>> => {
    const user = await this.User.get(userId);
    if (!user) throw new NotFoundError();
    const searchQuery: any = {};
    if (userId) {
      searchQuery.user._id = userId;
    }
    if (req.query.text)
      searchQuery.text = { $regex: req.query.text, $option: "i" };
    return await getAllData<IDirectMessage>(
      searchQuery,
      req,
      this.DirectMessage,
      ["user", "replies.user"],
    );
  };

  //only admin in route Handle
  getAllAdmin = async (
    req: Req,
  ): Promise<ApiDataListResponse<IDirectMessage>> => {
    const searchQuery: any = {};
    if (req.query._id) {
      searchQuery._id = req.query._id;
    }
    if (req.query.text)
      searchQuery.text = { $regex: req.query.text, $option: "i" };
    if (req.query.userId) searchQuery.user._id = { $regex: req.query.userId };
    return await getAllData<IDirectMessage>(
      searchQuery,
      req,
      this.DirectMessage,
      ["user", "replies.user"],
    );
  };

  create = async (text: string, userId: string): Promise<IDirectMessage> => {
    console.log(userId);
    const user = await this.User.get(userId);

    if (!user) throw new NotFoundError("");
    const item = new this.DirectMessage({
      user: userId,
      text,
      replies: [],
    });

    return await item.save();
  };

  //only admin in route Handle
  update = async (text: string) => {
    const item = await this.DirectMessage.findByIdAndUpdate(
      { text },
      { new: true },
    );
    if (!item) throw new NotFoundError("پیام یافت نشد");
    return item;
  };

  remove = async (id: string) => {
    const item = await this.DirectMessage.findByIdAndRemove(id);
    if (!item) throw new NotFoundError("پیام یافت نشد");
    return item;
  };

  reply = async (
    id: string,
    userId: string,
    text: string,
  ): Promise<IDirectMessage> => {
    const user = await this.User.get(userId);
    const item = await this.DirectMessage.findById(id);
    if (!item) throw new NotFoundError("پیام یافت نشد");
    if (user?.isAdmin || userId === item.user) {
      const item = await this.DirectMessage.findByIdAndUpdate(
        id,
        {
          $push: { replies: { user: userId, text } },
        },
        { new: true },
      ).populate(["user", "replies.user"]);
      if (!item) throw new NotFoundError();

      return item;
    }
    throw new BadRequestError("افزودن پیام برای شما امکان پذیر نیست.");
  };

  updateReply = async (
    directMessageId: string,
    replyId: string,
    text: string,
  ) => {
    const item = await this.DirectMessage.updateOne(
      {
        _id: directMessageId,
        "replies._id": replyId,
      },
      { $set: { "replies.$.text": text } },
    );
    if (!item) throw new NotFoundError("پیام یافت نشد");

    return item;
  };

  removeReply = async (id: string, replyId: string) => {
    const item = await this.DirectMessage.findByIdAndUpdate(id, {
      $pull: { replies: { _id: replyId } },
    });
    if (!item) throw new NotFoundError("پیام یافت نشد");
    return item;
  };
}

export default DirectMessageData;
