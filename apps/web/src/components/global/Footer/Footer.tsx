import webConfig from "@/global/constants/webConfig";
import { IImage, ISocialMediaRead } from "@my/types";
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
				if (!sm.image.thumbnailPathname) return null;
				return (
					<a
						href={sm.url}
						target="_blank"
						rel="noreferrer"
						key={sm._id}
					>
						<Image
							key={sm._id}
							src={webConfig.domain + sm.image.thumbnailPathname}
							width={sm.image.thumbnailWidth}
							height={sm.image.thumbnailHeight}
							alt={sm.image.title}
						/>
					</a>
				);
			}),
		[]
	);

	return (
		<div className="mb-6 k-container">
			<div className="w-full px-8 py-4 border shadow-lg rounded-xl">
				<div className="flex items-center justify-between">
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
							<span className="block text-sm text-k-grey-text-color">
								{footer_subTitle}
							</span>
						</div>
					</div>
					<div className="flex gap-x-4">{renderMedias}</div>
				</div>
				<div className="mt-4">
					<span className="block text-xs">
						{footer_additionalInfo_1}
					</span>
					<span className="block text-xs">
						{footer_additionalInfo_2}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
