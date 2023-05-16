import { IImage } from "@my/types";
import { FC } from "react";

interface IMainTitle {
	experience_header_title?: string;
	experience_header_subTitle?: string;
	experience_header_button_text?: string;
	experience_tips_image?: IImage;
}

const MainTitle: FC<IMainTitle> = ({
	experience_header_title,
	experience_header_subTitle,
	experience_header_button_text,
	experience_tips_image,
}) => {
	return (
		<>
			<div className="relative h-[30rem] flex items-center justify-center w-full ">
				<div className="absolute -top-[1px] -right-[1px] border border-k-primary-2-color h-1/3 sm:h-1/4 w-2/4 sm:w-1/3 rounded-bl-2xl -z-10"></div>

				<div className="relative flex flex-col items-center content-center ">
					<div
						className="mx-auto mt-5 text-center"
						style={{ width: "60%" }}
					>
						<span className="text-3xl font-bold">
							{experience_header_title}
						</span>
					</div>
					<div className="mx-auto max-w-[60ch] my-4 text-center">
						<span className="text-base ">
							{experience_header_subTitle}
						</span>
						<br />
						<br />
						<a
							href="#"
							className="px-4 py-1 mt-5 border border-k-primary-color rounded-2xl text-k-primary-color"
						>
							{experience_header_button_text}
						</a>
					</div>
				</div>

				<div className="absolute -bottom-[1px] -left-[1px] border border-k-primary-2-color h-1/5 w-2/4 sm:w-1/3 rounded-tr-2xl -z-10"></div>
			</div>
		</>
	);
};

export default MainTitle;
