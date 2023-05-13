import UserExperienceCategoryController from "@/components/userExperience/userExperienceCategory/userExperienceCategoryController";
import UserExperienceCategoryData from "@/components/userExperience/userExperienceCategory/userExperienceCategoryData";
import { UserExperienceCategory } from "@/components/userExperience/userExperienceCategory/userExperienceCategoryModel";
import { basicCrud } from "@/routes/globalRouter";

const data = new UserExperienceCategoryData(UserExperienceCategory);
const controller = new UserExperienceCategoryController(data);

const router = basicCrud(controller, true);

export default router;
