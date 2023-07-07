import { GetServerSideProps } from "next";
import { IImage } from "@my/types";
import webConfig from "@/global/constants/webConfig";
import { memo } from "react";
import {
	getHomeDefaultImages,
	getHomeDefaultTexts,
} from "@/components/home/homeFunctions";
import MyButton from "@/components/basicUi/MyButton";
import IdeasTabs from "@/components/idea/IdeasTabs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import webRoutes from "@/global/constants/webRoutes";

type props = {
	defaultTextsObject: Record<string, string>;
	defaultImagesObject: Record<string, IImage>;
};

export const getServerSideProps: GetServerSideProps =
	async () => {
		const defaultTextsObject = await getHomeDefaultTexts();
		const defaultImagesObject = await getHomeDefaultImages();

		const props: props = {
			defaultImagesObject,
			defaultTextsObject,
		};

		return {
			props,
		};
	};

const Idea = ({ defaultTextsObject }: props) => {
	//state
	const { loggedIn } = useSelector(
		(state: RootState) => state.user
	);

	return (
		<main className="my-16 k-container ">
			<div className="mx-auto max-w-7xl">
				<h1 className="mb-4 text-3xl font-bold text-center">
					{defaultTextsObject?.idea_header_title}
				</h1>
				<p className="max-w-xl mx-auto text-center">
					{defaultTextsObject?.idea_header_text}
				</p>
				<div className="flex flex-col items-center justify-between max-w-3xl gap-4 p-4 mx-auto my-10 border rounded-lg sm:flex-row border-k-border-2-color ">
					<h3 className="max-w-md text-center sm:text-right">
						{defaultTextsObject?.idea_submit_text}
					</h3>
					<Link
						href={
							loggedIn
								? webRoutes.dashboardIdea.path
								: webRoutes.login.path
						}
					>
						<MyButton type="primary" size="large">
							ثبت ایده جدید
						</MyButton>
					</Link>
				</div>
			</div>
			<IdeasTabs />
		</main>
	);
};

export default memo(Idea);
