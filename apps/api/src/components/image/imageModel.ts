import { IImage } from "@my/types";
import { model, Schema } from "mongoose";

export const imageSchema = new Schema<IImage>({
  fileName: String,
  format: String,
  temp: Boolean,
  pathname: String,
  thumbnailPathname: String,
  creationDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
});

export const Image = model<IImage>("Image", imageSchema);
