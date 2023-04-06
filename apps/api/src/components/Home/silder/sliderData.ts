import { Model } from "mongoose";
import { ApiDataListResponse, ISlider } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";

class SliderData implements IData<ISlider> {
  Slider: Model<ISlider>;

  constructor(Slider: Model<ISlider>) {
    this.Slider = Slider;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<ISlider>> => {
    const searchQuery: any = {};
    searchQuery.sortBy = "index";
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

    return getAllData<ISlider>(searchQuery, req, this.Slider, ["image"]);
  };

  get = async (id: string): Promise<ISlider> => {
    const slider = await this.Slider.findById(id);
    if (!slider) throw new NotFoundError();

    return slider;
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
    const slider = new this.Slider({
      title,
      subTitle,
      shortDesc,
      desc,
      index,
      image,
      url,
      direction,
    });
    return await slider.save();
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
    const slider = await this.Slider.findByIdAndUpdate(_id, {
      $set: { title, subTitle, shortDesc, desc, index, image, url, direction },
    });
    if (!slider) throw new NotFoundError();

    return await slider.save();
  };

  remove = async (id: string): Promise<ISlider> => {
    const history = await this.Slider.findByIdAndDelete(id);
    if (!history) throw new NotFoundError();

    return history;
  };
}

export default SliderData;
