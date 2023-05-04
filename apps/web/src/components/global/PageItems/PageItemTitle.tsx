import Link from "next/link";
import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";

interface IPageItemTitle {
	title: string;
	desc?: string;
	moreText?: string;
	moreUrl?: string;
}

const PageItemTitle: FC<IPageItemTitle> = ({
	title,
	desc,
	moreText,
	moreUrl,
}) => {
	return (
		<div className="flex justify-between border-b item-center">
			<div>
				<h1 className="text-3xl font-bold">{title}</h1>
				<span className="text-sm">{desc}</span>
			</div>
			{moreText && moreUrl && (
				<Link
					href={moreUrl}
					className="flex items-center gap-2 text-sm font-medium cursor-pointer text-k-primary-color hover:text-k-primary-2-color"
				>
					<span>۱۴ مورد دیگر</span>
					<BiArrowBack className="text-xl" />
				</Link>
			)}
		</div>
	);
};

export default PageItemTitle;
