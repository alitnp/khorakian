import { IVideo } from "@my/types";
import { model, Schema } from "mongoose";

export const videoSchema = new Schema<IVideo>({
  title: String,
  temp: Boolean,
  thumbnailPathname: String,
  qualityVariations: [
    {
      fileName: String,
      size: String || Number,
      pathname: String,
      format: String,
    },
  ],
  creationDate: { type: Number, default: Date.now },
  isPublished: { type: Boolean, default: true },
});

export const Video = model<IVideo>("Video", videoSchema);
