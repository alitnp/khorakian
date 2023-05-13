import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IIdea,
  IIdeaCategory,
  IIdeaComment,
  IIdeaLike,
  IIdeaRead,
} from "@my/types";
import LikeData from "@/components/Like/likeData";
import CommentData from "@/components/comment/commentData";
import { stringToBoolean } from "@/utils/util";
import { defaultSearchQueries, paginationProps } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import UnauthenticatedError from "@/helpers/error/UnauthorizedError";
import IdeaCategoryData from "@/components/Idea/ideaCategory/ideaCategoryData";
import BadRequestError from "@/helpers/error/BadRequestError";

class IdeaData {
  Idea: Model<IIdea, {}, {}, {}, any>;
  IdeaCategory: IdeaCategoryData;
  IdeaLike: LikeData<IIdeaLike>;
  IdeaComment: CommentData<IIdeaComment>;

  constructor(
    Idea: Model<IIdea, {}, {}, {}, any>,
    IdeaCategory: IdeaCategoryData,
    IdeaLike: LikeData<IIdeaLike>,
    IdeaComment: CommentData<IIdeaComment>,
  ) {
    this.Idea = Idea;
    this.IdeaCategory = IdeaCategory;
    this.IdeaLike = IdeaLike;
    this.IdeaComment = IdeaComment;
  }

  getAll = async (
    req: Req,
    userId?: string,
  ): Promise<ApiDataListResponse<IIdeaRead>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query._id) {
      searchQuery._id = req.query._id;
    }
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query.text)
      searchQuery.text = { $regex: req.query.text, $option: "i" };
    if (req.query.isAdminSubmitted)
      searchQuery.isAdminSubmitted = stringToBoolean(
        req.query.isAdminSubmitted,
      );
    if (req.query.ideaCategory) {
      searchQuery.ideaCategory._id = { $regex: req.query.ideaCategory };
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
    } = await paginationProps(searchQuery, req, this.Idea);

    const data: IIdeaRead[] = await this.Idea.find(fixedSearchQuery)
      .populate<{ ideaCategory: IIdeaCategory }>("ideaCategory")
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

  get = async (id: string, userId?: string): Promise<IIdeaRead> => {
    const idea = await this.Idea.findById(id)
      .populate<{
        ideaCategory: IIdeaCategory;
      }>(["ideaCategory"])
      .lean();

    if (!idea) throw new NotFoundError();
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
  }: IIdea): Promise<IIdeaRead> => {
    if (!ideaCategory) throw new BadRequestError("دسته بندی ارسال نشده");
    const existingIdeaCategory = await this.IdeaCategory.get(ideaCategory);
    if (!existingIdeaCategory)
      throw new NotFoundError("دسته بندی ای با این شناسه یافت نشد");

    const idea = new this.Idea({
      title,
      ideaCategory,
      text,
      featured: !!featured,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      isAdminSubmitted,
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
  }: IIdea & { _id: string }): Promise<IIdeaRead> => {
    if (!ideaCategory) throw new BadRequestError("دسته بندی ارسال نشده");
    const existingIdeaCategory = await this.IdeaCategory.get(ideaCategory);
    if (!existingIdeaCategory)
      throw new NotFoundError("دسته بندی ای با این شناسه یافت نشد");
    const idea = await this.Idea.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          ideaCategory,
          text,
          featured: !!featured,
        },
      },
      { new: true },
    );
    if (!idea) throw new NotFoundError();

    return await this.get(idea._id);
  };

  remove = async (id: string): Promise<IIdeaRead> => {
    const item = await this.get(id);
    await this.Idea.findByIdAndDelete(id);
    return item;
  };

  like = async (ideaId: string, userId?: string): Promise<IIdeaRead> => {
    if (!userId) throw new UnauthenticatedError();
    await this.IdeaLike.like(ideaId, userId);
    const item = await this.Idea.findByIdAndUpdate(ideaId, {
      $inc: { likeCount: 1 },
    });
    if (!item) throw new NotFoundError();

    return await this.get(ideaId, userId);
  };

  dislike = async (ideaId: string, userId?: string): Promise<IIdeaRead> => {
    if (!userId) throw new UnauthenticatedError();
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
    req: Req,
  ): Promise<ApiDataListResponse<IIdeaComment>> => {
    const comments = await this.IdeaComment.getAll(req);

    return comments;
  };

  comment = async (
    ideaId: string,
    userId: string | undefined,
    text: string,
  ) => {
    if (!userId) throw new UnauthenticatedError();
    const item = await this.Idea.findById(ideaId);
    if (!item) throw new NotFoundError();
    await this.IdeaComment.create(ideaId, userId, text);
    await this.Idea.findByIdAndUpdate(ideaId, { $inc: { commentCount: 1 } });
    return await this.get(item._id);
  };

  reply = async (
    commentId: string,
    userId: string | undefined,
    text: string,
  ) => {
    if (!userId) throw new UnauthenticatedError();

    const comment = await this.IdeaComment.reply(commentId, userId, text);
    return await this.get(comment.content as string);
  };

  approve = async (id: string): Promise<IIdeaRead> => {
    const item = await this.Idea.findByIdAndUpdate(
      id,
      {
        $set: { isApprove: true },
      },
      { new: true },
    );
    if (!item) throw new NotFoundError();

    return await this.get(id);
  };

  disApprove = async (id: string): Promise<IIdeaRead> => {
    const item = await this.Idea.findByIdAndUpdate(
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

export default IdeaData;
