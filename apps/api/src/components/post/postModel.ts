import { model, Schema } from "mongoose";
import { IPost } from "@my/types";
import { imageSchema } from "@/components/image/imageModel";
import { postCategorySchema } from "@/components/postCategory/postCategoryModel";
import { videoSchema } from "@/components/video/videoModel";
import { defaultSchemaProps } from "@/utils/constants";

export const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
  },
  text: String,
  images: [imageSchema],
  videos: [videoSchema],
  postCategory: {
    type: postCategorySchema,
    required: [true, "عنوان تعیین نشده."],
  },
  ...defaultSchemaProps,
});

export const Post = model<IPost>("Post", postSchema);
