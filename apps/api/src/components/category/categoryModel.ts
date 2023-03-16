import { model, Schema, Types } from "mongoose";
import { DefaultModelProperties } from "@my/types";

export interface ICategory extends DefaultModelProperties {
  _id?: Types.ObjectId;
  title: string;
}

export const categorySchema = new Schema<ICategory>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [255, "عنوان حداکثر ۲۵۵ کاراکتر."],
    // unique: true,
    validate: {
      validator: async (title: string) => {
        const category = await Category.findOne({ title });
        if (!category) return true;
        else return false;
      },
      message: "این عنوان تکراری است.",
    },
  },
  creationDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
});

export const Category = model<ICategory>("Category", categorySchema);
