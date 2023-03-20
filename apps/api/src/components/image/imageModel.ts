import { IImage } from "@my/types";
import { model, Schema } from "mongoose";

export const imageSchema = new Schema<IImage>({
  fileName: String,
  format: String,
  size: Number,
  temp: Boolean,
  pathname: String,
  creationDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
});

export const Image = model<IImage>("Image", imageSchema);
