import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IImage,
  IExperience,
  IExperienceComment,
  IExperienceCreate,
  IExperienceLike,
  IExperienceRead,
  IVideoRead,
  IExperienceCategory,
} from "@my/types";
import { defaultSearchQueries, paginationProps } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import VideoData from "@/components/video/videoData";
import ImageData from "@/components/image/imageData";
import { stringToBoolean } from "@/utils/util";
import LikeData from "@/components/Like/likeData";
import UnauthenticatedError from "@/helpers/error/UnauthorizedError";
import CommentData from "@/components/comment/commentData";
import ExperienceCategoryData from "@/components/experience/experienceCategory/experienceCategoryData";

class ExperienceData {
  Experience: Model<IExperience, {}, {}, {}, any>;
  ExperienceCategory: ExperienceCategoryData;
  Video: VideoData;
  Image: ImageData;
  ExperienceLike: LikeData<IExperienceLike>;
  ExperienceComment: CommentData<IExperienceComment>;

  constructor(
    Experience: Model<IExperience, {}, {}, {}, any>,
    ExperienceCategory: ExperienceCategoryData,
    Video: VideoData,
    Image: ImageData,
    ExperienceLike: LikeData<IExperienceLike>,
    ExperienceComment: CommentData<IExperienceComment>,
  ) {
    this.Experience = Experience;
    this.ExperienceCategory = ExperienceCategory;
    this.Video = Video;
    this.Image = Image;
    this.ExperienceLike = ExperienceLike;
    this.ExperienceComment = ExperienceComment;
  }

  getAll = async (
    req: Req,
    userId?: string,
  ): Promise<ApiDataListResponse<IExperienceRead>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query.text)
      searchQuery.text = { $regex: req.query.text, $options: "i" };
    if (req.query.experienceCategory)
      searchQuery.experienceCategory._id = {
        $regex: req.query.experienceCategory,
      };
    if (req.query._id) searchQuery._id = req.query._id;
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
    } = await paginationProps(searchQuery, req, this.Experience);

    const data: IExperienceRead[] = await this.Experience.find(fixedSearchQuery)
      .populate<{ experienceCategory: IExperienceCategory }>(
        "experienceCategory",
      )
      .populate<{ images: IImage[]; videos: IVideoRead[] }>([
        "videos",
        "images",
      ])
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort(sortBy ? { [sortBy]: desc } : { creationDate: -1 })
      .lean();

    //add liked to each experience
    for (let i = 0; i < data.length; i++) {
      const experience = data[i];
      if (!userId) data[i].liked = false;
      else
        data[i].liked = await this.ExperienceLike.isUserLiked(
          experience._id,
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

  get = async (id: string, userId?: string): Promise<IExperienceRead> => {
    const experience = (await this.Experience.findById(id)
      .populate<{ images: IImage[] }>("images")
      .populate<{ videos: IVideoRead[] }>({
        path: "videos",
        populate: { path: "thumbnail" },
      })
      .lean()) as IExperienceRead;

    if (!experience) throw new NotFoundError();
    await this.Experience.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

    const experienceRead = { ...experience, liked: false };
    if (userId)
      experienceRead.liked = await this.ExperienceLike.isUserLiked(id, userId);

    return experienceRead;
  };

  create = async ({
    title,
    experienceCategory,
    images,
    videos,
    text,
    featured,
  }: IExperienceCreate): Promise<IExperienceRead> => {
    const existingExperienceCategory = await this.ExperienceCategory.get(
      experienceCategory,
    );
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

    const experience = new this.Experience({
      title,
      experienceCategory: existingExperienceCategory,
      images: existingImageIds,
      videos: existingVideoIds,
      text,
      featured: !!featured,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
    });
    await experience.save();
    return await this.get(experience._id);
  };

  update = async ({
    _id,
    title,
    experienceCategory,
    images,
    videos,
    text,
    featured,
  }: IExperienceCreate & { _id: string }): Promise<IExperienceRead> => {
    const existingExperienceCategory = await this.ExperienceCategory.get(
      experienceCategory,
    );

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

    const experience = await this.Experience.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          experienceCategory: existingExperienceCategory,
          images: existingImageIds,
          videos: existingVideoIds,
          text,
          featured: !!featured,
        },
      },
      { new: true },
    );
    if (!experience) throw new NotFoundError();

    return await this.get(experience._id);
  };

  remove = async (id: string): Promise<IExperienceRead> => {
    const experience = await this.get(id);
    await this.Experience.findByIdAndDelete(id);

    return experience;
  };

  like = async (
    experienceId: string,
    userId?: string,
  ): Promise<IExperienceRead> => {
    if (!userId) throw new UnauthenticatedError();

    await this.ExperienceLike.like(experienceId, userId);

    const experience = await this.Experience.findByIdAndUpdate(experienceId, {
      $inc: { likeCount: 1 },
    });
    if (!experience) throw new NotFoundError();

    return await this.get(experienceId, userId);
  };

  dislike = async (
    experienceId: string,
    userId?: string,
  ): Promise<IExperienceRead> => {
    if (!userId) throw new UnauthenticatedError();

    await this.ExperienceLike.disLike(experienceId, userId);

    const experience = await this.get(experienceId, userId);

    const updatedExperience = await this.Experience.findByIdAndUpdate(
      experienceId,
      {
        $inc: { likeCount: experience.likeCount > 0 ? -1 : 0 },
      },
    );
    if (!updatedExperience) throw new NotFoundError();

    return await this.get(experienceId);
  };

  getAllLikes = async (
    req: Req,
  ): Promise<ApiDataListResponse<IExperienceLike>> => {
    const comments = await this.ExperienceLike.getAll(req);

    return comments;
  };

  getAllComments = async (
    req: Req,
  ): Promise<ApiDataListResponse<IExperienceComment>> => {
    const comments = await this.ExperienceComment.getAll(req);

    return comments;
  };

  comment = async (
    experienceId: string,
    userId: string | undefined,
    text: string,
  ) => {
    if (!userId) throw new UnauthenticatedError();

    const experience = await this.Experience.findById(experienceId);
    if (!experience) throw new NotFoundError();

    await this.ExperienceComment.create(experienceId, userId, text);

    await this.Experience.findByIdAndUpdate(experienceId, {
      $inc: { commentCount: 1 },
    });

    return await this.get(experience._id);
  };

  reply = async (
    commentId: string,
    userId: string | undefined,
    text: string,
  ) => {
    if (!userId) throw new UnauthenticatedError();

    const comment = await this.ExperienceComment.reply(commentId, userId, text);

    return await this.get(comment.content as string);
  };
}

export default ExperienceData;
