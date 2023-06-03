import React, {
	FC,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Tabs } from "antd";
import AllComments from "@/components/post/postDetail/comments/AllComments";
import {
	ApiDataListResponse,
	IGlobalCommentRead,
} from "@my/types";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThenGeneric,
} from "@/global/utils/webApiThen";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import FirstCommentBox from "@/components/post/postDetail/comments/FirstCommentBox";

interface IProps {
	endPointUrlGetAllComments: string;
	endPointUrlGetAllAdminComments: string;
	endPointUrlGetAllMyComments: string;
	parentId: number | string;
	commentCreateUrl: string;
	commentReplyUrl: string;
}

type adminComment = {
	tabInfo: { fullName: string; _id: string };
	tabBody: IGlobalCommentRead[];
};

const AllCommentTabs: FC<IProps> = ({
	endPointUrlGetAllComments,
	endPointUrlGetAllAdminComments,
	endPointUrlGetAllMyComments,
	parentId,
	commentCreateUrl,
	commentReplyUrl,
}) => {
	//state
	const [_loading, setLoading] = useState<boolean>(false);
	const [comments, setComments] =
		useState<IGlobalCommentRead[]>();
	const [adminComments, setAdminComments] =
		useState<IGlobalCommentRead[]>();
	const [myComments, setMyComments] =
		useState<IGlobalCommentRead[]>();
	const { user } = useSelector(
		(state: RootState) => state.user
	);

	//effect
	useEffect(() => {
		getComments(
			endPointUrlGetAllAdminComments +
				"?pageSize=50&content=" +
				parentId,
			setAdminComments
		);
		getComments(
			endPointUrlGetAllComments +
				"?pageSize=100&content=" +
				parentId,
			setComments
		);
	}, []);
	useEffect(() => {
		user &&
			getComments(
				endPointUrlGetAllMyComments + "/" + parentId,
				setMyComments
			);
	}, [user]);

	//func
	const getComments = async (
		url: string,
		callBack: React.Dispatch<
			React.SetStateAction<IGlobalCommentRead[] | undefined>
		>
	) => {
		setLoading(true);
		await WebApiService.get(url)
			.then((res: ApiDataListResponse<IGlobalCommentRead>) =>
				webApiThenGeneric<
					ApiDataListResponse<IGlobalCommentRead>,
					IGlobalCommentRead[]
				>({
					res,
					notifFail: false,
					notifSuccess: false,
					onSuccessData: callBack,
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setLoading(false);
	};

	const onChange = (key: string) => {
		console.log(key);
	};
	//seprate admins tab
	const tabComments = useMemo(() => {
		const temptabComments: adminComment[] = [];
		adminComments?.map((comment) => {
			if (
				!temptabComments.some(
					(adComm) => adComm.tabInfo._id === comment.user._id
				)
			)
				temptabComments.push({
					tabInfo: {
						fullName: comment.user.fullName,
						_id: comment.user._id,
					},
					tabBody: [],
				});
			const thisCommentAdminIndex = temptabComments.findIndex(
				(addComm) => addComm.tabInfo._id === comment.user._id
			);
			temptabComments[thisCommentAdminIndex].tabBody.push(
				comment
			);
		});
		return temptabComments;
	}, [adminComments]);

	const refetch = () => {
		user &&
			getComments(
				endPointUrlGetAllMyComments + "/" + parentId,
				setMyComments
			);
		getComments(
			endPointUrlGetAllAdminComments +
				"?pageSize=50&content=" +
				parentId,
			setAdminComments
		);
		getComments(
			endPointUrlGetAllComments +
				"?pageSize=100&content=" +
				parentId,
			setComments
		);
	};

	const adminCommentTabs = useMemo(() => {
		return tabComments.map((tabComment) => ({
			label: tabComment.tabInfo.fullName,
			key: tabComment.tabInfo._id,
			children: (
				<AllComments
					refetch={refetch}
					comments={tabComment.tabBody}
					parentId={parentId}
					commentCreateUrl={commentCreateUrl}
					commentReplyUrl={commentReplyUrl}
				/>
			),
		}));
	}, [tabComments]);

	const commentsTabs = [
		{
			label: "همه",
			key: "ALL",
			children: (
				<AllComments
					comments={comments}
					parentId={parentId}
					refetch={refetch}
					commentCreateUrl={commentCreateUrl}
					commentReplyUrl={commentReplyUrl}
				/>
			),
		},
		...(user
			? [
					{
						label: "نظرات من",
						key: "MYCOMMENT",
						children: (
							<AllComments
								comments={myComments}
								parentId={parentId}
								refetch={refetch}
								commentCreateUrl={commentCreateUrl}
								commentReplyUrl={commentReplyUrl}
							/>
						),
					},
			  ]
			: []),
		...adminCommentTabs,
	];

	if (
		!comments?.length &&
		!myComments?.length &&
		!adminComments?.length
	)
		return (
			<FirstCommentBox
				refetch={refetch}
				commentCreateUrl={commentCreateUrl}
				parentId={parentId}
			/>
		);

	return (
		<>
			<Tabs
				onChange={onChange}
				className="max-w-screen-lg m-auto "
				type="card"
				items={commentsTabs}
			/>
		</>
	);
};
export default AllCommentTabs;
