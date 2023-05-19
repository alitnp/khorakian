import { FC } from "react";

interface IExperienceCard {
	text?: string;
	title?: string;
	active?: boolean;
}

const ExperienceCard: FC<IExperienceCard> = ({
	text,
	title,
	active,
}) => {
	return (
		<div
			className={`px-3 py-5 w-full  overflow-hidden rounded-lg bg-white/20 backdrop-blur-sm  border text-k-bg-color ${
				active
					? "border-k-primary-color "
					: "border-transparent"
			}`}
		>
			<h4 className="mb-2 font-medium">{title}</h4>
			<span className="text-xs font-light">{text}</span>
		</div>
	);
};

export default ExperienceCard;
