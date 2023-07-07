import MyButton from "@/components/basicUi/MyButton";
import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import Loading from "@/components/global/Loading/Loading";
import webRoutes from "@/global/constants/webRoutes";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import {
	webApiCatch,
	webApiThen,
} from "@/global/utils/webApiThen";
import { logout } from "@/redux/reducers/user/userReducer";
import { store } from "@/redux/store";
import { Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { FC, useState } from "react";

const UserChangePassword: FC = () => {
	//states
	const [loading, setLoading] = useState<boolean>(false);

	//hooks
	const [form] = Form.useForm();
	const { push } = useRouter();

	//functions
	const handleSubmit = async (values: any) => {
		if (values.newPassword !== values.repeatPassword)
			return message.error("تکرار رمز بدرستی وارد نشده.");
		setLoading(true);
		await WebApiService.put(
			webEndpointUrls.userChangePassword,
			{
				currentPassword: values.currentPassword,
				newPassword: values.newPassword,
			}
		)
			.then((res: any) =>
				webApiThen({
					res,
					notifFail: true,
					notifSuccess: true,
					onSuccess: () => {
						store.dispatch(logout());
						push(webRoutes.login.path);
					},
				})
			)
			.catch(() => webApiCatch(errorResponse));
		setLoading(false);
		return;
	};

	return (
		<div className="relative my-4">
			<DashboardPageTitle title="تغییر رمز" />
			<Form
				form={form}
				className="max-w-lg mx-auto mt-4"
				validateTrigger="submit"
				requiredMark={false}
				onFinish={handleSubmit}
			>
				<Form.Item
					name="currentPassword"
					label="رمز فعلی"
					rules={[
						{
							required: true,
							message: "رمز فعلی وارد نشده",
						},
						{
							min: 8,
							max: 255,
							message: "رمز عبور حداقل ۸ کاراکتر",
						},
					]}
				>
					<Input type="password" placeholder="رمز فعلی" />
				</Form.Item>
				<Form.Item
					name="newPassword"
					label="رمز جدید"
					rules={[
						{ required: true, message: "رمز جدید وارد نشده" },
						{
							min: 8,
							max: 255,
							message: "رمز عبور حداقل ۸ کاراکتر",
						},
					]}
				>
					<Input type="password" placeholder="رمز جدید" />
				</Form.Item>
				<Form.Item
					name="repeatPassword"
					label="تکرار رمز"
					rules={[
						{
							required: true,
							message: "تکرار رمز وارد نشده",
						},
						{
							min: 8,
							max: 255,
							message: "رمز عبور حداقل ۸ کاراکتر",
						},
					]}
				>
					<Input type="password" placeholder="تکرار رمز" />
				</Form.Item>
				<div className="flex justify-end mt-4">
					<MyButton type="primary" htmlType="submit">
						تغییر رمز
					</MyButton>
				</div>
			</Form>
			{loading && <Loading />}
		</div>
	);
};

export default UserChangePassword;
