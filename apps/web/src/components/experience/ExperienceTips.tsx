import ExperienceCard from "@/components/experience/ExperienceCard";
import webConfig from "@/global/constants/webConfig";
import { IImage } from "@my/types";
import { FC } from "react";
import Image from "next/image";

interface IExperience {
	experience_tips_image?: IImage;
	experience_tips_title?: string;
	experience_tip_1_title?: string;
	experience_tip_1_text?: string;
	experience_tip_2_title?: string;
	experience_tip_2_text?: string;
	experience_tip_3_title?: string;
	experience_tip_3_text?: string;
	experience_tip_4_title?: string;
	experience_tip_4_text?: string;
}

const ExperienceTips: FC<IExperience> = ({
	experience_tips_image,
	experience_tips_title,
	experience_tip_1_title,
	experience_tip_1_text,
	experience_tip_2_title,
	experience_tip_2_text,
	experience_tip_3_title,
	experience_tip_3_text,
	experience_tip_4_title,
	experience_tip_4_text,
}) => {
	
	return (
		<>
			<div className="relative w-full">
				<div className="absolute top-0 left-0 w-full h-full -z-10 bg-k-text-color">
					{experience_tips_image?.pathname && (
						<Image
							fill
							alt={experience_tips_image.title}
							src={
								webConfig.domain + experience_tips_image.pathname
							}
							className="object-cover"
						/>
					)}
				</div>
				<div className="z-20 w-full h-full py-32 k-container bg-stone-800/80">
					<div className="pb-20 mx-auto text-center ">
						<h1 className="text-3xl font-bold text-k-bg-color max-w-[30ch] mx-auto">
							{experience_tips_title}
						</h1>
					</div>
					<div className="grid grid-cols-1 gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 max-w-7xl">
						{(experience_tip_1_text ||
							experience_tip_1_title) && (
							<ExperienceCard
								active
								title={experience_tip_1_title}
								text={experience_tip_1_text}
							/>
						)}
						{(experience_tip_2_text ||
							experience_tip_2_title) && (
							<ExperienceCard
								title={experience_tip_2_title}
								text={experience_tip_2_text}
							/>
						)}
						{(experience_tip_3_text ||
							experience_tip_3_title) && (
							<ExperienceCard
								title={experience_tip_3_title}
								text={experience_tip_3_text}
							/>
						)}
						{(experience_tip_4_text ||
							experience_tip_4_title) && (
							<ExperienceCard
								title={experience_tip_4_title}
								text={experience_tip_4_text}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ExperienceTips;
