export const mobileNumberInputValidation = (value: string) => {
  	let error;
			if (!value) {
				error = "شماره موبایل وارد نشده";
			} else if (value.length !== 11) {
				error = "شماره موبایل ۱۱ رقم، مثال : ۰۹۱۲۳۴۵۶۷۸۹";
			}
			return error;
}
export const passwordInputValidation = (value: string) => {
  	let error;
			if (!value) {
				error = "رمز عبور وارد نشده";
			} else if (value.length < 8) {
				error = "رمز عبور حداقل ۸ کاراکتر";
			}
			return error;
}
export const repeatPasswordInputValidation = (
	value: string,
	password: string
) => {
	let error;
	if (!value) {
		error = "رمز عبور وارد نشده";
	} else if (value !== password) {
		error = "تکرار رمز به درستی وارد نشده";
	}
	return error;
};

export const stringInputValidation = ({ value, name, min }: { value:string; name: string; min?: number; max?: number; }) => {
	let error;
	
	if (!value) 	error = name + " وارد نشده"
	
	if(value && min && value.length < min) error = `${name} باید حداقل ${min} کاراکتر باشد.`
	
}