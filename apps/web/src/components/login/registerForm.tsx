import MyButton from "@/components/basicUi/MyButton";
import { Form, Input, message } from "antd";
import { FC, useCallback, useState } from "react";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import {
	webApiCatch,
	webApiThenGeneric,
} from "@/global/utils/webApiThen";
import { setCookie } from "cookies-next";
import { ApiDataResponse, IUserRead } from "@my/types";
import { useDispatch } from "react-redux";
import {
	setUser,
	setUserLoggedIn,
} from "@/redux/reducers/user/userReducer";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import webRoutes from "@/global/constants/webRoutes";

type registerResponse = IUserRead & { token: string };
type registerInputs = {
	mobileNumber: string;
	password: string;
	repeatPassword: string;
	fullName: string;
};

const RegisterForm: FC = () => {
	//state
	const [loading, setLoading] = useState<boolean>(false);

	//hooks
	const dispatch: AppDispatch = useDispatch();
	const { push } = useRouter();

	//functions
	const handleSubmit = useCallback(
		async (values: registerInputs) => {
			if (values.repeatPassword !== values.password)
				return message.error("تکرار رمز به درستی وارد نشده.");
			setLoading(true);
			await WebApiService.post(webEndpointUrls.userRegister, {
				mobileNumber: values.mobileNumber,
				password: values.password,
				fullName: values.fullName,
			})
				.then((res: ApiDataResponse<registerResponse>) =>
					webApiThenGeneric<
						ApiDataResponse<registerResponse>,
						registerResponse
					>({
						res,
						onSuccessData: (data) => {
							const { token, ...user } = data;
							setCookie("token", token);
							dispatch(setUser(user));
							dispatch(setUserLoggedIn(true));
							push(webRoutes.home.path);
						},
						notifFail: true,
						notifSuccess: true,
					})
				)
				.catch(() => webApiCatch(errorResponse));
			setLoading(false);
		},
		[]
	);

	return (
		<div className="px-4 pt-6 pb-4 sm:px-6">
			<Form
				labelCol={{ span: 6 }}
				labelAlign="left"
				requiredMark={false}
				onFinish={handleSubmit}
			>
				<Form.Item
					label="شماره موبایل"
					name="mobileNumber"
					rules={[
						{ required: true, message: "شماره همراه وارد نشده" },
						{
							min: 11,
							max: 11,
							message: "شماره همراه ۱۱ رقم، مثال : ۰۹۱۲۳۴۵۶۷۸۹",
						},
					]}
				>
					<Input placeholder="شماره موبایل" />
				</Form.Item>
				<Form.Item
					label="نام و نام خانوادگی"
					name="fullName"
					rules={[
						{
							required: true,
							message: "نام و نام خانوادگی وارد نشده",
						},
					]}
				>
					<Input placeholder="نام و نام خانوادگی" />
				</Form.Item>
				<Form.Item
					label="رمز عبور"
					name="password"
					rules={[
						{ required: true, message: "رمز عبور وارد نشده" },
						{
							min: 8,
							max: 255,
							message: "رمز عبور حداقل ۸ کاراکتر",
						},
					]}
				>
					<Input.Password placeholder="رمز عبور" />
				</Form.Item>
				<Form.Item
					label="تکرار رمز"
					name="repeatPassword"
					rules={[
						{ required: true, message: "تکرار رمز وارد نشده" },
						{
							min: 8,
							max: 255,
							message: "تکرار رمز حداقل ۸ کاراکتر",
						},
					]}
				>
					<Input.Password placeholder="تکرار رمز" />
				</Form.Item>
				<div className="flex justify-end pt-6">
					<MyButton
						type="primary"
						htmlType="submit"
						loading={loading}
					>
						ورود
					</MyButton>
				</div>
			</Form>
		</div>
	);
};

export default RegisterForm;
