import { Model } from "mongoose";
import { ApiDataListResponse, IUser, IUserRead } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";
import { IUserMethods } from "@/components/user/userModel";
import UnauthenticatedError from "@/helpers/error/UnauthorizedError";
import BadRequestError from "@/helpers/error/BadRequestError";
import { stringToBoolean } from "@/utils/util";

class UserData implements IData<IUser> {
  User: Model<IUser, {}, IUserMethods>;

  constructor(User: Model<IUser, {}, IUserMethods>) {
    this.User = User;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IUser>> => {
    const searchQuery: any = {};
    if (req.query.fullName)
      searchQuery.fullName = { $regex: req.query.fullName, $options: "i" };
    if (req.query.firstName)
      searchQuery.firstName = { $regex: req.query.firstName, $options: "i" };
    if (req.query.lastName)
      searchQuery.lastName = { $regex: req.query.lastName, $options: "i" };
    if (req.query.mobileNumber)
      searchQuery.mobileNumber = { $regex: req.query.mobileNumber };
    if (req.query._id) searchQuery._id = req.query._id;
    if (req.query.idAdmin)
      searchQuery.isAdmin = stringToBoolean(req.query.isAdmin);

    return getAllData<IUser>(searchQuery, req, this.User);
  };

  get = async (id: string): Promise<IUser> => {
    const user = await this.User.findById(id);
    if (!user) throw new NotFoundError();

    return user;
  };

  getCurrentUser = async (id: string): Promise<IUser> => {
    const user = await this.User.findById(id).select("-password");
    if (!user) throw new UnauthenticatedError();

    return user;
  };

  create = async ({
    firstName,
    lastName,
    mobileNumber,
    password,
  }: IUser): Promise<IUser & { token: string }> => {
    const existingUser = await this.User.findOne({ mobileNumber });
    if (!!existingUser)
      throw new ConflictError("فردی با این شماره همراه در سیستم وجود دارد.");

    const user = new this.User({
      firstName,
      lastName,
      mobileNumber,
      isAdmin: false,
    });
    user.setFullName();
    user.password = await user.getHashedPassword(password);
    const token = user.generateAuthToken();
    const savedUser = await user.save();
    return { ...savedUser, token };
  };

  update = async ({ _id, firstName, lastName }: IUser): Promise<IUser> => {
    const user = await this.User.findById(_id);
    if (!user) throw new NotFoundError();

    user.firstName = firstName;
    user.lastName = lastName;
    user.setFullName();

    return await user.save();
  };

  remove = async (id: string): Promise<IUser> => {
    const user = await this.User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError();

    return user;
  };

  toggleUserAdminAccess = async (id: string): Promise<IUser> => {
    console.log("admin data");
    const userTemp = await this.User.findById(id);
    if (!userTemp) throw new NotFoundError();
    const user = await this.User.findByIdAndUpdate(id, {
      $set: { isAdmin: !userTemp?.isAdmin },
    });
    if (!user) throw new NotFoundError();

    return user;
  };

  login = async (mobileNumber: string, password: string): Promise<string> => {
    const user = await this.User.findOne({ mobileNumber });
    if (!user) throw new NotFoundError("کاربری با این شماره همراه یافت نشد.");

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
      throw new BadRequestError("رمز عبور وارد شده صحیح نیست.");

    return user.generateAuthToken();
  };

  getUserByMobileNumber = async (mobileNumber: string): Promise<IUserRead> => {
    const user = await this.User.findOne({ mobileNumber }).select("-password");
    if (!user) throw new NotFoundError("کاربری با این شماره موبایل یافت نشد.");

    return user;
  };
}

export default UserData;
