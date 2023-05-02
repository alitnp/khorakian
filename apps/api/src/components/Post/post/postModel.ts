import { model, Schema } from "mongoose";
import { IPost } from "@my/types";
import { defaultSchemaProps } from "@/utils/constants";
import { postCategorySchema } from "@/components/Post/postCategory/postCategoryModel";

export const postSchema = new Schema<IPost>({
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
  postCategory: {
    type: postCategorySchema,
    required: [true, "دسته بندی تعیین نشده."],
  },
  featured: { type: Boolean, default: false },
  viewCount: Number,
  likeCount: Number,
  commentCount: Number,
  ...defaultSchemaProps,
});

export const Post = model<IPost>("Post", postSchema);
