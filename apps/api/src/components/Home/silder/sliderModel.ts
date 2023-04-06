import { ISlider } from "@my/types";
import { Schema, Types, model } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

const sliderSchema = new Schema<ISlider>({
  title: String,
  subTitle: String,
  shortDesc: String,
  desc: String,
  image: { type: Types.ObjectId, ref: "Image", required: true },
  url: String,
  direction: {
    type: String,
    enum: ["right", "left", "center"],
    default: "right",
  },
  ...defaultSchemaProps,
});

export const Slider = model<ISlider>("Slider", sliderSchema);
