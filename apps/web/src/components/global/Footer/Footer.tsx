import webConfig from "@/global/constants/webConfig";
import { IImage, ISocialMediaRead } from "@my/types";
import { Tooltip } from "antd";
import Image from "next/image";
import { FC, useMemo } from "react";

interface IFooter {
	socialMedias: ISocialMediaRead[];
	footer_image?: IImage;
	footer_title?: string;
	footer_subTitle?: string;
	footer_additionalInfo_1?: string;
	footer_additionalInfo_2?: string;
}

const quickAccessRoutes = [
	{ title: "تازه ها", route: "/" },
	{ title: "تجربیات", route: "/" },
	{ title: "ایده ها و نظر ها", route: "/" },
	{ title: "پیام به من", route: "/" },
	{ title: "پروفایل", route: "/" },
];

const Footer: FC<IFooter> = ({
	socialMedias,
	footer_image,
	footer_title,
	footer_subTitle,
	footer_additionalInfo_1,
	footer_additionalInfo_2,
}) => {
	const renderMedias = useMemo(
		() =>
			socialMedias.map((sm) => {
				if (!sm.image?.thumbnailPathname) return null;
				return (
					<Tooltip
						title={sm.englishTitle || sm.title}
						key={sm._id}
					>
						<a href={sm.url} target="_blank" rel="noreferrer">
							<Image
								src={webConfig.domain + sm.image.thumbnailPathname}
								width={32}
								height={32}
								alt={sm.image.title}
								className="w-8 h-8"
							/>
						</a>
					</Tooltip>
				);
			}),
		[]
	);

	return (
		<footer className="mt-24 mb-6 k-container">
			<div className="w-full px-8 py-4 border shadow-lg rounded-xl">
				<div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
					<div className="flex items-center gap-x-2">
						{footer_image?.thumbnailPathname && (
							<Image
								src={
									webConfig.domain + footer_image.thumbnailPathname
								}
								width={footer_image.thumbnailWidth}
								height={footer_image.thumbnailHeight}
								alt={footer_image.title}
								className="w-16 h-16 rounded-full"
							/>
						)}
						<div className="">
							<span className="block text-base font-medium">
								{footer_title}
							</span>
							<span className="block text-k-grey-text-color max-w-[30ch] text-xs">
								{footer_subTitle}
							</span>
						</div>
					</div>
					<div>
						<span className="block mb-2 text-sm font-medium">دسترسی سریع</span>
						<nav>
							<ul className="flex flex-wrap gap-x-4 gap-y-2 text-k-grey-text-color">
								{quickAccessRoutes.map((item) => (
									<li
										key={item.title}
										className="text-sm cursor-pointer whitespace-nowrap hover:text-k-primary-color"
									>
										{item.title}
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className=" w-fit">
						<span className="block mb-2 text-sm font-medium">
							صفحه های دیگر
						</span>
						<div className="flex gap-x-4 w-fit">
							{renderMedias}
						</div>
					</div>
				</div>
				<div className="mt-6">
					<span className="block text-[10px]">
						{footer_additionalInfo_1}
					</span>
					<span className="block text-[10px]">
						{footer_additionalInfo_2}
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
