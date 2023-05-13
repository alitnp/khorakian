import HomeFeatureActivePost from "@/components/home/components/HomeFeatureActivePost";
import HomeFeaturedCategories from "@/components/home/components/HomeFeaturedCategories";
import HomeFeaturedPosts from "@/components/home/components/HomeFeaturedPosts";
import { IPostRead } from "@my/types";
import { FC, memo, useState, useMemo } from "react";

interface IHomeFeatured {
	posts: IPostRead[];
	title: string;
}

const HomeFeatured: FC<IHomeFeatured> = ({
	posts,
	title,
}) => {
	//states
	const [activeCategory, setActiveCategory] =
		useState<string>();
	const [activePost, setActivePost] = useState<number>(0);

	const showingPost: IPostRead = useMemo(() => {
		if (!activeCategory) return posts[activePost];
		return posts.filter(
			(post) => post.postCategory._id === activeCategory
		)[activePost];
	}, [activeCategory, activePost]);

	return (
		<div className="py-16 k-container">
			<HomeFeaturedCategories
				posts={posts}
				activeCategory={activeCategory}
				setActiveCategory={setActiveCategory}
				setActivePost={setActivePost}
			/>
			<div className="flex flex-col md:flex-row w-full mt-2 overflow-hidden border rounded-lg shadow-md bg-k-text-color md:h-[500px]">
				<HomeFeaturedPosts
					title={title}
					posts={posts}
					activeCategory={activeCategory}
					activePost={activePost}
					setActivePost={setActivePost}
				/>
				<HomeFeatureActivePost post={showingPost} />
			</div>
		</div>
	);
};

export default memo(HomeFeatured);
