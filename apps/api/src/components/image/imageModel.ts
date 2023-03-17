import { IImage } from "@my/types";
import { model, Schema } from "mongoose";

export const imageSchema = new Schema<IImage>({
  fileName: String,
  formart: String,
  size: Number,
  temp: Boolean,
  creationDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
});

export const PostCategory = model<IImage>("Image", imageSchema);
