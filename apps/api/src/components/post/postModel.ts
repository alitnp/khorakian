import { model, Schema } from "mongoose";
import { IPost } from "@my/types";
import { postCategorySchema } from "@/components/postCategory/postCategoryModel";
import { defaultSchemaProps } from "@/utils/constants";

export const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
  },
  text: String,
  images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  postCategory: {
    type: postCategorySchema,
    required: [true, "عنوان تعیین نشده."],
  },
  ...defaultSchemaProps,
});

export const Post = model<IPost>("Post", postSchema);
