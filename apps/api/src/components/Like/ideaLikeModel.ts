import { model, Schema, Types } from "mongoose";
import { IIdeaLike } from "@my/types";

import { defaultSchemaProps } from "@/utils/constants";

export const ideaLikeSchema = new Schema<IIdeaLike>({
  content: { type: Types.ObjectId, ref: "Idea", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  ...defaultSchemaProps,
});

export const IdeaLike = model<IIdeaLike>("IdeaLike", ideaLikeSchema);
