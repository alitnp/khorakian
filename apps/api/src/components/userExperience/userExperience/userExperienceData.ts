import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IExperienceCategory,
  IUserExperience,
  IUserExperienceComment,
  IUserExperienceLike,
  IUserExperienceRead,
  IUserRead,
} from "@my/types";
import LikeData from "@/components/Like/likeData";
import CommentData from "@/components/comment/commentData";
import { stringToBoolean } from "@/utils/util";
import { defaultSearchQueries, paginationProps } from "@/data/globalData";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "@/helpers/error";
import UnauthorizedError from "@/helpers/error/UnauthorizedError";
import ExperienceCategoryData from "@/components/experience/experienceCategory/experienceCategoryData";
import UserData from "@/components/user/userData";

class UserExperienceData {
  UserExperience: Model<IUserExperience>;
  ExperienceCategory: ExperienceCategoryData;
  UserExperienceLike: LikeData<IUserExperienceLike>;
  UserExperienceComment: CommentData<IUserExperienceComment>;
  User: UserData;

  constructor(
    UserExperience: Model<IUserExperience>,
    ExperienceCategory: ExperienceCategoryData,
    UserExperienceLike: LikeData<IUserExperienceLike>,
    UserExperienceComment: CommentData<IUserExperienceComment>,
    User: UserData,
  ) {
    this.UserExperience = UserExperience;
    this.ExperienceCategory = ExperienceCategory;
    this.UserExperienceLike = UserExperienceLike;
    this.UserExperienceComment = UserExperienceComment;
    this.User = User;
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
      searchQuery.text = { $regex: req.query.text, $options: "i" };
    if (req.query.experienceCategory) {
      searchQuery.experienceCategory._id = {
        $regex: req.query.experienceCategory,
      };
    }
    if (req.query.isApprove !== undefined)
      searchQuery.isApprove = stringToBoolean(req.query.isApprove);
    if (req.query.featured !== undefined)
      searchQuery.featured = stringToBoolean(req.query.featured);
    if (req.query.user) searchQuery.user = req.query.user;

    const {
      fixedSearchQuery,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc,
    } = await paginationProps(searchQuery, req, this.UserExperience);

    const data: IUserExperienceRead[] = await this.UserExperience.find(
      fixedSearchQuery,
    )
      .populate<{ experienceCategory: IExperienceCategory; user: IUserRead }>([
        "experienceCategory",
        "user",
        { path: "user", populate: { path: "image", model: "Image" } },
      ])
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

  getMy = async (
    req: Req,
    userId?: string,
  ): Promise<ApiDataListResponse<IUserExperienceRead>> => {
    req.query.user = userId;
    return this.getAll(req, userId);
  };

  getApproved = async (
    req: Req,
    userId?: string,
  ): Promise<ApiDataListResponse<IUserExperienceRead>> => {
    req.query.isApprove = "true";
    return this.getAll(req, userId);
  };

  get = async (
    id: string,
    userId?: string,
    addView = false,
  ): Promise<IUserExperienceRead> => {
    const userExperience = await this.UserExperience.findById(id)
      .populate<{
        experienceCategory: IExperienceCategory;
      }>(["experienceCategory"])
      .populate<{ user: IUserRead }>({
        path: "user",
        select: "-notification",
        populate: { path: "image", model: "Image" },
      })
      .lean();

    if (!userExperience) throw new NotFoundError();
    if (addView && userId != userExperience.user._id)
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

    return await this.get(userExperience._id, user);
  };

  remove = async (
    id: string,
    isAdmin: boolean,
    userId?: string,
  ): Promise<IUserExperienceRead> => {
    const item = await this.get(id, userId);

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

    const item = await this.get(userExperienceId, userId);

    if (item.liked) return await this.dislike(userExperienceId, userId);

    await this.UserExperienceLike.like(userExperienceId, userId);

    const updatedItem = await this.UserExperience.findByIdAndUpdate(
      userExperienceId,
      {
        $inc: { likeCount: 1 },
      },
    ).populate<{ user: IUserRead }>("user");

    updatedItem &&
      this.User.createNotificationAndAddToUser({
        title: "پسند",
        text: "تجربه شما با عنوان " + item.title + " توسط user پسند شد.",
        contentId: userExperienceId,
        creatorUserId: userId,
        notifUserId: item.user._id,
        frontEndRouteTitle: "userExperienceDetail",
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

    return await this.get(userExperienceId, userId);
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
  getAdminComments = async (
    req: Req,
  ): Promise<ApiDataListResponse<IUserExperienceComment>> => {
    const comments = await this.UserExperienceComment.getAdminComments(req);

    return comments;
  };

  getMyComments = async (
    req: Req,
    userId: string,
  ): Promise<ApiDataListResponse<IUserExperienceComment>> => {
    const comments = await this.UserExperienceComment.getMyComments(
      req,
      userId,
    );

    return comments;
  };
  comment = async (
    userExperienceId: string,
    userId: string | undefined,
    text: string,
  ) => {
    if (!userId) throw new UnauthorizedError();

    const item = await this.UserExperience.findById(userExperienceId).populate<{
      user: IUserRead;
    }>("user");
    if (!item) throw new NotFoundError();

    await this.UserExperienceComment.create(userExperienceId, userId, text);

    await this.UserExperience.findByIdAndUpdate(userExperienceId, {
      $inc: { commentCount: 1 },
    });

    this.User.createNotificationAndAddToUser({
      title: "نظر",
      text: "user برای تجربه شما با عنوان " + item.title + " یک نظر ثبت کرد.",
      contentId: userExperienceId,
      frontEndRouteTitle: "userExperienceDetail",
      creatorUserId: userId,
      notifUserId: item.user._id,
      type: "comment",
    });

    return await this.get(item._id);
  };

  reply = async (
    commentId: string,
    userId: string | undefined,
    text: string,
  ) => {
    if (!userId) throw new UnauthorizedError();

    const comment = await this.UserExperienceComment.reply(
      commentId,
      userId,
      text,
    );

    const item = await this.get(comment.content as string);
    const user = await this.User.get(comment.user as string);

    item &&
      this.User.createNotificationAndAddToUser({
        title: "پاسخ",
        text: "user به نظر شما پاسخ داد.",
        contentId: item._id,
        creatorUserId: userId,
        notifUserId: user._id,
        frontEndRouteTitle: "userExperienceDetail",
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

    this.User.createNotificationAndAddToUser({
      title: "تایید توسط ادمین",
      text: "تجربه شما با عنوان " + item.title + " توسط ادمین تایید شد.",
      contentId: id,
      notifUserId: item.user as string,
      frontEndRouteTitle: "userExperienceDetail",
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

    this.User.createNotificationAndAddToUser({
      title: "رد توسط ادمین",
      text: "تجربه شما با عنوان " + item.title + " توسط ادمین رد شد.",
      contentId: id,
      notifUserId: item.user as string,
      frontEndRouteTitle: "userExperienceDetail",
      type: "error",
    });

    return await this.get(id);
  };
}

export default UserExperienceData;
