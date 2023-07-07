import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IIdea,
  IIdeaCategory,
  IIdeaComment,
  IIdeaLike,
  IIdeaRead,
  IImage,
  IUserRead,
  IVideoRead,
} from "@my/types";
import LikeData from "@/components/Like/likeData";
import CommentData from "@/components/comment/commentData";
import { stringToBoolean } from "@/utils/util";
import { defaultSearchQueries, paginationProps } from "@/data/globalData";
import { NotFoundError, UnauthenticatedError } from "@/helpers/error";
import UnauthorizedError from "@/helpers/error/UnauthorizedError";
import IdeaCategoryData from "@/components/Idea/ideaCategory/ideaCategoryData";
import BadRequestError from "@/helpers/error/BadRequestError";
import UserData from "@/components/user/userData";
import VideoData from "@/components/video/videoData";
import ImageData from "@/components/image/imageData";

class IdeaData {
  Idea: Model<IIdea>;
  IdeaCategory: IdeaCategoryData;
  IdeaLike: LikeData<IIdeaLike>;
  IdeaComment: CommentData<IIdeaComment>;
  User: UserData;
  Video: VideoData;
  Image: ImageData;

  constructor(
    Idea: Model<IIdea>,
    IdeaCategory: IdeaCategoryData,
    IdeaLike: LikeData<IIdeaLike>,
    IdeaComment: CommentData<IIdeaComment>,
    User: UserData,
    Video: VideoData,
    Image: ImageData
  ) {
    this.Idea = Idea;
    this.IdeaCategory = IdeaCategory;
    this.IdeaLike = IdeaLike;
    this.IdeaComment = IdeaComment;
    this.User = User;
    this.Video = Video;
    this.Image = Image;
  }

