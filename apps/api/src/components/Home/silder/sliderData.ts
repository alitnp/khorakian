import { Model } from "mongoose";
import { ApiDataListResponse, IImage, ISlider, ISliderRead } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import { getSortBy } from "@/utils/pagination";

class SliderData implements IData<ISlider> {
  Slider: Model<ISlider>;

  constructor(Slider: Model<ISlider>) {
    this.Slider = Slider;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<ISlider>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query.subTitle)
      searchQuery.subTitle = { $regex: req.query.subTitle, $options: "i" };
    if (req.query.shortDesc)
      searchQuery.shortDesc = { $regex: req.query.shortDesc, $options: "i" };
    if (req.query.desc)
      searchQuery.desc = { $regex: req.query.desc, $options: "i" };
    if (req.query.direction)
      searchQuery.direction = { $regex: req.query.direction, $options: "i" };
    if (req.query.url)
      searchQuery.url = { $regex: req.query.url, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    //if theres no custom sortBy then sort by index
    if (!getSortBy(req)) req.query.sortBy = "index";

    return await getAllData<ISlider>(searchQuery, req, this.Slider, ["image"]);
  };

  get = async (id: string): Promise<ISlider> => {
    const item = await this.Slider.findById(id).populate("image");
    if (!item) throw new NotFoundError();

    return item;
  };

  create = async ({
    title,
    subTitle,
    shortDesc,
    desc,
    index,
    image,
    url,
    direction = "right",
  }: ISlider): Promise<ISlider> => {
    const item = new this.Slider({
      title,
      subTitle,
      shortDesc,
      desc,
      index,
      image,
      url,
      direction,
    });
    return await item.save();
  };

  update = async ({
    _id,
    title,
    subTitle,
    shortDesc,
    desc,
    index,
    image,
    url,
    direction = "right",
  }: ISlider): Promise<ISlider> => {
    const item = await this.Slider.findByIdAndUpdate(_id, {
      $set: { title, subTitle, shortDesc, desc, index, image, url, direction },
    });
    if (!item) throw new NotFoundError();

    return await item.save();
  };

  setIndex = async (_id: string, index: number): Promise<ISliderRead> => {
    const item = await this.Slider.findByIdAndUpdate(
      _id,
      { $set: { index } },
      { new: true },
    ).populate<{ image: IImage }>("image");

    if (!item) throw new NotFoundError();

    return item;
  };

  remove = async (id: string): Promise<ISlider> => {
    const item = await this.Slider.findByIdAndDelete(id);
    if (!item) throw new NotFoundError();

    return item;
  };
}

export default SliderData;
