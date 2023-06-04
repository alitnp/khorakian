import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IDirectMessage,
  IDirectMessageRead,
  IUserRead,
} from "@my/types";
import { NotFoundError } from "@/helpers/error";
import { defaultSearchQueries, getAllData } from "@/data/globalData";
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
    isAdmin?: boolean,
    userId?: string,
  ): Promise<ApiDataListResponse<IDirectMessage>> => {
    if (!userId) throw new NotFoundError();

    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (!isAdmin) {
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

  get = async (
    id: string,
    isAdmin?: boolean,
    userId?: string,
  ): Promise<IDirectMessageRead> => {
    if (!id) throw new BadRequestError("شناسه پیام ارسال نشده");
    if (!userId) throw new NotFoundError();

    const item = (await this.DirectMessage.findById(id).populate<{
      user: IUserRead;
    }>(["user", "replies.user"])) as IDirectMessageRead | null;
    if (!item) throw new NotFoundError();

    if (isAdmin) return item;
    if (!isAdmin && userId != item.user._id) throw new NotFoundError();
    return item;
  };

  getMyMessages = async (userId: string): Promise<IDirectMessageRead> => {
    const item = (await this.DirectMessage.findOne({ user: userId }).populate<{
      user: IUserRead;
    }>(["user", "replies.user"])) as IDirectMessageRead | null;
    if (!item) throw new NotFoundError();

    return item;
  };

  create = async (
    text: string,
    userId: string,
  ): Promise<IDirectMessageRead> => {
    const user = await this.User.get(userId);

    if (!user) throw new NotFoundError("");
    const item = new this.DirectMessage({
      user: userId,
      text,
      replies: [],
    });
    const newItem = await item.save();
    return await this.get(newItem._id + "", false, userId);
  };

  //only admin in route Handle
  update = async (text: string): Promise<IDirectMessageRead> => {
    const item = await this.DirectMessage.findByIdAndUpdate(
      { text },
      { new: true },
    );
    if (!item) throw new NotFoundError("پیام یافت نشد");
    return await this.get(item._id + "", false, item.user);
  };

  remove = async (id: string) => {
    const item = await this.DirectMessage.findByIdAndRemove(id);
    if (!item) throw new NotFoundError("پیام یافت نشد");
    return item;
  };

  reply = async (
    id: string,
    text: string,
    userId: string,
  ): Promise<IDirectMessageRead> => {
    const user = await this.User.get(userId);
    const item = await this.DirectMessage.findById(id);
    if (!item) throw new NotFoundError("پیام یافت نشد");

    if (user?.isAdmin || userId == item.user) {
      const item = await this.DirectMessage.findByIdAndUpdate(
        id,
        {
          $push: { replies: { user: userId, text } },
        },
        { new: true },
      );
      if (!item) throw new NotFoundError();

      return await this.get(id, user?.isAdmin, userId);
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
