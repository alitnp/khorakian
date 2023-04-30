import { ISlider } from "@my/types";
import { Schema, model } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

const sliderSchema = new Schema<ISlider>({
  index: { type: Number, default: 0 },
  title: String,
  subTitle: String,
  shortDesc: String,
  desc: String,
  image: { type: Schema.Types.ObjectId, ref: "Image", required: true },
  url: String,
  direction: {
    type: String,
    enum: ["right", "left", "center", "hidden"],
    default: "right",
  },
  ...defaultSchemaProps,
});

export const Slider = model<ISlider>("Slider", sliderSchema);
