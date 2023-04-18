import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IUserExperience,
  IUserExperienceCategory,
  IUserExperienceComment,
  IUserExperienceLike,
  IUserExperienceRead,
} from "@my/types";
import LikeData from "@/components/Like/likeData";
import CommentData from "@/components/comment/commentData";
import { stringToBoolean } from "@/utils/util";
import { paginationProps } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import UnauthenticatedError from "@/helpers/error/UnauthorizedError";
import UserExperienceCategoryData from "@/components/userExperience/userExperienceCategory/userExperienceCategoryData";

class UserExperienceData {
  UserExperience: Model<IUserExperience, {}, {}, {}, any>;
  UserExperienceCategory: UserExperienceCategoryData;
  UserExperienceLike: LikeData<IUserExperienceLike>;
  UserExperienceComment: CommentData<IUserExperienceComment>;

  constructor(
    UserExperience: Model<IUserExperience, {}, {}, {}, any>,
    UserExperienceCategory: UserExperienceCategoryData,
    UserExperienceLike: LikeData<IUserExperienceLike>,
    UserExperienceComment: CommentData<IUserExperienceComment>,
  ) {
    this.UserExperience = UserExperience;
    this.UserExperienceCategory = UserExperienceCategory;
    this.UserExperienceLike = UserExperienceLike;
    this.UserExperienceComment = UserExperienceComment;
  }

  getAll = async (
    req: Req,
    userId?: string,
  ): Promise<ApiDataListResponse<IUserExperienceRead>> => {
    const searchQuery: any = {};
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
    if (req.query.isApprove)
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

    const data: IUserExperienceRead[] = await this.UserExperience.find(
      fixedSearchQuery,
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
        userExperienceCategory: IUserExperienceCategory;
      }>(["userExperienceCategory"])
      .lean();

    if (!userExperience) throw new NotFoundError();
    await this.UserExperience.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

    const userExperienceRead = { ...userExperience, liked: false };
    if (userId)
      userExperienceRead.liked = await this.UserExperienceLike.isUserLiked(
        id,
        userId,
      );

    return userExperienceRead;
  };

  create = async ({
    title,
    userExperienceCategory,
    text,
    featured,
  }: // isAdminSubmitted,
  IUserExperience): Promise<IUserExperienceRead> => {
    if (!userExperienceCategory) throw new NotFoundError();
    const existingUserExperienceCategory =
      await this.UserExperienceCategory.get(userExperienceCategory);

    const userExperience = new this.UserExperience({
      title,
      userExperienceCategory: existingUserExperienceCategory,
      text,
      featured: !!featured,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      // isAdminSubmitted,
    });
    await userExperience.save();
    return await this.get(userExperience._id);
  };

  update = async ({
    _id,
    title,
    userExperienceCategory,
    text,
    featured,
  }: IUserExperience & { _id: string }): Promise<IUserExperienceRead> => {
    if (!userExperienceCategory) throw new NotFoundError();
    const existingUserExperienceCategory =
      await this.UserExperienceCategory.get(userExperienceCategory);

    const userExperience = await this.UserExperience.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          postCategory: existingUserExperienceCategory,
          text,
          featured: !!featured,
        },
      },
      { new: true },
    );
    if (!userExperience) throw new NotFoundError();

    return await this.get(userExperience._id);
  };

  remove = async (id: string): Promise<IUserExperienceRead> => {
    const item = await this.get(id);
    await this.UserExperience.findByIdAndDelete(id);
    return item;
  };

  like = async (
    userExperienceId: string,
    userId?: string,
  ): Promise<IUserExperienceRead> => {
    if (!userId) throw new UnauthenticatedError();
    await this.UserExperienceLike.like(userExperienceId, userId);
    const item = await this.UserExperience.findByIdAndUpdate(userExperienceId, {
      $inc: { likeCount: 1 },
    });
    if (!item) throw new NotFoundError();

    return await this.get(userExperienceId, userId);
  };

  dislike = async (
    userExperienceId: string,
    userId?: string,
  ): Promise<IUserExperienceRead> => {
    if (!userId) throw new UnauthenticatedError();
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
    if (!userId) throw new UnauthenticatedError();
    const item = await this.UserExperience.findById(userExperienceId);
    if (!item) throw new NotFoundError();
    await this.UserExperienceComment.create(userExperienceId, userId, text);
    await this.UserExperience.findByIdAndUpdate(userExperienceId, {
      $inc: { commentCount: 1 },
    });
    return await this.get(item._id);
  };

  reply = async (
    commentId: string,
    userId: string | undefined,
    text: string,
  ) => {
    if (!userId) throw new UnauthenticatedError();

    const comment = await this.UserExperienceComment.reply(
      commentId,
      userId,
      text,
    );
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

    return await this.get(id);
  };
}

export default UserExperienceData;
