import { model, Schema, Types } from "mongoose";
import { IExperienceComment } from "@my/types";

import { commentReplySchema, defaultSchemaProps } from "@/utils/constants";

export const experienceCommentSchema = new Schema<IExperienceComment>({
  content: { type: Types.ObjectId, ref: "Experience", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  replies: [commentReplySchema],
  ...defaultSchemaProps,
});

export const ExperienceComment = model<IExperienceComment>(
  "ExperienceComment",
  experienceCommentSchema,
);
