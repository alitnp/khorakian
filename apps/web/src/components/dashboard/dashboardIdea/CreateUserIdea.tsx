import MyButton from "@/components/basicUi/MyButton";
import Loading from "@/components/global/Loading/Loading";
import ReduxSelect from "@/components/global/ReduxSelect/ReduxSelect";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThen,
} from "@/global/utils/webApiThen";
import { getAllIdeaCategories } from "@/redux/reducers/categories/getAllIdeaCategories";
import {
	ApiDataResponse,
	IUserExperience,
} from "@my/types";
import { Form, Input, Modal } from "antd";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";

interface ICreateUserIdea {
	visible: boolean;
	close: () => void;
	refetch: () => void;
}

const CreateUserIdea: FC<ICreateUserIdea> = ({
	visible,
	close,
	refetch,
}) => {
	//state
	const [loading, setLoading] = useState<boolean>(false);

	//hooks
	const [form] = Form.useForm();
	const { push } = useRouter();

	//functions
	const handleSubmit = async (values: any) => {
		setLoading(true);
		await WebApiService.post(
			webEndpointUrls.createUserExperience,
			values
		)
			.then((res: ApiDataResponse<IUserExperience>) =>
				webApiThen({
					res,
					notifFail: true,
					notifSuccess: true,
					onSuccess: () => {
						refetch();
						close();
					},
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setLoading(false);
	};

	return (
		<Modal
			open={visible}
			onCancel={close}
			footer={false}
			title="ثبت ایده من"
		>
			<div className="pt-6">
				<Form
					form={form}
					onFinish={handleSubmit}
					requiredMark={false}
					layout="vertical"
				>
					<Form.Item
						name="title"
						label="عنوان"
						rules={[
							{
								required: true,
								message: "عنوان ایده وارد نشده.",
							},
						]}
					>
						<Input placeholder="عنوان" />
					</Form.Item>
					<Form.Item
						name="ideaCategory"
						label="دسته بندی"
						rules={[
							{
								required: true,
								message: "دسته بندی تعیین نشده.",
							},
						]}
					>
						<ReduxSelect
							reducerName="categories"
							reducerListProperty="ideaCategoryList"
							getlist={getAllIdeaCategories}
						/>
					</Form.Item>
					<Form.Item
						name="text"
						label="شرح"
						rules={[
							{
								required: true,
								message: "شرح ایده وارد نشده.",
							},
						]}
					>
						<Input.TextArea placeholder="شرح" rows={5} />
					</Form.Item>
					<p className="mt-4">
						<BiInfoCircle className="inline" /> توجه داشته باشید،
						تمام ایده های ثبت شده توسط ادمین بررسی و در صورت تایید
						در سامانه منتشر می شود تا با دیگر کاربران اشتراک گذاری
						و مورد بحث گفتگو قرار گیرد.
					</p>
					<div className="flex justify-end mt-6">
						<MyButton type="primary" htmlType="submit">
							ثبت
						</MyButton>
					</div>
				</Form>
			</div>
			{loading && <Loading />}
		</Modal>
	);
};

export default CreateUserIdea;
