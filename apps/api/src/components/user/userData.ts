import { ApiDataListResponse } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";
import { Book } from "@/components/book/bookModel";
import { User, IUser, IUserRead } from "@/components/user/userModel";
import UnauthenticatedError from "@/helpers/error/UnauthorizedError";
import BadRequestError from "@/helpers/error/BadRequestError";

class UserData implements IData<IUser> {
  getAll = async (req: Req): Promise<ApiDataListResponse<IUser>> => {
    const searchQuery: any = {};
    if (req.query.fullName)
      searchQuery.fullName = { $regex: req.query.fullName, $options: "i" };
    if (req.query.firstName)
      searchQuery.firstName = { $regex: req.query.firstName, $options: "i" };
    if (req.query.lastName)
      searchQuery.lastName = { $regex: req.query.lastName, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;
    if (req.query.idAdmin) searchQuery.isAdmin = !!req.query.isAdmin;

    return getAllData<IUser>(searchQuery, req, User);
  };

  get = async (id: string): Promise<IUser> => {
    const user = await User.findById(id);
    if (!user) throw new NotFoundError();

    return user;
  };

  getCurrentUser = async (id: string): Promise<IUser> => {
    const user = await User.findById(id);
    if (!user) throw new UnauthenticatedError();

    return user;
  };

  create = async ({
    firstName,
    lastName,
    mobileNumber,
    password,
  }: IUser): Promise<IUser> => {
    const existingUser = await User.findOne({ mobileNumber });
    if (!!existingUser)
      throw new ConflictError("فردی با این شماره همراه در سیستم وجود دارد.");

    const user = new User({
      firstName,
      lastName,
      mobileNumber,
      isAdmin: false,
    });
    user.setFullName();
    user.password = await user.getHashedPassword(password);
    return await user.save();
  };

  update = async ({ _id, firstName, lastName }: IUser): Promise<IUser> => {
    const user = await User.findById(_id);
    if (!user) throw new NotFoundError();

    user.firstName = firstName;
    user.lastName = lastName;
    user.setFullName();

    await Book.updateMany(
      {
        "user._id": _id,
      },
      {
        $set: {
          "user.$": user,
        },
      },
    );

    return await user.save();
  };

  remove = async (id: string): Promise<IUser> => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError();

    return user;
  };

  toggleUserAdminAccess = async (id: string): Promise<IUser> => {
    const user = await User.findById(id);
    if (!user) throw new NotFoundError();

    user.isAdmin = !user.isAdmin;
    await user.save();
    return user;
  };

  login = async (mobileNumber: string, password: string): Promise<string> => {
    const user = await User.findOne({ mobileNumber });
    if (!user) throw new NotFoundError("کاربری با این شماره همراه یافت نشد.");

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
      throw new BadRequestError("رمز عبور وارد شده صحیح نیست.");

    return user.generateAuthToken();
  };

  getUserByMobileNumber = async (mobileNumber: string): Promise<IUserRead> => {
    const user = await User.findOne({ mobileNumber }).select("-password");
    if (!user) throw new NotFoundError("کاربری با این شماره موبایل یافت نشد.");

    return user;
  };
}

export default UserData;
