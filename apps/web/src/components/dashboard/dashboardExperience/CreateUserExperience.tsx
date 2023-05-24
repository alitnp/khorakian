import MyButton from "@/components/basicUi/MyButton";
import Loading from "@/components/global/Loading/Loading";
import ReduxSelect from "@/components/global/ReduxSelect/ReduxSelect";
import webRoutes from "@/global/constants/routes";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThen,
} from "@/global/utils/webApiThen";
import { getAllExperienceCategories } from "@/redux/reducers/categories/getAllExperienceCategories";
import {
	ApiDataResponse,
	IUserExperience,
} from "@my/types";
import { Form, Input, Modal } from "antd";
import { useRouter } from "next/router";
import { FC, useState } from "react";

interface ICreateUserExperience {
	visible: boolean;
	close: () => void;
}

const CreateUserExperience: FC<ICreateUserExperience> = ({
	visible,
	close,
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
					onSuccess: () =>
						push(webRoutes.dashboardExperience.path),
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
			title="ثبت تجربه من"
		>
			<div className="pt-6">
				<Form
					form={form}
					onFinish={handleSubmit}
					requiredMark={false}
					validateTrigger="submit"
					layout="vertical"
				>
					<Form.Item
						name="title"
						label="عنوان"
						rules={[
							{
								required: true,
								message: "عنوان تجربه وارد نشده.",
							},
						]}
					>
						<Input placeholder="عنوان" />
					</Form.Item>
					<Form.Item
						name="experienceCategory"
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
							reducerListProperty="experienceCategoryList"
							getlist={getAllExperienceCategories}
						/>
					</Form.Item>
					<Form.Item
						name="text"
						label="شرح"
						rules={[
							{
								required: true,
								message: "شرح تجربه وارد نشده.",
							},
						]}
					>
						<Input.TextArea placeholder="شرح" rows={5} />
					</Form.Item>
					<div className="flex justify-end">
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

export default CreateUserExperience;
