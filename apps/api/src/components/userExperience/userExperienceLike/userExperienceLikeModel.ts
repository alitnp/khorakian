import { model, Schema, Types } from "mongoose";
import { IUserExperienceLike } from "@my/types";

import { defaultSchemaProps } from "@/utils/constants";

export const userExperienceLikeSchema = new Schema<IUserExperienceLike>({
  content: { type: Types.ObjectId, ref: "UserExperience", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  ...defaultSchemaProps,
});

export const UserExperienceLike = model<IUserExperienceLike>(
  "UserExperienceLike",
  userExperienceLikeSchema
);
