import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IImage,
  INotificationCreate,
  INotificationRead,
  IUser,
  IUserRead,
  notificationType,
} from "@my/types";
import {
  IData,
  defaultSearchQueries,
  paginationProps,
} from "@/data/globalData";
import {
  ConflictError,
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} from "@/helpers/error";
import { IUserMethods } from "@/components/user/userModel";
import { stringToBoolean } from "@/utils/util";
import ImageData from "@/components/image/imageData";
import { fileForm } from "@/middlewares/fileForm";
import FrontEndRouteData from "@/components/frontEndRoute/frontEndRouteData";

class UserData implements IData<IUserRead> {
  User: Model<IUser, {}, IUserMethods>;
  Image: ImageData;
  FrontEndRouteData: FrontEndRouteData;
  constructor(
    User: Model<IUser, {}, IUserMethods>,
    Image: ImageData,
    FrontEndRouteData: FrontEndRouteData,
  ) {
    this.User = User;
    this.Image = Image;
    this.FrontEndRouteData = FrontEndRouteData;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IUserRead>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
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
      .select(["-password", "-notification"])
      .lean();

    if (!user) throw new NotFoundError();
    return user;
  };

  getCurrentUser = async (id: string): Promise<IUserRead> => {
    const user = await this.User.findById(id)
      .select(["-password", "-notification"])
      .populate<{ image: IImage }>(["image"]);
    if (!user) throw new UnauthenticatedError();
    return user;
  };

  addNotification = async (
    userId: string,
    notification: INotificationCreate,
  ): Promise<INotificationRead[]> => {
    const user = await this.User.findByIdAndUpdate(userId, {
      $push: { notification: { $each: [notification], $position: 0 } },
    }).populate<{ notification: INotificationRead[] }>({
      path: "notification",
      populate: { path: "frontEndRoute", model: "FrontEndRoute" },
    });
    if (!user) throw new BadRequestError("کاربری با این شناسه یافت نشد.");
    return user.notification;
  };

  getMyNotifications = async (id: string): Promise<INotificationRead[]> => {
    const user = await this.User.findById(id)
      .slice("notification", [0, 50])
      .populate<{
        notification: INotificationRead[];
      }>({
        path: "notification",
        populate: {
          path: "frontEndRoute",
          model: "FrontEndRoute",
        },
      });
    if (!user) throw new NotFoundError();
    return user.notification;
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
    const user = await this.User.findByIdAndUpdate(userId, { image: item._id });
    if (!user) throw new NotFoundError("کاربر یافت نشد");
    return this.get(user._id);
  };

  remove = async (id: string): Promise<IUserRead> => {
    const user = await this.get(id);
    await this.User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError();

    return user;
  };

  toggleUserAdminAccess = async (id: string): Promise<IUser> => {
    const userTemp = await this.User.findById(id);
    if (!userTemp) throw new NotFoundError();
    const user = await this.User.findByIdAndUpdate(id, {
      $set: { isAdmin: !userTemp?.isAdmin },
    });
    if (!user) throw new NotFoundError();

    return user;
  };

  login = async (
    mobileNumber: string,
    password: string,
  ): Promise<{ token: string; user: IUserRead }> => {
    const user = await this.User.findOne({ mobileNumber }).populate<{
      image: IImage;
    }>("image");
    if (!user) throw new NotFoundError("کاربری با این شماره همراه یافت نشد.");

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
      throw new BadRequestError("رمز عبور وارد شده صحیح نیست.");
    const token = user.generateAuthToken();
    return { user, token };
  };

  getUserByMobileNumber = async (mobileNumber: string): Promise<IUserRead> => {
    const user = await this.User.findOne({ mobileNumber })
      .select("-password")
      .populate<{ image: IImage }>(["image"])
      .lean();
    if (!user) throw new NotFoundError("کاربری با این شماره موبایل یافت نشد.");

    return user;
  };

  changePassword = async (
    currentPassword: string,
    newPassword: string,
    userId?: string,
  ): Promise<IUser> => {
    if (!userId) throw new UnauthenticatedError();
    const user = await this.User.findById(userId);
    if (!user) throw new UnauthenticatedError();
    const isPassowrdCurrect = await user.comparePassword(currentPassword);
    if (!isPassowrdCurrect)
      throw new BadRequestError("رمز عبور فعلی بدرستی وارد نشده");
    const hashedPass = await user.getHashedPassword(newPassword);
    await this.User.findByIdAndUpdate(userId, { password: hashedPass });
    return user;
  };

  createNotificationAndAddToUser = async ({
    title,
    text,
    contentId,
    creatorUserId,
    notifUserId,
    type,
    frontEndRouteTitle,
  }: {
    title: string;
    text: string;
    contentId: string;
    frontEndRouteTitle: string;
    notifUserId: string;
    creatorUserId?: string;
    type?: notificationType;
  }) => {
    let notifText = text;
    const frontEndRoute = await this.FrontEndRouteData.getByTitle(
      frontEndRouteTitle,
    );
    if (!frontEndRoute) return;

    const creatorUser = creatorUserId
      ? await this.User.findById(creatorUserId)
      : undefined;
    if (creatorUser)
      notifText = text.replace(
        "user",
        creatorUser.isAdmin ? "ادمین" : creatorUser.fullName,
      );

    const notifUser = await this.User.findById(notifUserId);
    if (!notifUser) return;

    const notfication: INotificationCreate = {
      title,
      text: notifText,
      frontEndRoute: frontEndRoute._id,
      contextId: contentId,
      notificatoinType: type || "default",
    };
    this.addNotification(notifUser._id, notfication);
  };
}

export default UserData;