  getAll = async (
    req: Req,
    userId?: string
  ): Promise<ApiDataListResponse<IIdeaRead>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query._id) {
      searchQuery._id = req.query._id;
    }
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query.text)
      searchQuery.text = { $regex: req.query.text, $options: "i" };
    if (req.query.isAdminSubmitted !== undefined)
      searchQuery.isAdminSubmitted = stringToBoolean(
        req.query.isAdminSubmitted
      );
    if (req.query.ideaCategory) {
      searchQuery.ideaCategory = req.query.ideaCategory;
    }
    if (req.query.isApprove !== undefined)
      searchQuery.isApprove = stringToBoolean(req.query.isApprove);
    if (req.query.featured !== undefined)
      searchQuery.featured = stringToBoolean(req.query.featured);
    if (req.query.user) searchQuery.user = req.query.user;

    // if (!getUserIsAdminFromReq(req)) {
    //   searchQuery.isApprove = true;
    // }

    const {
      fixedSearchQuery,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc,
    } = await paginationProps(searchQuery, req, this.Idea);

    const data: IIdeaRead[] = await this.Idea.find(fixedSearchQuery)
      .populate<{ ideaCategory: IIdeaCategory; user: IUserRead }>([
        "ideaCategory",
        "user",
        { path: "user", populate: { path: "image", model: "Image" } },
      ])
      .populate<{ videos: IVideoRead[] }>({
        path: "videos",
        populate: { path: "thumbnail" },
      })
      .populate<{ images: IImage[] }>("images")
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort(sortBy ? { [sortBy]: desc } : { creationDate: -1 })
      .lean();

    //add liked to each post
    for (let i = 0; i < data.length; i++) {
      const idea = data[i];
      if (!userId) data[i].liked = false;
      else data[i].liked = await this.IdeaLike.isUserLiked(idea._id, userId);
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
    userId?: string
  ): Promise<ApiDataListResponse<IIdeaRead>> => {
    req.query.user = userId;
    return this.getAll(req, userId);
  };

  getApproved = async (
    req: Req,
    userId?: string
  ): Promise<ApiDataListResponse<IIdeaRead>> => {
    req.query.isApprove = "true";
    return this.getAll(req, userId);
  };

  get = async (
    id: string,
    userId?: string,
    addView = false
  ): Promise<IIdeaRead> => {
    const idea = await this.Idea.findById(id)
      .populate<{
        ideaCategory: IIdeaCategory;
      }>(["ideaCategory"])
      .populate<{ user: IUserRead }>({
        path: "user",
        select: "-notification",
        populate: { path: "image", model: "Image" },
      })
      .populate<{ images: IImage[] }>("images")
      .populate<{ videos: IVideoRead[] }>({
        path: "videos",
        populate: { path: "thumbnail" },
      })
      .lean();

    if (!idea) throw new NotFoundError();
    if (addView && userId != idea.user._id)
      await this.Idea.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

    const ideaRead = { ...idea, liked: false } as IIdeaRead;
    if (userId) ideaRead.liked = await this.IdeaLike.isUserLiked(id, userId);

    return ideaRead;
  };

  create = async ({
    title,
    ideaCategory,
    text,
    featured,
    isAdminSubmitted,
    user,
    images = [],
    videos = [],
  }: IIdea): Promise<IIdeaRead> => {
    if (!user) throw new UnauthenticatedError();
    const existUser = await this.User.get(user);
    if (!existUser) throw new UnauthenticatedError();

    if (!ideaCategory) throw new BadRequestError("دسته بندی ارسال نشده");
    const existingIdeaCategory = await this.IdeaCategory.get(ideaCategory);
    if (!existingIdeaCategory)
      throw new NotFoundError("دسته بندی ای با این شناسه یافت نشد");

    const existingImageIds = [];
    for (let i = 0; i < images.length; i++) {
      const imageId = images[i];
      const existingImage = await this.Image.get(imageId);
      if (!!existingImage) existingImageIds.push(existingImage._id);
    }

    const existingVideoIds = [];
    for (let i = 0; i < videos.length; i++) {
      const videoId = videos[i];
      const existingVideo = await this.Video.get(videoId);
      if (!!existingVideo) existingVideoIds.push(existingVideo._id);
    }

    const idea = new this.Idea({
      title,
      ideaCategory,
      text,
      featured: !!featured,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      isApprove: isAdminSubmitted,
      isAdminSubmitted,
      user,
      images: existingImageIds,
      videos: existingVideoIds,
    });
    await idea.save();
    return await this.get(idea._id);
  };

  update = async ({
    _id,
    title,
    ideaCategory,
    text,
    featured,
    user,
    isAdmin,
    images,
    videos,
  }: IIdea & { _id: string; isAdmin: boolean }): Promise<IIdeaRead> => {
    if (!user) throw new UnauthenticatedError();
    const existUser = await this.User.get(user);
    if (!existUser) throw new UnauthenticatedError();
    const existIdea = await this.get(_id);
    if (!existIdea) throw new NotFoundError();
    if (existIdea.user._id != user)
      throw new BadRequestError("شما دسترسی ویرایش این مورد را ندارید");

    if (existIdea.isApprove && !isAdmin)
      throw new BadRequestError("ایده های منتشر شده امکان ویرایش ندارند");

    if (!ideaCategory) throw new BadRequestError("دسته بندی ارسال نشده");
    const existingIdeaCategory = await this.IdeaCategory.get(ideaCategory);
    if (!existingIdeaCategory)
      throw new NotFoundError("دسته بندی ای با این شناسه یافت نشد");

    const existingImageIds = [];
    for (let i = 0; i < images.length; i++) {
      const imageId = images[i];
      const existingImage = await this.Image.get(imageId);
      if (!!existingImage) existingImageIds.push(existingImage._id);
    }

    const existingVideoIds = [];
    for (let i = 0; i < videos.length; i++) {
      const videoId = videos[i];
      const existingVideo = await this.Video.get(videoId);
      if (!!existingVideo) existingVideoIds.push(existingVideo._id);
    }

    await this.Idea.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          ideaCategory,
          text,
          featured: !!featured,
          images: existingImageIds,
          videos: existingVideoIds,
        },
      },
      { new: true }
    );

    return await this.get(existIdea._id);
  };

  remove = async (
    id: string,
    isAdmin: boolean,
    userId?: string
  ): Promise<IIdeaRead> => {
    const item = await this.get(id);

    if (!isAdmin && !userId) throw new UnauthenticatedError();
    if (!isAdmin && userId != item.user._id) throw new UnauthorizedError();

    await this.Idea.findByIdAndDelete(id);
    return item;
  };

  like = async (ideaId: string, userId?: string): Promise<IIdeaRead> => {
    if (!userId) throw new UnauthorizedError();

    const item = await this.get(ideaId, userId);

    if (item.liked) return await this.dislike(ideaId, userId);

    await this.get(ideaId, userId);

    if (item.liked) return await this.dislike(ideaId, userId);

    await this.IdeaLike.like(ideaId, userId);
    const updatedItem = await this.Idea.findByIdAndUpdate(ideaId, {
      $inc: { likeCount: 1 },
    }).populate<{ user: IUserRead }>("user");

    updatedItem &&
      this.User.createNotificationAndAddToUser({
        title: "پسند",
        text: "ایده شما با عنوان " + item.title + " توسط user پسند شد.",
        contentId: ideaId,
        creatorUserId: userId,
        notifUserId: item.user._id,
        frontEndRouteTitle: "ideaDetail",
        type: "like",
      });

    return await this.get(ideaId, userId);
  };

  dislike = async (ideaId: string, userId?: string): Promise<IIdeaRead> => {
    if (!userId) throw new UnauthorizedError();
    await this.IdeaLike.disLike(ideaId, userId);
    const item = await this.get(ideaId, userId);
    const updatedIdea = await this.Idea.findByIdAndUpdate(ideaId, {
      $inc: { likeCount: item.likeCount > 0 ? -1 : 0 },
    });
    if (!updatedIdea) throw new NotFoundError();

    return await this.get(ideaId);
  };

  getAllLikes = async (req: Req): Promise<ApiDataListResponse<IIdeaLike>> => {
    const comments = await this.IdeaLike.getAll(req);
    return comments;
  };

  getAllComments = async (
    req: Req
  ): Promise<ApiDataListResponse<IIdeaComment>> => {
    const comments = await this.IdeaComment.getAll(req);

    return comments;
  };

  getAdminComments = async (
    req: Req
  ): Promise<ApiDataListResponse<IIdeaComment>> => {
    const comments = await this.IdeaComment.getAdminComments(req);

    return comments;
  };

  getMyComments = async (
    req: Req,
    userId: string
  ): Promise<ApiDataListResponse<IIdeaComment>> => {
    const comments = await this.IdeaComment.getMyComments(req, userId);

    return comments;
  };

  comment = async (
    ideaId: string,
    userId: string | undefined,
    text: string
  ) => {
    if (!userId) throw new UnauthorizedError();
    const item = await this.Idea.findById(ideaId);
    if (!item) throw new NotFoundError();
    await this.IdeaComment.create(ideaId, userId, text);
    await this.Idea.findByIdAndUpdate(ideaId, { $inc: { commentCount: 1 } });

    this.User.createNotificationAndAddToUser({
      title: "نظر",
      text: "user برای ایده شما با عنوان " + item.title + " یک نظر ثبت کرد.",
      contentId: ideaId,
      frontEndRouteTitle: "ideaDetail",
      creatorUserId: userId,
      notifUserId: item.user as string,
      type: "comment",
    });

    return await this.get(item._id);
  };

  reply = async (
    commentId: string,
    userId: string | undefined,
    text: string
  ) => {
    if (!userId) throw new UnauthorizedError();

    const comment = await this.IdeaComment.reply(commentId, userId, text);

    const item = await this.get(comment.content as string);
    const user = await this.User.get(comment.user as string);

    item &&
      this.User.createNotificationAndAddToUser({
        title: "پاسخ",
        text: "user به نظر شما پاسخ داد.",
        contentId: item._id,
        creatorUserId: userId,
        notifUserId: user._id,
        frontEndRouteTitle: "ideaDetail",
        type: "comment",
      });

    return await this.get(comment.content as string);
  };

  approve = async (id: string): Promise<IIdeaRead> => {
    const item = await this.Idea.findByIdAndUpdate(
      id,
      {
        $set: { isApprove: true },
      },
      { new: true }
    );
    if (!item) throw new NotFoundError();

    this.User.createNotificationAndAddToUser({
      title: "تایید توسط ادمین",
      text: "ایده شما با عنوان " + item.title + " توسط ادمین تایید شد.",
      contentId: id,
      notifUserId: item.user as string,
      frontEndRouteTitle: "ideaDetail",
      type: "success",
    });

    return await this.get(id);
  };

  disApprove = async (id: string): Promise<IIdeaRead> => {
    const item = await this.Idea.findByIdAndUpdate(
      id,
      {
        $set: { isApprove: false },
      },
      { new: true }
    );
    if (!item) throw new NotFoundError();

    this.User.createNotificationAndAddToUser({
      title: "رد توسط ادمین",
      text: "ایده شما با عنوان " + item.title + " توسط ادمین رد شد.",
      contentId: id,
      notifUserId: item.user as string,
      frontEndRouteTitle: "ideaDetail",
      type: "error",
    });

    return await this.get(id);
  };
}

export default IdeaData;
