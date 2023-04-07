import PageItemSortingController from "@/components/Home/pageItemSorting/pageItemSortingController";
import PageItemSortingData from "@/components/Home/pageItemSorting/pageItemSortingData";
import { PageItemSorting } from "@/components/Home/pageItemSorting/pageItemSortingModel";
import { basicCrud } from "@/routes/globalRouter";

const data = new PageItemSortingData(PageItemSorting);
const controller = new PageItemSortingController(data);

const router = basicCrud(controller, true);

export default router;
