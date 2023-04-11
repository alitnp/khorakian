import { model, Schema, Types } from "mongoose";
import { IPostComment } from "@my/types";

import { commentReplySchema, defaultSchemaProps } from "@/utils/constants";

export const postCommentSchema = new Schema<IPostComment>({
  content: { type: Types.ObjectId, ref: "Post", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  replies: [commentReplySchema],
  ...defaultSchemaProps,
});

export const PostComment = model<IPostComment>(
  "PostComment",
  postCommentSchema,
);
