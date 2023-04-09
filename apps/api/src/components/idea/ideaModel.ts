import { Schema, model } from "mongoose";
import { IIdea } from "@my/types";
import { defaultSchemaProps } from "@/utils/constants";
import { ideaCategorySchema } from "@/components/ideaCategory/ideaCategoryModel";

export const ideaSchema = new Schema<IIdea>({
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
  ideaCategory: {
    type: ideaCategorySchema,
    required: [true, "عنوان تعیین نشده."],
  },
  featured: { type: Boolean, default: false },
  isAdminApproved: { type: Boolean, default: false },
  isAdminSubmitted: { type: Boolean, default: false },
  viewCount: Number,
  likeCount: Number,
  commentCount: Number,
  ...defaultSchemaProps,
});

export const Idea = model<IIdea>("Idea", ideaSchema);
