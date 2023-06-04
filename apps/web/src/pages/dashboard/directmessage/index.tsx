import MyButton from "@/components/basicUi/MyButton";
import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import MessageBubble from "@/components/directMessage/components/MessageBubble";
import MessageOwner from "@/components/directMessage/components/MessageOwner";
import DashboardLayout from "@/components/global/Layout/components/DashboardLayout";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThenGeneric,
} from "@/global/utils/webApiThen";
import {
	ApiDataResponse,
	IDirectMessageRead,
} from "@my/types";
import { Input } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
const { TextArea } = Input;

const DashboardDirectMessage: FC = () => {
	//state
	const [myMessages, setMyMessages] =
		useState<IDirectMessageRead>();
	const [replyText, setReplyText] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	//effect
	useEffect(() => {
		getMessages();
	}, []);

	//functions
	const getMessages = async () => {
		await WebApiService.get(
			webEndpointUrls.directMessagesGetMy
		)
			.then((res: ApiDataResponse<IDirectMessageRead>) =>
				webApiThenGeneric<
					ApiDataResponse<IDirectMessageRead>,
					IDirectMessageRead
				>({
					res,
					notifFail: false,
					notifSuccess: false,
					onSuccessData: setMyMessages,
				})
			)
			.catch(() => {});
	};
	const isActive = (id: string): boolean => {
		return id !== myMessages?.user._id;
	};
	const isRepeated = (index: number): boolean => {
		if (!myMessages) return false;
		if (index === 0)
			return (
				myMessages.replies[0].user._id === myMessages.user._id
			);
		return (
			myMessages.replies[index].user._id ===
			myMessages.replies[index - 1].user._id
		);
	};
	const handleSubmit = () => {
		if (!replyText) return;
		if (!myMessages) return createMessage();
		return replyMessage();
	};
	const createMessage = async () => {
		setLoading(true);
		await WebApiService.post(
			webEndpointUrls.directMessagesCreate,
			{ text: replyText }
		)
			.then((res: ApiDataResponse<IDirectMessageRead>) =>
				webApiThenGeneric<
					ApiDataResponse<IDirectMessageRead>,
					IDirectMessageRead
				>({
					res,
					notifFail: true,
					notifSuccess: false,
					onSuccessData: (data) => {
						setMyMessages(data);
						setReplyText("");
					},
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setLoading(false);
	};
	const replyMessage = async () => {
		setLoading(true);
		await WebApiService.post(
			webEndpointUrls.directMessagesReply +
				"/" +
				myMessages?._id,
			{ text: replyText }
		)
			.then((res: ApiDataResponse<IDirectMessageRead>) =>
				webApiThenGeneric<
					ApiDataResponse<IDirectMessageRead>,
					IDirectMessageRead
				>({
					res,
					notifFail: true,
					notifSuccess: false,
					onSuccessData: (data) => {
						setMyMessages(data);
						setReplyText("");
					},
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setLoading(true);
	};

	const renderMessages = useMemo(() => {
		if (!myMessages) return <></>;
		return (
			<>
				<div className="mb-4">
					<MessageOwner
						isActive={false}
						creationTime={myMessages?.creationDate}
						fullName={myMessages.user.fullName}
						repeatedSender={false}
					/>
					<MessageBubble isActive={false}>
						<span>{myMessages.text}</span>
					</MessageBubble>
				</div>
				{myMessages.replies?.map((message, index) => (
					<div className="mb-4" key={message._id}>
						<MessageOwner
							isActive={isActive(message.user._id)}
							creationTime={message?.creationDate}
							fullName={message.user.fullName}
							repeatedSender={isRepeated(index)}
						/>
						<MessageBubble isActive={isActive(message.user._id)}>
							<span>{message.text}</span>
						</MessageBubble>
					</div>
				))}
			</>
		);
	}, [myMessages]);

	return (
		<DashboardLayout>
			<DashboardPageTitle title="پیام مستقیم" />
			<div className="p-4 mb-4 rounded-lg shadow-inner bg-k-grey-bg-1-color max-h-[60vh] overflow-y-auto">
				{renderMessages}
			</div>
			<div className="flex flex-col">
				<TextArea
					placeholder="ارسال پیام"
					value={replyText}
					onChange={(e) => setReplyText(e.target.value)}
				/>
				<div className="mt-4 mr-auto w-fit">
					<MyButton
						type="primary"
						loading={loading}
						onClick={handleSubmit}
					>
						ارسال پیام
					</MyButton>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default DashboardDirectMessage;
