import MyButton from "@/components/basicUi/MyButton";
import webRoutes from "@/global/constants/webRoutes";
import webConfig from "@/global/constants/webConfig";
import { IIdeaRead, IImage } from "@my/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";

interface IHomeIdeaExpLink {
	home_experience_title?: string;
	home_experience_text?: string;
	home_experience_button?: string;
	home_experience_image?: IImage;
	home_idea_title?: string;
	home_idea_text?: string;
	home_idea_button?: string;
	home_idea_image?: IImage;
	// featuredIdeas?: IIdeaRead[];
}

const HomeIdeaExpLink: FC<IHomeIdeaExpLink> = ({
	home_experience_title,
	home_experience_text,
	home_experience_button,
	home_experience_image,
	home_idea_title,
	home_idea_text,
	home_idea_button,
	home_idea_image,
	// featuredIdeas,
}) => {
	return (
		<div className="flex flex-col lg:flex-row">
			<div className="relative flex items-center justify-center w-full lg:w-1/2 ">
				<div className="absolute top-0 left-0 w-full h-full -z-10">
					<div className="relative w-full h-full">
						{home_experience_image && (
							<Image
								src={
									webConfig.domain + home_experience_image.pathname
								}
								width={home_experience_image.width}
								height={home_experience_image.height}
								alt={home_experience_image.title}
								className="object-cover w-full h-full"
							/>
						)}
						<div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm brightness-50" />
					</div>
				</div>
				<div className="w-full max-w-lg mx-5 my-20 text-k-bg-color">
					<div className="w-40 py-4 mb-6 rounded-lg bg-k-primary-2-color">
						<h3 className="relative text-3xl font-bold whitespace-nowrap right-[15%]  sm:right-1/4">
							{home_experience_title}
						</h3>
					</div>
					<p className="max-w-lg">{home_experience_text}</p>
					<hr className="w-full my-6 border-k-bg-color" />
					<div className="flex justify-end">
						<Link href={webRoutes.experience.path}>
							<MyButton
								type="primary"
								shape="round"
								className="!w-fit !px-10"
							>
								{home_experience_button}
							</MyButton>
						</Link>
					</div>
				</div>
			</div>
			<div className="relative flex items-center justify-center w-full lg:w-1/2 ">
				<div className="absolute top-0 left-0 w-full h-full -z-10">
					<div className="relative w-full h-full">
						{home_idea_image && (
							<Image
								src={webConfig.domain + home_idea_image.pathname}
								width={home_idea_image.width}
								height={home_idea_image.height}
								alt={home_idea_image.title}
								className="object-cover w-full h-full"
							/>
						)}
						<div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm brightness-50" />
					</div>
				</div>
				<div className="flex flex-col items-center gap-4 mx-5 my-20 text-k-bg-color ">
					<h3 className="text-3xl font-medium whitespace-nowrap">
						{home_idea_title}
					</h3>
					<p className="max-w-sm text-center">
						{home_idea_text}
					</p>
					<Link href={webRoutes.idea.path}>
						<MyButton
							type="primary"
							shape="round"
							className="flex items-center justify-center gap-x-2  !w-fit !px-10"
						>
							<span>{home_idea_button}</span>
							<BiArrowBack />
						</MyButton>
					</Link>
					{/* <div className="flex flex-col items-center gap-4 p-4 mt-6 rounded-lg sm:flex-row bg-k-bg-color text-k-text-color">
						{featuredIdeas?.map((idea) => (
							<div key={idea._id} className="inline-flex gap-6 ">
								<p className="w-[20ch] line-clamp-3 text-xs font-medium">
									{idea.title}
								</p>
							</div>
						))}
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default HomeIdeaExpLink;
