import webConfig from "@/global/constants/webConfig";
import { IAboutMeRead, IImage, IPostRead } from "@my/types";
import Image from "next/image";
import { FC, useCallback } from "react";
import { FaQuoteLeft } from "react-icons/fa";

interface IHomeAboutMeCard {
	aboutMe: IAboutMeRead;
	index: number;
}

type imageDetail =
	| {
			pathname: string;
			alt: string;
	  }
	| undefined;

const bgColors = [
	"bg-slate-700",
	"bg-zinc-700",
	"bg-stone-700",
	"bg-gray-700",
];

const HomeAboutMeCard: FC<IHomeAboutMeCard> = ({
	aboutMe,
	index,
}) => {
	const imageDetail = useCallback(
		(post: IPostRead): imageDetail => {
			let image: imageDetail = undefined;
			if (
				post?.videos?.length > 0 &&
				!!post.videos[0]?.thumbnail?.thumbnailPathname
			) {
				const info: IImage = post.videos[0].thumbnail;
				image = {
					pathname: info.thumbnailPathname as string,
					alt: info.title,
				};
			} else if (post?.images?.length > 0) {
				const info: IImage = post.images[0];
				image = {
					pathname: info.thumbnailPathname as string,
					alt: info.title,
				};
			}

			return image;
		},
		[]
	);
	const image = imageDetail(aboutMe.post);

	return (
		<div className="relative flex flex-col justify-between w-full h-full p-6 overflow-hidden rounded-xl">
			<span className="z-10 block pr-4 mb-2 text-xl font-medium text-k-bg-color">
				{aboutMe.text}
			</span>
			<div className="z-10 flex items-center gap-2">
				<div className="h-20">
					{image && (
						<Image
							src={webConfig.domain + image.pathname}
							width={80}
							height={80}
							alt={image.alt}
							className="object-cover w-20 h-20 overflow-hidden rounded-full"
						/>
					)}
				</div>
				<div className="">
					<span className="block text-k-bg-color">
						{aboutMe.name}
					</span>
					<span className="block text-xs text-k-grey-text-color">
						{aboutMe.position}
					</span>
				</div>
			</div>
			<div className="absolute -z-10 top-4 right-4">
				<FaQuoteLeft className="text-k-bg-color -scale-x-100 text-7xl opacity-20" />
			</div>
			<div
				className={`absolute top-0 left-0 w-full h-full -z-20 ${
					bgColors[index % 4]
				}`}
			/>
		</div>
	);
};

export default HomeAboutMeCard;
