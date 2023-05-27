import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IExperienceCategory,
  INotificationCreate,
  IUserExperience,
  IUserExperienceComment,
  IUserExperienceLike,
  IUserExperienceRead,
  IUserRead,
  notificationType,
} from "@my/types";
import LikeData from "@/components/Like/likeData";
import CommentData from "@/components/comment/commentData";
import { getUserIdFromReq, stringToBoolean } from "@/utils/util";
import { defaultSearchQueries, paginationProps } from "@/data/globalData";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "@/helpers/error";
import UnauthorizedError from "@/helpers/error/UnauthorizedError";
import ExperienceCategoryData from "@/components/experience/experienceCategory/experienceCategoryData";
import UserData from "@/components/user/userData";
import FrontEndRouteData from "@/components/frontEndRoute/frontEndRouteData";

class UserExperienceData {
  UserExperience: Model<IUserExperience>;
  ExperienceCategory: ExperienceCategoryData;
  UserExperienceLike: LikeData<IUserExperienceLike>;
  UserExperienceComment: CommentData<IUserExperienceComment>;
  User: UserData;
  FrontEndRouteData: FrontEndRouteData;

  constructor(
    UserExperience: Model<IUserExperience>,
    ExperienceCategory: ExperienceCategoryData,
    UserExperienceLike: LikeData<IUserExperienceLike>,
    UserExperienceComment: CommentData<IUserExperienceComment>,
    User: UserData,
    FrontEndRouteData: FrontEndRouteData,
  ) {
    this.UserExperience = UserExperience;
    this.ExperienceCategory = ExperienceCategory;
    this.UserExperienceLike = UserExperienceLike;
    this.UserExperienceComment = UserExperienceComment;
    this.User = User;
    this.FrontEndRouteData = FrontEndRouteData;
  }

