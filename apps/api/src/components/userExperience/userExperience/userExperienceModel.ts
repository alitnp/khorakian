import { Schema, model } from "mongoose";
import { IUserExperience } from "@my/types";
import { defaultSchemaProps } from "@/utils/constants";

export const userExperienceSchema = new Schema<IUserExperience>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [255, "عنوان حداکثر ۵۰ کاراکتر."],
  },
  text: {
    type: String,
    maxlength: [1000000, "حجم متن ارسال شده بیش از حد مجاز است"],
  },
  experienceCategory: {
    type: Schema.Types.ObjectId,
    ref: "ExperienceCategory",
    required: [true, "دسته بندی تعیین نشده."],
  },
  featured: { type: Boolean, default: false },
  isApprove: { type: Boolean, default: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "شناسه کاربر ثبت کننده ارسال نشده."],
  },
  // isAdminSubmitted: { type: Boolean, default: false },
  viewCount: Number,
  likeCount: Number,
  commentCount: Number,
  ...defaultSchemaProps,
});

export const UserExperience = model<IUserExperience>(
  "UserExperience",
  userExperienceSchema
);
