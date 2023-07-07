import { model, Schema, Types } from "mongoose";
import { IExperienceLike } from "@my/types";

import { defaultSchemaProps } from "@/utils/constants";

export const experienceLikeSchema = new Schema<IExperienceLike>({
  content: { type: Types.ObjectId, ref: "Experience", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  ...defaultSchemaProps,
});

export const ExperienceLike = model<IExperienceLike>(
  "ExperienceLike",
  experienceLikeSchema
);
