import Link from "next/link";
import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";

interface IPageItemTitle {
	title: string;
	desc?: string;
	moreUrl?: string;
}

const PageItemTitle: FC<IPageItemTitle> = ({
	title,
	desc,
	moreUrl,
}) => {
	return (
		<div className="flex flex-col justify-between gap-2 pb-2 border-b sm:flex-row item-center">
			<div>
				<h1 className="text-3xl font-bold">{title}</h1>
				<span className="text-sm">{desc}</span>
			</div>
			{moreUrl && (
				<Link
					href={moreUrl}
					className="flex items-center gap-2 text-sm font-medium cursor-pointer text-k-primary-color hover:text-k-primary-2-color"
				>
					<span>نمایش همه</span>
					<BiArrowBack className="text-xl" />
				</Link>
			)}
		</div>
	);
};

export default PageItemTitle;
