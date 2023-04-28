"use client";

import MyButton from "@/components/basicUI/MyButton";
import {
	mobileNumberInputValidation,
	passwordInputValidation,
	repeatPasswordInputValidation,
	stringInputValidation,
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
	webApiThenGeneric,
} from "@/global/utils/webApiThen";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ApiDataResponse, IUserRead } from "@my/types";
import { store } from "@/redux/store";
import { setUser } from "@/redux/reducers/user/userReducer";
import webRoutes from "@/global/constants/routes";

type registerForm = {
	mobileNumber: string;
	password: string;
	repeatPassword: string;
	firstName: string;
	lastName: string;
};

const RegisterForm: FC = () => {
	//hooks
	const toast = useToast();
	const { push } = useRouter();


	//functions
	const handleLogin = async (
		values: registerForm,
		actions: FormikHelpers<registerForm>
	) => {
		actions.setSubmitting(true);
		await WebApiService.post(
			webEndpointUrls.userRegister,
			values
		)
			.then(
				(res: ApiDataResponse<IUserRead & { token: string }>) =>
					webApiThenGeneric<
						ApiDataResponse<IUserRead & { token: string }>,
						IUserRead & { token: string }
					>({
						res,
						onSuccessData: (data: any) => {
							const {token ,...user} = data;
							store.dispatch(setUser(user))
							setCookie("token",token);
							push(webRoutes.home.path)
						 },
						notifSuccess:"حساب کاربری شما با موفقیت ایجاد شد."
					})
			)
			.catch(() => webApiCatch(errorResponse, toast));
		actions.setSubmitting(false);
	};

	return (
		<div>
			<Formik
				initialValues={{
					mobileNumber: "",
					password: "",
					repeatPassword: "",
					firstName: "",
					lastName:""
				}}
				onSubmit={handleLogin}
			>
				{(props: FormikProps<registerForm>) => (
					<Form 	className="flex flex-col gap-2">
						<Field
							name="mobileNumber"
							validate={mobileNumberInputValidation}
						>
							{({
								field,
								form,
							}: {
								field: FieldInputProps<string>;
								form: FormikProps<registerForm>;
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
							name="firstName"
							validate={(value: string) =>
								stringInputValidation({
									value,
									name: "نام",
									min: 2,
								})
							}
						>
							{({
								field,
								form,
							}: {
								field: FieldInputProps<string>;
								form: FormikProps<registerForm>;
							}) => (
								<FormControl
									isInvalid={
										!!(
											form.errors.firstName && form.touched.firstName
										)
									}
								>
									<FormLabel>نام</FormLabel>
									<InputGroup>
										<Input
											{...field}
											placeholder="نام"
											variant="filled"
										/>
									</InputGroup>
												<FormHelperText className="text-right">
							
									</FormHelperText>
									<FormErrorMessage>
										{form.errors.firstName}
									</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field
							name="lastName"
							validate={(value: string) =>
								stringInputValidation({
									value,
									name: "نام خانوادگی",
									min: 2,
								})
							}
						>
							{({
								field,
								form,
							}: {
								field: FieldInputProps<string>;
								form: FormikProps<registerForm>;
							}) => (
								<FormControl
									isInvalid={
										!!(
											form.errors.lastName && form.touched.lastName
										)
									}
								>
									<FormLabel>نام خانوادگی</FormLabel>
									<InputGroup>
										<Input
											{...field}
											placeholder="نام خانوادگی"
											variant="filled"
										/>
									</InputGroup>	<FormHelperText className="text-right">
							
									</FormHelperText>
									<FormErrorMessage>
										{form.errors.lastName}
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
								form: FormikProps<registerForm>;
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
						<Field
							name="repeatPassword"
							validate={(value: string) =>
								repeatPasswordInputValidation(
									value,
									props.values.password
								)
							}
						>
							{({
								field,
								form,
							}: {
								field: FieldInputProps<string>;
								form: FormikProps<registerForm>;
							}) => (
								<FormControl
									isInvalid={
										!!(
											form.errors.repeatPassword &&
											form.touched.repeatPassword
										)
									}
								>
									<FormLabel>تکرار رمز</FormLabel>
									<InputGroup>
										<InputLeftElement>
											<RiLockPasswordLine />
										</InputLeftElement>
										<Input
											{...field}
											type="password"
											placeholder="تکرار رمز"
											variant="filled"
										/>
									</InputGroup>
									<FormHelperText className="text-right">
										تکرار رمز بالا
									</FormHelperText>
									<FormErrorMessage>
										{form.errors.repeatPassword}
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
								ایجاد حساب کاربری
							</MyButton>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RegisterForm;
