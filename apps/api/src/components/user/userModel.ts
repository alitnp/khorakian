import { Model, model, Schema } from "mongoose";
import { IUser } from "@my/types";
import jwt from "jsonwebtoken";
import CONFIG from "@/config";
import { compare, hash } from "@/utils/crypt";
import { defaultSchemaProps, notificationSchema } from "@/utils/constants";

export interface IUserMethods {
  generateAuthToken(): string;
  comparePassword(_password: string): Promise<boolean>;
  getHashedPassword(_password: string): Promise<string>;
}
type UserModel = Model<IUser, {}, IUserMethods>;

export const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  fullName: {
    type: String,
    required: [true, "نام و نام خانوادگی تعیین نشده."],
    minlength: [4, "نام و نام خانوادگی حداقل باید ۴ کاراکتر باشد."],
    maxlength: [100, "نام و نام خانوادگی حداکثر ۱۰۰ کاراکتر."],
  },
  mobileNumber: {
    type: String,
    required: [true, "شماره موبایل تعیین نشده."],
    minlength: [11, "شماره موبایل حداقل باید ۱۱ رقم باشد."],
    maxlength: [11, "شماره موبایل حداکثر ۱۱ رقم."],
    // unique: true,
    validate: {
      validator: async (mobileNumber: string) => {
        const user = await User.findOne({ mobileNumber });
        if (!user) return true;
        else return false;
      },
      message: "فردی با این شماره تلفن در سیستم وجود دارد.",
    },
  },
  image: { type: Schema.Types.ObjectId, ref: "Image" },
  password: { type: String, minlength: 8, maxlength: 1024, required: true },
  isAdmin: { type: Boolean, default: false },
  notification: [notificationSchema],
  ...defaultSchemaProps,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    CONFIG.AUTH.ACCESS_TOKEN_SALT as string,
  );

  return token;
};
userSchema.methods.comparePassword = async function (requestPassword: string) {
  return await compare(requestPassword, this.password);
};

userSchema.methods.getHashedPassword = async function (password: string) {
  return await hash(password);
};

export const User = model<IUser, UserModel>("User", userSchema);
