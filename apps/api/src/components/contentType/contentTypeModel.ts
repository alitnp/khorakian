import { DefaultModelProperties } from "@my/types";
import { model, Schema, Types } from "mongoose";

export interface IContentType extends DefaultModelProperties {
  _id?: Types.ObjectId;
  title: string;
}

export const contentTypeSchema = new Schema<IContentType>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
    // unique: true,
    validate: {
      validator: async (title: string) => {
        const contentType = await ContentType.findOne({ title });
        if (!contentType) return true;
        else return false;
      },
      message: "این عنوان تکراری است.",
    },
  },
  creationDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
});

export const ContentType = model<IContentType>(
  "ContentType",
  contentTypeSchema,
);
