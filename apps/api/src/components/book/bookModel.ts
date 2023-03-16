import { DefaultModelProperties } from "@my/types";
import { model, ObjectId, Schema, Types } from "mongoose";
import { categorySchema, ICategory } from "@/components/category/categoryModel";
import { authorSchema, IAuthor } from "@/components/author/authorModel";

export interface IBook extends DefaultModelProperties {
  _id?: Types.ObjectId;
  title: string;
  authors: IAuthor[];
  category: ICategory;
}
export interface IBookRead extends DefaultModelProperties {
  _id: Types.ObjectId;
  title: string;
  authors: IAuthor[];
  category: ICategory;
}
export interface IBookCreate {
  title: string;
  authorsIds: ObjectId[];
  categoryId: ObjectId;
}
export interface IBookUpdate {
  id: Types.ObjectId;
  title: string;
  authorsIds: ObjectId[];
  categoryId: ObjectId;
}

export const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [255, "عنوان حداکثر ۲۵۵ کاراکتر."],
  },
  authors: [authorSchema],
  category: categorySchema,
  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: Category.modelName,
  //   required: true,
  // },
  creationDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
});

export const Book = model<IBook>("Book", bookSchema);
