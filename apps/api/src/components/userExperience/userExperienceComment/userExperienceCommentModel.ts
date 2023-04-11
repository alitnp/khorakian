import { model, Schema, Types } from "mongoose";
import { IUserExperienceComment } from "@my/types";

import { commentReplySchema, defaultSchemaProps } from "@/utils/constants";

export const userExperienceCommentSchema = new Schema<IUserExperienceComment>({
  content: { type: Types.ObjectId, ref: "UserExperience", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  replies: [commentReplySchema],
  ...defaultSchemaProps,
});

export const UserExperienceComment = model<IUserExperienceComment>(
  "UserExperienceComment",
  userExperienceCommentSchema,
);
