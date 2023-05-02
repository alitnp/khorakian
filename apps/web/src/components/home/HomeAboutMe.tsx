import webConfig from "@/global/constants/webConfig";
import { IImage, IPostRead } from "@my/types";
import Image from "next/image";
import { FC } from "react";

interface IHomeAboutMe {
	posts: IPostRead[];
	home_aboutMe_title?: string;
	home_aboutMe_text?: string;
	home_aboutMe_image?: IImage;
}

const HomeAboutMe: FC<IHomeAboutMe> = ({
	posts,
	home_aboutMe_title,
	home_aboutMe_text,
	home_aboutMe_image,
}) => {
	console.log(posts);
	return (
		<div className="my-6  k-container">
			<div className="flex">
				<div className="flex flex-col justify-center w-full py-20">
					<span className="mb-4 text-2xl font-bold">
						{home_aboutMe_title}
					</span>
					<p className="max-w-[100ch] w-full">
						{home_aboutMe_text}
					</p>
				</div>
				<div className="hidden w-full lg:block">
					{home_aboutMe_image && (
						<div className="mx-auto overflow-hidden rounded-lg w-fit ">
							<Image
								src={webConfig.domain + home_aboutMe_image.pathname}
								width={home_aboutMe_image.width}
								height={home_aboutMe_image.height}
								alt={home_aboutMe_image.title}
								className="object-cover h-full max-w-md max-h-[500px]"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomeAboutMe;
