import MyButton from "@/components/basicUi/MyButton";
import Loading from "@/components/global/Loading/Loading";
import ReduxSelect from "@/components/global/ReduxSelect/ReduxSelect";
import webRoutes from "@/global/constants/webRoutes";
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
	IUserExperienceRead,
} from "@my/types";
import { Form, Input, Modal } from "antd";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";

interface ICreateUserExperience {
	userExperience: IUserExperienceRead;
	visible: boolean;
	close: () => void;
	refetch: (_id: string) => void;
}

const EditUserExperience: FC<ICreateUserExperience> = ({
	userExperience,
	visible,
	close,
	refetch,
}) => {
	//state
	const [loading, setLoading] = useState<boolean>(false);

	//hooks
	const [form] = Form.useForm();

	//effects
	useEffect(() => {
		userExperience &&
			form.setFieldsValue({
				title: userExperience.title,
				text: userExperience.text,
				experienceCategory:
					userExperience.experienceCategory._id + "",
			});
	}, [userExperience]);

	//functions
	const handleSubmit = async (values: any) => {
		setLoading(true);
		await WebApiService.put(
			webEndpointUrls.userExperienceEdit(userExperience._id),
			values
		)
			.then((res: ApiDataResponse<IUserExperience>) =>
				webApiThen({
					res,
					notifFail: true,
					notifSuccess: true,
					onSuccess: () => {
						refetch(userExperience._id);
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
			title="ویرایش تجربه من"
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
					<p className="mt-4">
						<BiInfoCircle className="inline" /> توجه داشته باشید،
						تمام تجربیات ثبت شده توسط ادمین بررسی و در صورت تایید
						در سامانه منتشر می شود تا با دیگر کاربران اشتراک گذاری
						و مورد بحث گفتگو قرار گیرد.
					</p>
					<div className="flex justify-end mt-6">
						<MyButton type="primary" htmlType="submit">
							ویرایش
						</MyButton>
					</div>
				</Form>
			</div>
			{loading && <Loading />}
		</Modal>
	);
};

export default EditUserExperience;
