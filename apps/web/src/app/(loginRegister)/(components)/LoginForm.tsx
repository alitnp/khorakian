"use client";

import MyButton from "@/components/basicUI/MyButton";
import {
	mobileNumberInputValidation,
	passwordInputValidation,
} from "@/global/utils/formValidations";
import { englishNumberOnly } from "@/global/utils/helperFunctions";
import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	useToast,
} from "@chakra-ui/react";
import {
	Formik,
	Form,
	Field,
	FieldInputProps,
	FormikProps,
	FormikHelpers,
} from "formik";
import { FC } from "react";
import { BiPhone } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import {
	webApiCatch,
	webApiThen,
} from "@/global/utils/webApiThen";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import routes  from '@/global/constants/routes';

type loginForm = {
	mobileNumber: string;
	password: string;
};

const LoginForm: FC = () => {
	//hooks
	const toast = useToast();
	const {push} = useRouter()

	//functions
	const handleLogin = async (
		values: loginForm,
		actions: FormikHelpers<loginForm>
	) => {
		actions.setSubmitting(true);
		await WebApiService.post(
			webEndpointUrls.userLogin,
			values
		)
			.then((res: any) =>
				webApiThen({
					res,
					onSuccess: (data: any) => {
						setCookie("token", data.data.token);
						push(routes.home.path)
					}
					
				})
			)
			.catch(() => webApiCatch(errorResponse, toast));
		actions.setSubmitting(false);
	};

	return (
		<div>
			<Formik
				initialValues={{ mobileNumber: "", password: "" }}
				onSubmit={handleLogin}
			>
				{(props) => (
					<Form>
						<Field
							name="mobileNumber"
							validate={mobileNumberInputValidation}
						>
							{({
								field,
								form,
							}: {
								field: FieldInputProps<string>;
								form: FormikProps<loginForm>;
							}) => (
								<FormControl
									isInvalid={
										!!(
											form.errors.mobileNumber &&
											form.touched.mobileNumber
										)
									}
								>
									<FormLabel>شماره موبایل</FormLabel>
									<InputGroup>
										<InputLeftElement>
											<BiPhone />
										</InputLeftElement>
										<Input
											{...field}
											onChange={(e) => {
												form.setFieldValue(
													"mobileNumber",
													englishNumberOnly(e.target.value)
												);
											}}
											placeholder="شماره موبایل"
											variant="filled"
										/>
									</InputGroup>
									<FormHelperText className="text-right">
										مثال : ۸۹ ۶۷ ۳۴۵ ۰۹۱۲
									</FormHelperText>
									<FormErrorMessage>
										{form.errors.mobileNumber}
									</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field
							name="password"
							validate={passwordInputValidation}
						>
							{({
								field,
								form,
							}: {
								field: FieldInputProps<string>;
								form: FormikProps<loginForm>;
							}) => (
								<FormControl
									isInvalid={
										!!(form.errors.password && form.touched.password)
									}
								>
									<FormLabel>رمز عبور</FormLabel>
									<InputGroup>
										<InputLeftElement>
											<RiLockPasswordLine />
										</InputLeftElement>
										<Input
											{...field}
											type="password"
											placeholder="زمر عبور"
											variant="filled"
										/>
									</InputGroup>
									<FormHelperText className="text-right">
										رمز عبور حداقل ۸ کاراکتر
									</FormHelperText>
									<FormErrorMessage>
										{form.errors.password}
									</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<div className="flex justify-end">
							<MyButton
								isLoading={props.isSubmitting}
								type="submit"
								className="mt-6"
							>
								ورود
							</MyButton>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default LoginForm;
