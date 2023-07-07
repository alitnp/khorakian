import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IImage,
  IPost,
  IPostCategory,
  IPostComment,
  IPostCreate,
  IPostLike,
  IPostRead,
  IVideoRead,
} from "@my/types";
import { defaultSearchQueries, paginationProps } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import VideoData from "@/components/video/videoData";
import ImageData from "@/components/image/imageData";
import { stringToBoolean } from "@/utils/util";
import LikeData from "@/components/Like/likeData";
import UnauthorizedError from "@/helpers/error/UnauthorizedError";
import CommentData from "@/components/comment/commentData";
import PostCategoryData from "@/components/Post/postCategory/postCategoryData";
import UserData from "@/components/user/userData";

class PostData {
  Post: Model<IPost, {}, {}, {}, any>;
  PostCategory: PostCategoryData;
  Video: VideoData;
  Image: ImageData;
  PostLike: LikeData<IPostLike>;
  PostComment: CommentData<IPostComment>;
  User: UserData;

  constructor(
    Post: Model<IPost, {}, {}, {}, any>,
    PostCategory: PostCategoryData,
    Video: VideoData,
    Image: ImageData,
    PostLike: LikeData<IPostLike>,
    PostComment: CommentData<IPostComment>,
    User: UserData
  ) {
    this.Post = Post;
    this.PostCategory = PostCategory;
    this.Video = Video;
    this.Image = Image;
    this.PostLike = PostLike;
    this.PostComment = PostComment;
    this.User = User;
  }