  getAll = async (
    req: Req,
    userId?: string,
  ): Promise<ApiDataListResponse<IUserExperienceRead>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query._id) {
      searchQuery._id = req.query._id;
    }
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query.text)
      searchQuery.text = { $regex: req.query.text, $option: "i" };
    // if (req.query.isAdminSubmitted)
    //   searchQuery.isAdminSubmitted = !!req.query.isAdminSubmitted;
    if (req.query.userExperienceCategory) {
      searchQuery.userExperienceCategory._id = {
        $regex: req.query.userExperienceCategory,
      };
    }
    if (req.query.isApprove !== undefined)
      searchQuery.isApprove = stringToBoolean(req.query.isApprove);
    if (req.query.featured !== undefined)
      searchQuery.featured = stringToBoolean(req.query.featured);

    const {
      fixedSearchQuery,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc,
    } = await paginationProps(searchQuery, req, this.UserExperience);

    const data: IUserExperienceRead[] = await this.UserExperience.find({
      ...fixedSearchQuery,
      user: getUserIdFromReq(req),
    })
      .populate<{ experienceCategory: IExperienceCategory }>(
        "experienceCategory",
      )
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort(sortBy ? { [sortBy]: desc } : { creationDate: -1 })
      .lean();

    //add liked to each post
    for (let i = 0; i < data.length; i++) {
      const userExperience = data[i];
      if (!userId) data[i].liked = false;
      else
        data[i].liked = await this.UserExperienceLike.isUserLiked(
          userExperience._id,
          userId,
        );
    }
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

  get = async (id: string, userId?: string): Promise<IUserExperienceRead> => {
    const userExperience = await this.UserExperience.findById(id)
      .populate<{
        experienceCategory: IExperienceCategory;
        user: IUserRead;
      }>(["experienceCategory", "user"])
      .lean();

    if (!userExperience) throw new NotFoundError();
    if (userId != userExperience.user._id)
      await this.UserExperience.findByIdAndUpdate(id, {
        $inc: { viewCount: 1 },
      });

    const userExperienceRead = {
      ...userExperience,
      liked: false,
    } as IUserExperienceRead;
    if (userId)
      userExperienceRead.liked = await this.UserExperienceLike.isUserLiked(
        id,
        userId,
      );

    return userExperienceRead;
  };

  create = async ({
    title,
    experienceCategory,
    text,
    featured,
    user,
  }: // isAdminSubmitted,
  IUserExperience): Promise<IUserExperienceRead> => {
    if (!user) throw new UnauthorizedError();
    await this.User.get(user);
    if (!experienceCategory) throw new NotFoundError();
    const existingExperienceCategory = await this.ExperienceCategory.get(
      experienceCategory,
    );
    if (!existingExperienceCategory)
      throw new BadRequestError("دسته بندی با این شناسه یافت نشد.");

    const userExperience = new this.UserExperience({
      title,
      experienceCategory,
      text,
      featured: !!featured,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      user,
      // isAdminSubmitted,
    });
    await userExperience.save();
    return await this.get(userExperience._id);
  };

  update = async ({
    _id,
    title,
    experienceCategory,
    text,
    featured,
    user,
  }: IUserExperience & { _id: string }): Promise<IUserExperienceRead> => {
    if (!user) throw new UnauthenticatedError();
    await this.User.get(user);
    if (!experienceCategory) throw new NotFoundError();
    const existingExperienceCategory = await this.ExperienceCategory.get(
      experienceCategory,
    );
    const userExpt = await this.get(_id);
    if (userExpt.user._id != user)
      throw new BadRequestError("شما دسترسی ویرایش این مورد را ندارید");

    if (userExpt.isApprove)
      throw new BadRequestError("تجربیات منتشر شده امکان ویرایش ندارند.");

    const userExperience = await this.UserExperience.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          postCategory: existingExperienceCategory,
          text,
          featured: !!featured,
        },
      },
      { new: true },
    );
    if (!userExperience) throw new NotFoundError();

    return await this.get(userExperience._id);
  };

  remove = async (
    id: string,
    isAdmin: boolean,
    userId?: string,
  ): Promise<IUserExperienceRead> => {
    const item = await this.get(id);

    if (!isAdmin && !userId) throw new UnauthenticatedError();
    if (!isAdmin && userId != item.user._id) throw new UnauthorizedError();
    await this.UserExperience.findByIdAndDelete(id);
    return item;
  };

  like = async (
    userExperienceId: string,
    userId?: string,
  ): Promise<IUserExperienceRead> => {
    if (!userId) throw new UnauthorizedError();

    await this.UserExperienceLike.like(userExperienceId, userId);

    await this.UserExperience.findByIdAndUpdate(userExperienceId, {
      $inc: { likeCount: 1 },
    });

    this.#addNotificationToUser({
      title: "پسند",
      text: "تجربه شما با عنوان %expTitle% توسط %userFullName% پسند شد.",
      contentId: userExperienceId,
      creatorId: userId,
      type: "like",
    });

    return await this.get(userExperienceId, userId);
  };

  dislike = async (
    userExperienceId: string,
    userId?: string,
  ): Promise<IUserExperienceRead> => {
    if (!userId) throw new UnauthorizedError();
    await this.UserExperienceLike.disLike(userExperienceId, userId);
    const item = await this.get(userExperienceId, userId);
    const updatedUserExperience = await this.UserExperience.findByIdAndUpdate(
      userExperienceId,
      {
        $inc: { likeCount: item.likeCount > 0 ? -1 : 0 },
      },
    );
    if (!updatedUserExperience) throw new NotFoundError();

    return await this.get(userExperienceId);
  };

  getAllLikes = async (
    req: Req,
  ): Promise<ApiDataListResponse<IUserExperienceLike>> => {
    const comments = await this.UserExperienceLike.getAll(req);
    return comments;
  };

  getAllComments = async (
    req: Req,
  ): Promise<ApiDataListResponse<IUserExperienceComment>> => {
    const comments = await this.UserExperienceComment.getAll(req);

    return comments;
  };

  comment = async (
    userExperienceId: string,
    userId: string | undefined,
    text: string,
  ) => {
    if (!userId) throw new UnauthorizedError();

    const item = await this.UserExperience.findById(userExperienceId);
    if (!item) throw new NotFoundError();

    await this.UserExperienceComment.create(userExperienceId, userId, text);

    await this.UserExperience.findByIdAndUpdate(userExperienceId, {
      $inc: { commentCount: 1 },
    });

    this.#addNotificationToUser({
      title: "نظر",
      text: "%userFullName% برای تجربه شما با عنوان %expTitle% یک نظر ثبت کرد.",
      contentId: userExperienceId,
      creatorId: userId,
      type: "comment",
    });

    return await this.get(item._id);
  };

  reply = async (
    commentId: string,
    userId: string | undefined,
    text: string,
    experienceId: string,
  ) => {
    if (!userId) throw new UnauthorizedError();

    const comment = await this.UserExperienceComment.reply(
      commentId,
      userId,
      text,
    );

    this.#addNotificationToUser({
      title: "پاسخ",
      text: "%userFullName% به نظر شما پاسخ داد.",
      contentId: experienceId,
      creatorId: userId,
      type: "comment",
    });

    return await this.get(comment.content as string);
  };

  approve = async (id: string): Promise<IUserExperienceRead> => {
    const item = await this.UserExperience.findByIdAndUpdate(
      id,
      {
        $set: { isApprove: true },
      },
      { new: true },
    );
    if (!item) throw new NotFoundError();
    this.#addNotificationToUser({
      title: "تایید",
      text: "تجربه شما با عنوان %expTitle% توسط ادمین تایید شد.",
      contentId: id,
      type: "success",
    });

    return await this.get(id);
  };

  disApprove = async (id: string): Promise<IUserExperienceRead> => {
    const item = await this.UserExperience.findByIdAndUpdate(
      id,
      {
        $set: { isApprove: false },
      },
      { new: true },
    );
    if (!item) throw new NotFoundError();

    this.#addNotificationToUser({
      title: "تایید",
      text: "تجربه شما با عنوان %expTitle% توسط ادمین رد شد.",
      contentId: id,
      type: "error",
    });

    return await this.get(id);
  };

  #addNotificationToUser = async ({
    title,
    text,
    contentId,
    creatorId,
    type,
  }: {
    title: string;
    text: string;
    contentId: string;
    creatorId?: string;
    type?: notificationType;
  }) => {
    const frontEndRoute = await this.FrontEndRouteData.getByTitle(
      "userExperienceDetail",
    );
    if (!frontEndRoute) return;

    const creatorUser = creatorId && (await this.User.get(creatorId));
    if (creatorUser)
      text.replace(
        "%userFullName%",
        "<b>" + creatorUser.isAdmin ? "ادمین" : creatorUser.fullName + "</b>",
      );

    const userExp = await this.get(contentId);
    if (!userExp) return;

    const notfication: INotificationCreate = {
      title,
      text: text.replace("%expTitle%", "<b>" + userExp.title + "</b>"),
      frontEndRoute: frontEndRoute._id,
      contextId: userExp._id,
      notificatoinType: type || "default",
    };
    this.User.addNotification(userExp.user._id, notfication);
  };
}

export default UserExperienceData;
