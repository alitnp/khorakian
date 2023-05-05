import HomeFeaturedCategories from "@/components/home/components/HomeFeaturedCategories";
import HomeFeaturedPosts from "@/components/home/components/HomeFeaturedPosts";
import { IPostRead } from "@my/types";
import { FC, memo, useState } from "react";

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
	const [activePost, setActivePost] = useState<IPostRead>(
		posts[0]
	);

	return (
		<div className="k-container">
			<HomeFeaturedCategories
				posts={posts}
				activeCategory={activeCategory}
				setActiveCategory={setActiveCategory}
				setActivePost={setActivePost}
			/>
			<div className="w-full bg-slate-700">
				<HomeFeaturedPosts
					posts={posts}
					activeCategory={activeCategory}
					activePost={activePost}
					setActivePost={setActivePost}
				/>
			</div>
		</div>
	);
};

export default memo(HomeFeatured);
