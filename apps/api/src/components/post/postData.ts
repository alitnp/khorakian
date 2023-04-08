import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IImage,
  IPost,
  IPostComment,
  IPostCreate,
  IPostLike,
  IPostRead,
  IVideoRead,
} from "@my/types";
import { paginationProps } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import PostCategoryData from "@/components/postCategory/postCategoryData";
import VideoData from "@/components/video/videoData";
import ImageData from "@/components/image/imageData";
import { stringToBoolean } from "@/utils/util";
import LikeData from "@/components/Like/likeData";
import UnauthenticatedError from "@/helpers/error/UnauthorizedError";
import CommentData from "@/components/comment/commentData";

class PostData {
  Post: Model<IPost, {}, {}, {}, any>;
  PostCategory: PostCategoryData;
  Video: VideoData;
  Image: ImageData;
  PostLike: LikeData<IPostLike>;
  PostComment: CommentData<IPostComment>;

  constructor(
    Post: Model<IPost, {}, {}, {}, any>,
    PostCategory: PostCategoryData,
    Video: VideoData,
    Image: ImageData,
    PostLike: LikeData<IPostLike>,
    PostComment: CommentData<IPostComment>,
  ) {
    this.Post = Post;
    this.PostCategory = PostCategory;
    this.Video = Video;
    this.Image = Image;
    this.PostLike = PostLike;
    this.PostComment = PostComment;
  }

  getAll = async (
    req: Req,
    userId?: string,
  ): Promise<ApiDataListResponse<IPostRead>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query.text)
      searchQuery.text = { $regex: req.query.text, $options: "i" };
    if (req.query.postCategory)
      searchQuery.postCategory._id = { $regex: req.query.postCategory };
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
    } = await paginationProps(searchQuery, req, this.Post);

    const data: IPostRead[] = await this.Post.find(fixedSearchQuery)
      .populate<{ images: IImage[]; videos: IVideoRead[] }>([
        "videos",
        "images",
      ])
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

  get = async (id: string, userId?: string): Promise<IPostRead> => {
    const post = (await this.Post.findById(id)
      .populate<{ images: IImage[] }>("images")
      .populate<{ videos: IVideoRead[] }>({
        path: "videos",
        populate: { path: "thumbnail" },
      })
      .lean()) as IPostRead;

    if (!post) throw new NotFoundError();
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
  }: IPostCreate): Promise<IPostRead> => {
    const existingPostCategory = await this.PostCategory.get(postCategory);
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
      postCategory: existingPostCategory,
      images: existingImageIds,
      videos: existingVideoIds,
      text,
      featured: !!featured,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
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
  }: IPostCreate & { _id: string }): Promise<IPostRead> => {
    const existingPostCategory = await this.PostCategory.get(postCategory);

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

    const post = await this.Post.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          postCategory: existingPostCategory,
          images: existingImageIds,
          videos: existingVideoIds,
          text,
          featured: !!featured,
        },
      },
      { new: true },
    );
    if (!post) throw new NotFoundError();

    return await this.get(post._id);
  };

  remove = async (id: string): Promise<IPostRead> => {
    const post = await this.get(id);
    await this.Post.findByIdAndDelete(id);

    return post;
  };

  like = async (postId: string, userId?: string): Promise<IPostRead> => {
    if (!userId) throw new UnauthenticatedError();

    await this.PostLike.like(postId, userId);

    const post = await this.Post.findByIdAndUpdate(postId, {
      $inc: { likeCount: 1 },
    });
    if (!post) throw new NotFoundError();

    return await this.get(postId, userId);
  };

  dislike = async (postId: string, userId?: string): Promise<IPostRead> => {
    if (!userId) throw new UnauthenticatedError();

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
    req: Req,
  ): Promise<ApiDataListResponse<IPostComment>> => {
    const comments = await this.PostComment.getAll(req);

    return comments;
  };

  comment = async (
    postId: string,
    userId: string | undefined,
    text: string,
  ) => {
    if (!userId) throw new UnauthenticatedError();

    const post = await this.Post.findById(postId);
    if (!post) throw new NotFoundError();

    await this.PostComment.create(postId, userId, text);

    await this.Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

    return await this.get(post._id);
  };

  reply = async (
    commentId: string,
    userId: string | undefined,
    text: string,
  ) => {
    if (!userId) throw new UnauthenticatedError();

    const comment = await this.PostComment.reply(commentId, userId, text);

    return await this.get(comment.content as string);
  };
}

export default PostData;
