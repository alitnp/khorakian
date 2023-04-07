import IdeaCategoryController from "@/components/ideaCategory/ideaCategoryController";
import IdeaCategoryData from "@/components/ideaCategory/ideaCategoryData";
import { IdeaCategory } from "@/components/ideaCategory/ideaCategoryModel";

import { basicCrud } from "@/routes/globalRouter";

const data = new IdeaCategoryData(IdeaCategory);
const controller = new IdeaCategoryController(data);

const router = basicCrud(controller, true);

export default router;
