import PostCategoryController from "@/components/Post/postCategory/postCategoryController";
import PostCategoryData from "@/components/Post/postCategory/postCategoryData";
import { PostCategory } from "@/components/Post/postCategory/postCategoryModel";
import { basicCrud } from "@/routes/globalRouter";

const data = new PostCategoryData(PostCategory);
const controller = new PostCategoryController(data);

const router = basicCrud(controller, true);

export default router;
