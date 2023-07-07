import { model, Schema, Types } from "mongoose";
import { IIdeaComment } from "@my/types";

import { commentReplySchema, defaultSchemaProps } from "@/utils/constants";

export const ideaCommentSchema = new Schema<IIdeaComment>({
  content: { type: Types.ObjectId, ref: "Idea", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  replies: [commentReplySchema],
  ...defaultSchemaProps,
});

export const IdeaComment = model<IIdeaComment>(
  "IdeaComment",
  ideaCommentSchema
);
