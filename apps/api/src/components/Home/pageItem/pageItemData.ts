import { Model } from "mongoose";
import {
  ApiDataListResponse,
  IPageItem,
  IPageItemRead,
  IPageItemSorting,
  IPageItemStyle,
  IPageItemType,
  IPageItemConents,
  IPostCategory,
  IPostLike,
  IExperienceLike,
  IUserExperienceLike,
  IIdeaLike,
} from "@my/types";
import { getSortBy } from "@/utils/pagination";
import { defaultSearchQueries, getAllData } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import PageItemTypeData from "@/components/Home/pageItemType/pageItemTypeData";
import PageItemSortingData from "@/components/Home/pageItemSorting/pageItemSortingData";
import PageItemStyleData from "@/components/Home/pageItemStyle/pageItemStyleData";
import BadRequestError from "@/helpers/error/BadRequestError";
import { Post } from "@/components/Post/post/postModel";
import { Experience } from "@/components/experience/experience/experienceModel";
import { UserExperience } from "@/components/userExperience/userExperience/userExperienceModel";
import { Idea } from "@/components/Idea/idea/ideaModel";
import { Slider } from "@/components/Home/silder/sliderModel";
import LikeData from "@/components/Like/likeData";

class PageItemData {
  PageItem: Model<IPageItem>;
  Type: PageItemTypeData;
  Sorting: PageItemSortingData;
  Style: PageItemStyleData;
  PostLike: LikeData<IPostLike>;
  ExperienceLike: LikeData<IExperienceLike>;
  UserExperienceLike: LikeData<IUserExperienceLike>;
  IdeaLike: LikeData<IIdeaLike>;

  constructor(
    PageItem: Model<IPageItem>,
    PageItemType: PageItemTypeData,
    PageItemSorting: PageItemSortingData,
    PageItemStyle: PageItemStyleData,
    PostLike: LikeData<IPostLike>,
    ExperienceLike: LikeData<IExperienceLike>,
    UserExperienceLike: LikeData<IUserExperienceLike>,
    IdeaLike: LikeData<IIdeaLike>,
  ) {
    this.PageItem = PageItem;
    this.Type = PageItemType;
    this.Sorting = PageItemSorting;
    this.Style = PageItemStyle;
    this.PostLike = PostLike;
    this.ExperienceLike = ExperienceLike;
    this.UserExperienceLike = UserExperienceLike;
    this.IdeaLike = IdeaLike;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IPageItem>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query.subTitle)
      searchQuery.subTitle = { $regex: req.query.subTitle, $options: "i" };

    if (req.query._id) searchQuery._id = req.query._id;

    //if theres no custom sortBy then sort by index
    if (!getSortBy(req)) req.query.sortBy = "index";

