import { model, Schema } from "mongoose";
import { IExperience } from "@my/types";
import { defaultSchemaProps } from "@/utils/constants";
import { experienceCategorySchema } from "@/components/experience/experienceCategory/experienceCategoryModel";

export const experienceSchema = new Schema<IExperience>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
  },
  text: {
    type: String,
    maxlength: [1000000, "حجم متن ارسال شده بیش از حد مجاز است"],
  },
  images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  experienceCategory: {
    type: experienceCategorySchema,
    required: [true, "دسته یندی تعیین نشده."],
  },
  featured: { type: Boolean, default: false },
  viewCount: Number,
  likeCount: Number,
  commentCount: Number,
  ...defaultSchemaProps,
});

export const Experience = model<IExperience>("Experience", experienceSchema);
