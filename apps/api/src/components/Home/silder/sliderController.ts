import { ISlider, ISliderRead } from "@my/types";
import SliderData from "@/components/Home/silder/sliderData";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";

class SliderController {
  data: SliderData;

  constructor(data: SliderData) {
    this.data = data;
  }

  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req);
    res.send(apiDataListResponse<ISlider>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(req.params.id);
    res.send(apiDataResponse<ISlider>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create(req.body);
    res.send(apiDataResponse<ISlider>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<ISlider>(result));
  };

  setIndex = async (req: Req, res: Res) => {
    const result = await this.data.setIndex(req.params.id, req.body.index);
    res.send(apiDataResponse<ISliderRead>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<ISlider>(result));
  };
}

export default SliderController;
