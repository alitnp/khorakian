import MyButton from "@/components/basicUi/MyButton";
import webRoutes from "@/global/constants/webRoutes";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThen,
} from "@/global/utils/webApiThen";
import {
	ApiDataResponse,
	ICommentReplyRead,
} from "@my/types";
import { Modal, ModalProps, Form, Input } from "antd";
import { useRouter } from "next/router";
import { FC, useState } from "react";

interface ITcModal extends ModalProps {
	title: string;
	refetch?: () => void;
	endPointUrl: string;
	route?: string;
	close?: () => void;
	visible: boolean;
}

const AddCommentModal: FC<ITcModal> = ({
	children,
	title,
	visible,
	close,
	refetch,
	endPointUrl,
	route,
	...props
}) => {
	//state
	const [_loading, setLoading] = useState<boolean>(false);

	//hooks
	const [form] = Form.useForm();
	const { push } = useRouter();

	//func
	const handleSubmit = async (values: any) => {
		setLoading(true);
		await WebApiService.post(endPointUrl, values)
			.then((res: ApiDataResponse<ICommentReplyRead>) =>
				webApiThen({
					res,
					notifFail: true,
					notifSuccess: true,
					onSuccess: () => {
						route && push(webRoutes.route.path),
							refetch && refetch,
							close;
					},
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setLoading(false);
	};

	return (
		<Modal
			centered
			destroyOnClose
			open={visible}
			onCancel={close}
			footer={false}
			{...props}
			title={<p className="mb-0">{title}</p>}
		>
			<div className="pt-2 border-t border-t-border-color-base">
				<Form
					form={form}
					onFinish={handleSubmit}
					requiredMark={false}
					validateTrigger="submit"
					layout="vertical"
				>
					<Form.Item
						name="text"
						label="توضیحات"
						rules={[
							{
								required: true,
								message: " توضیحات وارد نشده.",
							},
						]}
					>
						<Input.TextArea placeholder="توضیحات" rows={5} />
					</Form.Item>
					<div className="flex justify-end">
						<MyButton
							className="mt-2"
							type="primary"
							htmlType="submit"
						>
							ارسال
						</MyButton>
					</div>
				</Form>
			</div>
		</Modal>
	);
};

export default AddCommentModal;