  getAll = async (
    req: Req,
    userId?: string
  ): Promise<ApiDataListResponse<IPostRead>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query.text)
      searchQuery.text = { $regex: req.query.text, $options: "i" };
    if (req.query.postCategory)
      searchQuery.postCategory = req.query.postCategory;
    if (req.query._id) searchQuery._id = req.query._id;
    if (req.query.featured !== undefined)
      searchQuery.featured = stringToBoolean(req.query.featured);
    if (req.query.eventDateFrom)
      searchQuery.eventDate = { $gt: req.query.eventDateFrom };
    if (req.query.eventDateTo)
      searchQuery.eventDate = { $lt: req.query.eventDateTo };

    const {
      fixedSearchQuery,
      pageNumber,
      pageSize,
      totalItems,
      totalPages,
      sortBy,
      desc,
    } = await paginationProps(searchQuery, req, this.Post);

    const data: IPostRead[] = await this.Post.find(fixedSearchQuery)
      .populate<{ videos: IVideoRead[] }>({
        path: "videos",
        populate: { path: "thumbnail" },
      })
      .populate<{ images: IImage[] }>("images")
      .populate<{ postCategory: IPostCategory }>("postCategory")
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort(sortBy ? { [sortBy]: desc } : { creationDate: -1 })
      .lean();

    //add liked to each post
    for (let i = 0; i < data.length; i++) {
      const post = data[i];
      if (!userId) data[i].liked = false;
      else data[i].liked = await this.PostLike.isUserLiked(post._id, userId);
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

  get = async (
    id: string,
    userId?: string,
    addView = false
  ): Promise<IPostRead> => {
    const post = (await this.Post.findById(id)
      .populate<{ images: IImage[] }>("images")
      .populate<{ videos: IVideoRead[] }>({
        path: "videos",
        populate: { path: "thumbnail" },
      })
      .populate<{ postCategory: IPostCategory }>("postCategory")
      .lean()) as IPostRead;

    if (!post) throw new NotFoundError();
    if (addView)
      await this.Post.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

    const postRead = { ...post, liked: false };
    if (userId) postRead.liked = await this.PostLike.isUserLiked(id, userId);

    return postRead;
  };

  create = async ({
    title,
    postCategory,
    images,
    videos,
    text,
    featured,
    eventDate,
  }: IPostCreate): Promise<IPostRead> => {
    await this.PostCategory.get(postCategory);

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

    const post = new this.Post({
      title,
      postCategory,
      images: existingImageIds,
      videos: existingVideoIds,
      text,
      featured: !!featured,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      eventDate: eventDate || Date.now(),
    });
    await post.save();
    return await this.get(post._id);
  };

  update = async ({
    _id,
    title,
    postCategory,
    images,
    videos,
    text,
    featured,
    eventDate,
  }: IPostCreate & { _id: string }): Promise<IPostRead> => {
    await this.PostCategory.get(postCategory);

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

    const post = await this.Post.findByIdAndUpdate(_id, {
      $set: {
        title,
        postCategory,
        images: existingImageIds,
        videos: existingVideoIds,
        text,
        featured: !!featured,
        eventDate: eventDate || Date.now(),
      },
    });
    if (!post) throw new NotFoundError();

    return await this.get(post._id);
  };

  remove = async (id: string): Promise<IPostRead> => {
    const post = await this.get(id);
    await this.Post.findByIdAndDelete(id);

    return post;
  };

  like = async (postId: string, userId?: string): Promise<IPostRead> => {
    if (!userId) throw new UnauthorizedError();

    const post = await this.get(postId, userId);
    if (!post) throw new NotFoundError();

    if (post.liked) return this.dislike(postId, userId);

    await this.PostLike.like(postId, userId);
    await this.Post.findByIdAndUpdate(postId, {
      $inc: { likeCount: 1 },
    });

    return await this.get(postId, userId);
  };

  dislike = async (postId: string, userId?: string): Promise<IPostRead> => {
    if (!userId) throw new UnauthorizedError();

    await this.PostLike.disLike(postId, userId);

    const post = await this.get(postId, userId);

    const updatedPost = await this.Post.findByIdAndUpdate(postId, {
      $inc: { likeCount: post.likeCount > 0 ? -1 : 0 },
    });
    if (!updatedPost) throw new NotFoundError();

    return await this.get(postId);
  };

  getAllLikes = async (req: Req): Promise<ApiDataListResponse<IPostLike>> => {
    const comments = await this.PostLike.getAll(req);

    return comments;
  };

  getAllComments = async (
    req: Req
  ): Promise<ApiDataListResponse<IPostComment>> => {
    const comments = await this.PostComment.getAll(req);

    return comments;
  };

  getAdminComments = async (
    req: Req
  ): Promise<ApiDataListResponse<IPostComment>> => {
    const comments = await this.PostComment.getAdminComments(req);

    return comments;
  };

  getMyComments = async (
    req: Req,
    userId: string
  ): Promise<ApiDataListResponse<IPostComment>> => {
    const comments = await this.PostComment.getMyComments(req, userId);

    return comments;
  };

  comment = async (
    postId: string,
    userId: string | undefined,
    text: string
  ) => {
    if (!userId) throw new UnauthorizedError();

    const post = await this.Post.findById(postId);
    if (!post) throw new NotFoundError();

    await this.PostComment.create(postId, userId, text);

    await this.Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

    return await this.get(post._id);
  };

  // getAdminsComments = async (
  //   req: Req,
  //   isAdmin?: boolean,
  //   userId?: string,
  // ): Promise<ApiDataListResponse<IPostComment>> => {
  //     const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
  //   if (!userId) throw new NotFoundError();
  //    if (isAdmin) {
  //      searchQuery.user._id = userId;
  //    }

  //   return await getAllData<IPostComment>(searchQuery,
  //     req,
  //   this.PostComment);
  // };

  reply = async (
    commentId: string,
    userId: string | undefined,
    text: string
  ) => {
    if (!userId) throw new UnauthorizedError();

    const comment = await this.PostComment.reply(commentId, userId, text);

    const item = await this.get(comment.content as string);
    const user = await this.User.get(comment.user as string);

    item &&
      this.User.createNotificationAndAddToUser({
        title: "پاسخ",
        text: "user به نظر شما پاسخ داد.",
        contentId: item._id,
        creatorUserId: userId,
        notifUserId: user._id,
        frontEndRouteTitle: "postDetail",
        type: "comment",
      });

    return await this.get(comment.content as string);
  };
}

export default PostData;
