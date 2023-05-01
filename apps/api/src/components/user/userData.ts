import { Model } from "mongoose";
import { ApiDataListResponse, IImage, IUser, IUserRead } from "@my/types";
import { IData, paginationProps } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";
import { IUserMethods } from "@/components/user/userModel";
import UnauthenticatedError from "@/helpers/error/UnauthorizedError";
import BadRequestError from "@/helpers/error/BadRequestError";
import { stringToBoolean } from "@/utils/util";
import ImageData from "@/components/image/imageData";
import { fileForm } from "@/middlewares/fileForm";

class UserData implements IData<IUserRead> {
  User: Model<IUser, {}, IUserMethods>;
  Image: ImageData;
  constructor(User: Model<IUser, {}, IUserMethods>, Image: ImageData) {
    this.User = User;
    this.Image = Image;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IUserRead>> => {
    const searchQuery: any = {};
    if (req.query.fullName)
      searchQuery.fullName = { $regex: req.query.fullName, $options: "i" };

    if (req.query.mobileNumber)
      searchQuery.mobileNumber = { $regex: req.query.mobileNumber };

    if (req.query._id) searchQuery._id = req.query._id;
    if (req.query.idAdmin)
      searchQuery.isAdmin = stringToBoolean(req.query.isAdmin);

    const {
      fixedSearchQuery,
      pageNumber,
      pageSize,
      sortBy,
      desc,
      totalItems,
      totalPages,
    } = await paginationProps(searchQuery, req, this.User);

    const data: IUserRead[] = (await this.User.find(fixedSearchQuery)
      .populate<{ image: IImage }>(["image"])
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort(sortBy ? { [sortBy]: desc } : { creationDate: -1 })
      .lean()) as IUserRead[];

    return {
      data,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc: desc === -1 ? true : false,
    };
  };

  get = async (id: string): Promise<IUserRead> => {
    const user = await this.User.findById(id)
      .populate<{ image: IImage }>(["image"])
      .lean();

    if (!user) throw new NotFoundError();
    return user;
  };

  getCurrentUser = async (id: string): Promise<IUserRead> => {
    const user = await this.User.findById(id)
      .select("-password")
      .populate<{ image: IImage }>(["image"]);
    if (!user) throw new UnauthenticatedError();
    return user;
  };

  //dont use
  create = async ({}: IUserRead): Promise<IUserRead> => {
    return {} as IUserRead;
  };

  register = async ({
    fullName,
    mobileNumber,
    password,
  }: IUser): Promise<IUser & { token: string }> => {
    const existingUser = await this.User.findOne({ mobileNumber });
    if (!!existingUser)
      throw new ConflictError("فردی با این شماره همراه در سیستم وجود دارد.");

    const user = new this.User({
      fullName,
      mobileNumber,
      isAdmin: false,
    });

    user.password = await user.getHashedPassword(password);
    const token = user.generateAuthToken();
    const savedUser = await user.save();
    return { ...savedUser, token };
  };

  update = async ({ _id, fullName }: IUser): Promise<IUserRead> => {
    const user = await this.User.findByIdAndUpdate(_id, {
      $set: {
        fullName,
      },
    });

    if (!user) throw new NotFoundError();

    return await this.get(_id);
  };

  uploadProfile = async (
    file: fileForm,
    title?: string,
    userId?: string,
  ): Promise<IUserRead> => {
    const item = await this.Image.createImageFile(file, title);
    const user = await this.User.findById(userId);
    if (!user) throw new NotFoundError("کاربر یافت نشد");
    user.image = item._id;
    await user.save();
    return this.get(user._id);
  };

  remove = async (id: string): Promise<IUserRead> => {
    const user = await this.get(id);
    await this.User.findByIdAndDelete(id);
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
    const user = await this.User.findOne({ mobileNumber })
      .select("-password")
      .populate<{ image: IImage }>(["image"])
      .lean();
    if (!user) throw new NotFoundError("کاربری با این شماره موبایل یافت نشد.");

    return user;
  };
}

export default UserData;
