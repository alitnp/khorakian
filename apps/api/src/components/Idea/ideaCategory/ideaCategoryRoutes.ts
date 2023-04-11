import IdeaCategoryController from "@/components/Idea/ideaCategory/ideaCategoryController";
import IdeaCategoryData from "@/components/Idea/ideaCategory/ideaCategoryData";
import { IdeaCategory } from "@/components/Idea/ideaCategory/ideaCategoryModel";
import { basicCrud } from "@/routes/globalRouter";

const data = new IdeaCategoryData(IdeaCategory);
const controller = new IdeaCategoryController(data);

const router = basicCrud(controller, true);

export default router;
