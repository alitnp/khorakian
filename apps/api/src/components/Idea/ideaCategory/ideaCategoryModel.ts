import { IIdeaCategory } from "@my/types";
import { model, Schema } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

export const ideaCategoryPersianName = "دسته بندی ایده";

export const ideaCategorySchema = new Schema<IIdeaCategory>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
  },
  ...defaultSchemaProps,
});

export const IdeaCategory = model<IIdeaCategory>(
  "IdeaCategory",
  ideaCategorySchema,
);
