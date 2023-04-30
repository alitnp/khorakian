import { Schema, model } from "mongoose";
import { ISocialMedia } from "@my/types";
import { defaultSchemaProps } from "@/utils/constants";

export const socialMediaPersianName = "شبکه اجتماعی";

const socialMediaSchema = new Schema<ISocialMedia>({
  title: String,
  url: String,
  englishTitle: String,
  image: { type: Schema.Types.ObjectId, ref: "Image" },
  ...defaultSchemaProps,
});

export const SocialMedia = model<ISocialMedia>(
  "SocialMedia",
  socialMediaSchema,
);
