import { Model } from "mongoose";
import { ApiDataListResponse, IPost, IPostCreate } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import PostCategoryData from "@/components/postCategory/postCategoryData";
import VideoData from "@/components/video/videoData";
import ImageData from "@/components/image/imageData";
import { stringToBoolean } from "@/utils/util";

class PostData implements IData<IPost> {
  Post: Model<IPost, {}, {}, {}, any>;
  PostCategory: PostCategoryData;
  Video: VideoData;
  Image: ImageData;

  constructor(
    Post: Model<IPost, {}, {}, {}, any>,
    PostCategory: PostCategoryData,
    Video: VideoData,
    Image: ImageData,
  ) {
    this.Post = Post;
    this.PostCategory = PostCategory;
    this.Video = Video;
    this.Image = Image;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IPost>> => {
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

    return getAllData<IPost>(searchQuery, req, this.Post, ["images", "videos"]);
  };

  get = async (id: string): Promise<IPost> => {
    const post = await this.Post.findById(id)
      .populate("images")
      .populate("videos");
    if (!post) throw new NotFoundError();

    return post;
  };

  create = async ({
    title,
    postCategory,
    images,
    videos,
    text,
    featured,
  }: IPostCreate): Promise<IPost> => {
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
    console.log("videos", existingVideoIds);
    console.log("images", existingImageIds);

    const post = new this.Post({
      title,
      postCategory: existingPostCategory,
      images: existingImageIds,
      videos: existingVideoIds,
      text,
      featured: !!featured,
    });
    return await await (await post.save()).populate(["videos", "images"]);
  };

  update = async ({
    id,
    title,
    postCategory,
    images,
    videos,
    text,
    featured,
  }: IPostCreate & { id: string }): Promise<IPost> => {
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

    const post = await this.Post.findByIdAndUpdate(id, {
      $set: {
        title,
        postCategory: existingPostCategory,
        images: existingImageIds,
        video: existingVideoIds,
        text,
        featured: !!featured,
      },
    }).populate(["videos", "images"]);
    if (!post) throw new NotFoundError();

    return post;
  };

  remove = async (id: string): Promise<IPost> => {
    const post = await this.get(id);
    await this.Post.findByIdAndDelete(id);

    return post;
  };
}

export default PostData;
