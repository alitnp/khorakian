import { GetServerSideProps } from "next";
import {
	ApiDataListResponse,
	IExperienceWithComments,
	IImage,
	ISocialMediaRead,
} from "@my/types";
import { memo, useState } from "react";
import MainTitle from "@/components/experience/MainTitle";
import ExperienceTips from "@/components/experience/ExperienceTips";
import {
	getAllSocialMedias,
	getHomeDefaultImages,
	getHomeDefaultTexts,
} from "@/components/home/homeFunctions";
import {
	getExperienceListWithComments,
	getUserExperienceCount,
} from "@/components/experience/experienceFunctions";
import ExperienceBrief from "@/components/experience/ExperienceBrief";
import Link from "next/link";
import webRoutes from "@/global/constants/webRoutes";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import { getContentLikeEndpoint } from "@/global/utils/helperFunctions";
import { webApiCatch } from "@/global/utils/webApiThen";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import Footer from "@/components/global/Footer/Footer";

type props = {
	defaultTextsObject: Record<string, string>;
	defaultImagesObject: Record<string, IImage>;
	experience: ApiDataListResponse<IExperienceWithComments>;
	userExperienceCount: number;
	socialMedias: ISocialMediaRead[];
};

export const getServerSideProps: GetServerSideProps =
	async (context) => {
		const defaultTextsObject = await getHomeDefaultTexts();
		const defaultImagesObject = await getHomeDefaultImages();
		const experience = await getExperienceListWithComments(
			context.req
		);
		const userExperienceCount =
			await getUserExperienceCount();

		const socialMedias = await getAllSocialMedias();

		const props: props = {
			defaultImagesObject,
			defaultTextsObject,
			experience,
			userExperienceCount,
			socialMedias,
		};

		return {
			props,
			// revalidate: webConfig.dataRevalidateTime,
		};
	};

const Experience = ({
	defaultImagesObject,
	defaultTextsObject,
	experience,
	userExperienceCount,
	socialMedias,
}: props) => {
	//states
	const [, setFakeNumber] = useState<number>(1);

	//fucntions
	const handleContentLike = async (
		_id: string,
		index: number
	) => {
		await WebApiService.post(
			getContentLikeEndpoint("experience", _id)
		)
			.then((res: any) => {
				refetch(_id, index);
			})
			.catch(() => webApiCatch(errorResponse));
	};
	const refetch = async (_id: string, index: number) => {
		await WebApiService.get(
			webEndpointUrls.getAllExperienceWithComments +
				"?_id=" +
				_id
		)
			.then(
				(res: ApiDataListResponse<IExperienceWithComments>) => {
					if (res.isSuccess && res.data.length > 0) {
						experience.data[index] = res.data[0];
						setFakeNumber((prevState) => ++prevState);
					}
				}
			)
			.catch(() => {});
	};

	return (
		<>
			<main>
				<MainTitle {...defaultTextsObject} />
				<ExperienceTips
					{...defaultTextsObject}
					{...defaultImagesObject}
				/>
				<div className="flex flex-col max-w-5xl gap-4 mx-auto mt-6 md:flex-row k-container">
					{userExperienceCount > 0 && (
						<Link
							href={webRoutes.userExperienceList.path}
							className="w-full group"
						>
							<div className="flex flex-col justify-between w-full p-4 transition-all duration-300 border rounded-lg bg-k-bg-color group-hover:bg-k-grey-bg-1-color">
								<h5 className="font-medium">تجربیات کاربران</h5>
								<span className="text-sm text-k-grey-text-color">
									تا کنون {userExperienceCount} تجربه توسط کاربران
									سامانه ثبت شده و مورد بحث و گفتگو قرار گرفته.
								</span>
								<div className="mt-2 mr-auto text-xs text-k-primary-color">
									نمایش همه تجربیات کاربران
								</div>
							</div>
						</Link>
					)}
					<Link
						href={webRoutes.experienceAllContent.path}
						className="w-full group"
					>
						<div className="flex flex-col justify-between w-full p-4 transition-all duration-300 border rounded-lg bg-k-bg-color group-hover:bg-k-grey-bg-1-color">
							<h5 className="font-medium">
								تجربیات امیر خوراکیان
							</h5>
							<span className="text-sm text-k-grey-text-color">
								تا کنون {experience.totalItems} تجربه توسط امیر
								خوراکیان سامانه ثبت شده و مورد بحث و گفتگو قرار
								گرفته.
							</span>
							<div className="mt-2 mr-auto text-xs text-k-primary-color">
								نمایش همه تجربیات امیر خوراکیان
							</div>
						</div>
					</Link>
				</div>
				<div className="max-w-5xl mx-auto k-container">
					<div className="flex justify-between pb-6 mt-10 border-b border-k-border-2-color">
						<h1 className="text-base font-medium">
							آخرین تجربیات ثبت شده توسط امیر خوراکیان
						</h1>
					</div>
					{experience.data.map((item, index) => (
						<ExperienceBrief
							key={item._id}
							experience={item}
							handleLike={() => handleContentLike(item._id, index)}
						/>
					))}
				</div>
			</main>
			<div className="max-w-5xl mx-auto">
				<Footer
					{...defaultTextsObject}
					footer_image={defaultImagesObject?.footer_image}
					socialMedias={socialMedias}
				/>
			</div>
		</>
	);
};

export default memo(Experience);
