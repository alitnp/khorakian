import { IPageItem, IPageItemConents, IPageItemRead } from "@my/types";
import PageItemData from "@/components/Home/pageItem/pageItemData";
import { apiDataListResponse, apiDataResponse } from "@/helpers/apiResponse";

class PageItemController {
  data: PageItemData;

  constructor(data: PageItemData) {
    this.data = data;
  }

  getAll = async (req: Req, res: Res) => {
    const result = await this.data.getAll(req);
    res.send(apiDataListResponse<IPageItem>(result));
  };

  get = async (req: Req, res: Res) => {
    const result = await this.data.get(req.params.id);
    res.send(apiDataResponse<IPageItemRead>(result));
  };

  getWithContents = async (_req: Req, res: Res) => {
    const result = await this.data.getWithContents();
    res.send(apiDataResponse<IPageItemConents[]>(result));
  };

  create = async (req: Req, res: Res) => {
    const result = await this.data.create(req.body);
    res.send(apiDataResponse<IPageItem>(result));
  };

  update = async (req: Req, res: Res) => {
    const result = await this.data.update({ _id: req.params.id, ...req.body });
    res.send(apiDataResponse<IPageItem>(result));
  };

  setIndex = async (req: Req, res: Res) => {
    const result = await this.data.setIndex(req.params.id, req.body.index);
    res.send(apiDataResponse<IPageItemRead>(result));
  };

  remove = async (req: Req, res: Res) => {
    const result = await this.data.remove(req.params.id);
    res.send(apiDataResponse<IPageItem>(result));
  };
}

export default PageItemController;
