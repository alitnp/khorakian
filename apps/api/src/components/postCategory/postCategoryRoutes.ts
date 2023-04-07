import PostCategoryController from "@/components/postCategory/postCategoryController";
import PostCategoryData from "@/components/postCategory/postCategoryData";
import { PostCategory } from "@/components/postCategory/postCategoryModel";
import { basicCrud } from "@/routes/globalRouter";

const data = new PostCategoryData(PostCategory);
const controller = new PostCategoryController(data);

const router = basicCrud(controller, true);

export default router;
