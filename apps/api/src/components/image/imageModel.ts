import { IImage } from "@my/types";
import { model, Schema } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

export const imageSchema = new Schema<IImage>({
  fileName: String,
  format: String,
  pathname: String,
  thumbnailPathname: String,
  thumbnailHeight: Number,
  thumbnailWidth: Number,
  title: String,
  height: Number,
  width: Number,
  ...defaultSchemaProps,
});

export const Image = model<IImage>("Image", imageSchema);
