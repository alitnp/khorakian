import { model, Schema, Types } from "mongoose";
import { IDirectMessage } from "@my/types";

import { defaultSchemaProps, generalReplySchema } from "@/utils/constants";

export const directMessageSchema = new Schema<IDirectMessage>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  replies: [generalReplySchema],
  ...defaultSchemaProps,
});

export const DirectMessage = model<IDirectMessage>(
  "DirectMessage",
  directMessageSchema,
);
