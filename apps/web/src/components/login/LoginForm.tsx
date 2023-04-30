import { Button, Form, Input } from "antd";
import { FC } from "react";

interface ILoginForm {}

const LoginForm: FC<ILoginForm> = ({}) => {
	return (
		<div className="px-4 pb-4 sm:py-4 sm:px-6">
			<Form
				dir="vertical"
				labelCol={{ span: 5 }}
				labelAlign="left"
				size="large"
			>
				<Form.Item label="شماره موبایل" name="mobileNumber">
					<Input placeholder="شماره موبایل" />
				</Form.Item>
				<Form.Item label="رمز عبور" name="password">
					<Input placeholder="رمز عبور" />
				</Form.Item>
				<Button type="primary">ورود</Button>
			</Form>
		</div>
	);
};

export default LoginForm;