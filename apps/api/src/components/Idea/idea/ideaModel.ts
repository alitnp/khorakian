import { Schema, model } from "mongoose";
import { IIdea } from "@my/types";
import { defaultSchemaProps } from "@/utils/constants";

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
    type: Schema.Types.ObjectId,
    ref: "IdeaCategory",
    required: [true, "دسته بندی تعیین نشده."],
  },
  featured: { type: Boolean, default: false },
  isApprove: { type: Boolean, default: false },
  isAdminSubmitted: { type: Boolean, default: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "شناسه فرد ثبت کننده ارسال نشده"],
  },
  viewCount: Number,
  likeCount: Number,
  commentCount: Number,
  ...defaultSchemaProps,
});

export const Idea = model<IIdea>("Idea", ideaSchema);
