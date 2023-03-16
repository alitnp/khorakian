import { Model, model, Schema, Types } from "mongoose";
import { DefaultModelProperties } from "@my/types";

export interface IAuthor extends DefaultModelProperties {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  fullName?: string;
}

interface IAuthorMethods {
  setFullName(): void;
}

type AuthorModel = Model<IAuthor, {}, IAuthorMethods>;

export const authorSchema = new Schema<IAuthor, AuthorModel, IAuthorMethods>({
  firstName: {
    type: String,
    required: [true, "نام تعیین نشده."],
    minlength: [2, "نام حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "نام حداکثر ۵۰ کاراکتر."],
  },
  lastName: {
    type: String,
    required: [true, "نام خانوادگی تعیین نشده."],
    minlength: [2, "نام خانوادگی حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "نام خانوادگی حداکثر ۵۰ کاراکتر."],
  },
  fullName: {
    type: String,
    required: [true, "نام و نام خانوادگی تعیین نشده."],
    minlength: [4, "نام و نام خانوادگی حداقل باید ۴ کاراکتر باشد."],
    maxlength: [100, "نام و نام خانوادگی حداکثر ۱۰۰ کاراکتر."],
    validate: {
      validator: async (fullName: string) => {
        const author = await Author.findOne({ fullName });
        if (!author) return true;
        else return false;
      },
      message: "این نام و نام خانوادگی تکراری است.",
    },
  },
  creationDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
});

authorSchema.methods.setFullName = function () {
  this.fullName = this.firstName + " " + this.lastName;
};

export const Author = model<IAuthor, AuthorModel>("Author", authorSchema);
