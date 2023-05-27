import { ICommentReply, IGeneralReply, INotification } from "@my/types";
import { Schema, Types } from "mongoose";

export const defaultSchemaProps = {
  creationDate: { type: Number, default: Date.now },
  modifiedDate: { type: Number, default: Date.now },
  isPublished: { type: Boolean, default: true },
};

export const commentReplySchema = new Schema<ICommentReply>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  ...defaultSchemaProps,
});

export const generalReplySchema = new Schema<IGeneralReply>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  ...defaultSchemaProps,
});

export const notificationSchema = new Schema<INotification>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  frontEndRoute: { type: Types.ObjectId, ref: "FrontEndRoute" },
  unReadNotification: { type: Boolean, default: true },
  contextId: String,
  ...defaultSchemaProps,
});
