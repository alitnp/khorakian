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
			className={`p-3 w-full max-w-[30ch] overflow-hidden rounded-lg bg-white/20 backdrop-blur-sm backdrop-brightness-125 border text-k-bg-color ${
				active
					? "border-k-primary-color "
					: "border-transparent"
			}`}
		>
			<h4 className="mb-2 text-sm font-medium">{title}</h4>
			<span className="text-xs font-light">{text}</span>
		</div>
	);
};

export default ExperienceCard;
