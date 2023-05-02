import { model, Schema } from "mongoose";
import { IAboutMe } from "@my/types";
import { defaultSchemaProps } from "@/utils/constants";

export const aboutMePostsSchema = new Schema<IAboutMe>({
  // title: {
  //   type: String,
  //   required: [true, "عنوان تعیین نشده."],
  //   minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
  //   maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
  // },
  // text: {
  //   type: String,
  //   maxlength: [1000000, "حجم متن ارسال شده بیش از حد مجاز است"],
  // },
  // images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  ...defaultSchemaProps,
});

export const AboutMe = model<IAboutMe>("AboutMe", aboutMePostsSchema);
