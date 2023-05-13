import webConfig from "@/global/constants/webConfig";
import { getImageFromContent } from "@/global/utils/helperFunctions";
import { IPostRead } from "@my/types";
import Image from "next/image";
import { FC, useMemo } from "react";

interface IHomeFeatureActivePost {
	post: IPostRead;
}

const HomeFeatureActivePost: FC<IHomeFeatureActivePost> = ({
	post,
}) => {
	const image = useMemo(
		() => getImageFromContent(post),
		[post]
	);

	return (
		<div className="relative w-full h-[500px] overflow-hidden z-0">
			<div className="absolute top-0 left-0 z-10 w-full">
				{image && (
					<Image
						src={webConfig.domain + image.pathname}
						width={image.width}
						height={image.height}
						alt={image.title}
						className="h-[500px] object-cover z-50 mx-auto"
					/>
				)}
			</div>
			{image && (
				<Image
					src={webConfig.domain + image.pathname}
					fill
					alt={image.title}
					className="h-[500px] object-cover z-0 scale-110 blur-lg brightness-50"
				/>
			)}
			<div className="absolute top-0 left-0 z-20 w-full h-full bg-slate-800/20">
				<div className="relative w-full h-full">
					<div className="absolute bottom-6 right-6 text-k-bg-color">
						<span>{post.text}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeFeatureActivePost;
