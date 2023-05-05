import {
	ApiDataResponse,
	IPostRead,
} from "@my/types";
import { memo, useEffect, useState } from "react";
import PostDetailSlider from "@/components/post/postDetail/PostDetailSlider";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { useRouter } from "next/router";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThenGeneric,
} from "@/global/utils/webApiThen";
import AllCommentTabs from "@/components/post/postDetail/comments/AllCommentTabs";
import PostDetailDescription from "@/components/post/postDetail/PostDetailDescription";

const PostDetail = () => {
	//state
	const [postDetailsList, setPostDetailsList] =
		useState<IPostRead>();
	const [loading, setLoading] = useState<boolean>(false);

	//hook
	const { query } = useRouter();

	//effect
	useEffect(() => {
		query?.id && getPostDetail(query.id as string);
		console.log(query.id);
	}, [query]);

	//func
	const getPostDetail = async (id: string) => {
		setLoading(true);
		await WebApiService.get(webEndpointUrls.getPostDetail(id))
			.then((res: ApiDataResponse<IPostRead>) =>
				webApiThenGeneric<
					ApiDataResponse<IPostRead>,
					IPostRead
				>({
					res,
					onSuccessData: (data) => {
						setPostDetailsList(data);
					},
					notifFail: true,
					notifSuccess: true,
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setLoading(false);
	};

	return (
		<main>
			{postDetailsList && (
				<PostDetailSlider images={postDetailsList.images} />
			)}
			<PostDetailDescription />
			<div className="w-full my-5">
				<AllCommentTabs />
			</div>
		</main>
	);
};

export default memo(PostDetail);
