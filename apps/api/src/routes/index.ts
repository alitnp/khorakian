import { Router } from "express";

import categoryRoutes from "@/components/category/categoryRoutes";
import authorRoutes from "@/components/author/authorRoutes";
import bookRoutes from "@/components/book/bookRoutes";
import userRoutes from "@/components/user/userRoutes";

const router = Router();

// router.get("/", sanitizer(appKeyValidator), HomeController.getAppInfo);

router.use("/category", categoryRoutes);
router.use("/author", authorRoutes);
router.use("/book", bookRoutes);
router.use("/user", userRoutes);

export default router;
