import { GetStaticProps } from "next";
import { IImage } from "@my/types";
import webConfig from "@/global/constants/webConfig";
import { memo } from "react";
import {
	getHomeDefaultImages,
	getHomeDefaultTexts,
} from "@/components/home/homeFunctions";
import MyButton from "@/components/basicUi/MyButton";

type props = {
	defaultTextsObject: Record<string, string>;
	defaultImagesObject: Record<string, IImage>;
};

export const getStaticProps: GetStaticProps = async () => {
	const defaultTextsObject = await getHomeDefaultTexts();
	const defaultImagesObject = await getHomeDefaultImages();

	const props: props = {
		defaultImagesObject,
		defaultTextsObject,
	};

	return {
		props,
		revalidate: webConfig.dataRevalidateTime,
	};
};

const Idea = ({
	defaultImagesObject,
	defaultTextsObject,
}: props) => {
	return (
		<main className="my-16 k-container ">
			<div className="mx-auto max-w-7xl">
				<h1 className="mb-4 text-3xl font-bold text-center">
					{defaultTextsObject?.idea_header_title}
				</h1>
				<p className="max-w-xl mx-auto text-center">
					{defaultTextsObject?.idea_header_text}
				</p>
				<div className="flex items-center justify-between max-w-3xl p-4 mx-auto my-10 border rounded-lg border-k-border-2-color ">
					<h3 className="max-w-md">
						{defaultTextsObject?.idea_submit_text}
					</h3>
					<MyButton type="primary" size="large">
						ثبت ایده جدید
					</MyButton>
				</div>
			</div>
		</main>
	);
};

export default memo(Idea);
