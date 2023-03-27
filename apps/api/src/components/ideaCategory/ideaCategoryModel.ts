import { IIdeaCategory } from "@my/types";
import { model, Schema } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

export const ideaCategorySchema = new Schema<IIdeaCategory>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
    // unique: true,
    validate: {
      validator: async (title: string) => {
        const ideaCategory = await IdeaCategory.findOne({ title });
        if (!ideaCategory) return true;
        else return false;
      },
      message: "این عنوان تکراری است.",
    },
  },
  ...defaultSchemaProps,
});

export const IdeaCategory = model<IIdeaCategory>(
  "IdeaCategory",
  ideaCategorySchema,
);
