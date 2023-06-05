import { IVideo } from "@my/types";
import { model, Schema } from "mongoose";

export const videoSchema = new Schema<IVideo>({
  title: String,
  thumbnail: { type: Schema.Types.ObjectId, ref: "Image" },
  qualityVariations: [
    {
      fileName: String,
      size: String || Number,
      pathname: String,
      format: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "شناسه فرد ثبت کننده ارسال نشده"],
  },
  creationDate: { type: Number, default: Date.now },
  isPublished: { type: Boolean, default: true },
});

export const Video = model<IVideo>("Video", videoSchema);
