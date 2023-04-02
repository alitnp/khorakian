import { model, Schema, Types } from "mongoose";
import { IPostLike } from "@my/types";

import { defaultSchemaProps } from "@/utils/constants";

export const postLikeSchema = new Schema<IPostLike>({
  content: { type: Types.ObjectId, ref: "Post", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  ...defaultSchemaProps,
});

export const PostLike = model<IPostLike>("PostLike", postLikeSchema);