    return await getAllData<IPageItem>(searchQuery, req, this.PageItem, [
      "type",
      "sorting",
      "style",
    ]);
  };

  getWithContents = async (userId?: string): Promise<IPageItemConents[]> => {
    console.log(userId);
    const filters: any = {};
    const pageItems = await this.PageItem.find(filters)
      .sort("index")
      .populate<{
        sorting: IPageItemSorting;
        type: IPageItemType;
        style: IPageItemStyle;
      }>(["sorting", "type", "style"])
      .lean();

    const result: IPageItemConents[] = [];
    for (let index = 0; index < pageItems.length; index++) {
      const pi = pageItems[index];
      const sort: any = {};
      let content: any = undefined;
      let totalItems: number = 0;
      if (pi.sorting.title === "new") sort.creationData = -1;
      if (pi.sorting.title === "like") sort.likeCount = -1;
      if (pi.sorting.title === "view") sort.viewCount = -1;
      if (pi.sorting.title === "comment") sort.commentCount = -1;
      if (pi.sorting.title === "featured") sort.featured = -1;
      if (pi.type.title === "post") {
        content = await Post.find(filters)
          .sort(sort)
          .limit(10)
          .populate("images")
          .populate({ path: "videos", populate: { path: "thumbnail" } })
          .populate("postCategory");
        for (let i = 0; i < content.length; i++) {
          const item = content[i];
          if (!userId) content[i].liked = false;
          else
            content[i].liked = await this.PostLike.isUserLiked(
              item._id,
              userId,
            );
        }
        totalItems = await Post.countDocuments(filters);
      }
      if (pi.type.title === "experience") {
        content = await Experience.find(filters)
          .sort(sort)
          .limit(10)
          .populate("images")
          .populate({ path: "videos", populate: { path: "thumbnail" } })
          .populate("experienceCategory");
        for (let i = 0; i < content.length; i++) {
          const item = content[i];
          if (!userId) content[i].liked = false;
          else
            content[i].liked = await this.ExperienceLike.isUserLiked(
              item._id,
              userId,
            );
        }
        totalItems = await Experience.countDocuments(filters);
      }
      if (pi.type.title === "userExperience") {
        content = await UserExperience.find(filters)
          .populate("userExperienceCategory")
          .sort(sort)
          .limit(10);
        for (let i = 0; i < content.length; i++) {
          const item = content[i];
          if (!userId) content[i].liked = false;
          else
            content[i].liked = await this.UserExperienceLike.isUserLiked(
              item._id,
              userId,
            );
        }
        totalItems = await UserExperience.countDocuments(filters);
      }
      if (pi.type.title === "idea") {
        content = await Idea.find({ isAdminSubmitted: true, ...filters })
          .sort(sort)
          .limit(10)
          .populate(["ideaCategory"]);
        for (let i = 0; i < content.length; i++) {
          const item = content[i];
          if (!userId) content[i].liked = false;
          else
            content[i].liked = await this.IdeaLike.isUserLiked(
              item._id,
              userId,
            );
        }
        totalItems = await Idea.countDocuments({
          isAdminSubmitted: true,
          ...filters,
        });
      }
      if (pi.type.title === "userIdea") {
        content = await Idea.find({
          isAdminSubmitted: false,
          isApprove: true,
          ...filters,
        })
          .sort(sort)
          .limit(10)
          .populate(["ideaCategory"]);
        for (let i = 0; i < content.length; i++) {
          const item = content[i];
          if (!userId) content[i].liked = false;
          else
            content[i].liked = await this.IdeaLike.isUserLiked(
              item._id,
              userId,
            );
        }
        totalItems = await Idea.countDocuments({
          isAdminSubmitted: false,
          isApprove: true,
        });
      }
      if (pi.type.title === "slider") {
        content = await Slider.find(filters).sort("index").populate(["image"]);
        totalItems = await Slider.countDocuments(filters);
      }
      if (pi.type.title === "featured") {
        content = await Post.find({ ...filters, featured: true })
          .sort(sort)
          .limit(100)
          .populate("images")
          .populate({ path: "videos", populate: { path: "thumbnail" } })
          .populate<{ postCategory: IPostCategory }>("postCategory");
        totalItems = await Post.countDocuments({ ...filters, featured: true });
      }
      result.push({ ...pi, content, totalItems });
    }

    return result;
  };

  get = async (id: string): Promise<IPageItemRead> => {
    const item = await this.PageItem.findById(id).populate<{
      type: IPageItemType;
      style: IPageItemStyle;
      sorting: IPageItemSorting;
    }>(["type", "sorting", "style"]);
    if (!item) throw new NotFoundError();

    return item;
  };

  create = async ({
    title,
    subTitle,
    type,
    sorting,
    style,
    index,
    isPublished,
  }: IPageItem): Promise<IPageItem> => {
    await this.#checkExistance({
      type,
      sorting,
      style,
    });

    const item = new this.PageItem({
      title,
      subTitle,
      type,
      sorting,
      style,
      index: index || 0,
      isPublished,
    });
    return await item.save();
  };

  update = async ({
    _id,
    title,
    subTitle,
    type,
    sorting,
    style,
    index,
    isPublished,
  }: IPageItem): Promise<IPageItem> => {
    await this.#checkExistance({
      type,
      sorting,
      style,
    });

    const item = await this.PageItem.findByIdAndUpdate(_id, {
      $set: { title, subTitle, type, sorting, style, index, isPublished },
    });
    if (!item) throw new NotFoundError();

    return await item.save();
  };

  setIndex = async (_id: string, index: number): Promise<IPageItemRead> => {
    const item = await this.PageItem.findByIdAndUpdate(
      _id,
      { $set: { index } },
      { new: true },
    ).populate<{
      type: IPageItemType;
      style: IPageItemStyle;
      sorting: IPageItemSorting;
    }>(["type", "sorting", "style"]);

    if (!item) throw new NotFoundError();

    return item;
  };

  remove = async (id: string): Promise<IPageItem> => {
    const item = await this.PageItem.findByIdAndDelete(id);
    if (!item) throw new NotFoundError();

    return item;
  };

  #checkExistance = async ({
    type,
    sorting,
    style,
  }: Pick<IPageItem, "type" | "sorting" | "style">) => {
    const existingType = await this.Type.get(type as string);
    const existingSorting = await this.Sorting.get(sorting as string);
    const existingStyle = await this.Style.get(style as string);

    if (!existingType) throw new BadRequestError("نوع با این شناسه یافت نشد");
    if (!existingSorting)
      throw new BadRequestError("ترتیب با این شناسه یافت نشد");
    if (!existingStyle) throw new BadRequestError("ظاهر با این شناسه یافت نشد");
  };
}

export default PageItemData;
