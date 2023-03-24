import { IImage } from "@my/types";
import { model, Schema } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

export const imageSchema = new Schema<IImage>({
  fileName: String,
  format: String,
  temp: Boolean,
  pathname: String,
  thumbnailPathname: String,
  title: String,
  ...defaultSchemaProps,
});

export const Image = model<IImage>("Image", imageSchema);
