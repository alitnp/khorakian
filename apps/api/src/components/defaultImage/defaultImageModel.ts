import { IDefaultImage } from "@my/types";
import { model, Schema } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

export const defaultImagePersianName = "عکس پیشفرض";

export const defaultImageSchema = new Schema<IDefaultImage>({
  key: { type: String, required: true },
  persianKey: { type: String, required: true },
  image: { type: Schema.Types.ObjectId, ref: "Image", required: true },
  ...defaultSchemaProps,
});

export const DefaultImage = model<IDefaultImage>(
  "DefaultImage",
  defaultImageSchema,
);
