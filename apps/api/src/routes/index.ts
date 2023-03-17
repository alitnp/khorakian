import { Router } from "express";

import userRoutes from "@/components/user/userRoutes";
import postCategoryRoutes from "@/components/postCategory/postCategoryRoutes";
import imageRoutes from "@/components/image/imageRoutes";

const router = Router();

// router.get("/", sanitizer(appKeyValidator), HomeController.getAppInfo);

router.use("/user", userRoutes);
router.use("/postcategory", postCategoryRoutes);
router.use("/image", imageRoutes);

export default router;
