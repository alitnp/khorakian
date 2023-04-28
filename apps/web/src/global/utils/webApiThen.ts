

type props = {
	res: any;
	toast?: any;
	onSuccess(_a: any): void;
	dataOnly?: boolean;
	notifSuccess?: boolean | string;
	notifFail?: boolean;
	onFailed?: () => void;
	setLoading?: (_a: boolean) => void;
};

export const webApiThen = ({
	res,
	onSuccess,
	dataOnly = false,
	notifSuccess = true,
	notifFail = true,
	onFailed,
	setLoading,
	toast
}: props) => {

	if (res.isSuccess) {
		if (toast && notifSuccess) {
			const message =
				typeof notifSuccess === "string"
					? notifSuccess
					: "عملیات با موفقیت انجام شد.";
			toast({variant: "subtle",
				title: message,
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		}
		onSuccess(dataOnly ? res.data : res);
	} else {
		toast &&
			notifFail &&
			toast({			variant: "subtle",
				title:res?.message|| "درخواست انجام نشد",
				status: "warning",
				duration: 5000,
				isClosable: true,
			});
		onFailed && onFailed();
	}
	setLoading && setLoading(false);
};
interface genericProps<T, D> {
	res: T & {
		isSuccess?: boolean;
		message?: string;
		data: D;
	};
	toast?: any;
	onSuccess?: (_res: T) => void;
	onSuccessData?: (_data: D) => void;
	notifSuccess?: boolean|string;
	notifFail?: boolean;
	onFailed?: () => void;
	setLoading?: (_a: boolean) => void;
}
export const webApiThenGeneric = <T, D>({
	res,
	toast,
	onSuccess,
	onSuccessData,
	notifSuccess = true,
	notifFail = true,
	onFailed,
	setLoading,
}: genericProps<T, D>) => {
	if (res.isSuccess) {
		if (toast && notifSuccess) {
			const message =
				typeof notifSuccess === "string"
					? notifSuccess
					: "عملیات با موفقیت انجام شد.";
			toast({
				variant:'subtle',
				title: message,
				status: "success",
				duration:5000,
				isClosable: true,
			});
		}
		onSuccess && onSuccess(res);
		onSuccessData && onSuccessData(res.data);
	} else {
		toast &&
			notifFail &&
			toast({
				variant: "subtle",
				title: res.message,
				status: "warning",
				duration: 9000,
				isClosable: true,
			});
		onFailed && onFailed();
	}
	setLoading && setLoading(false);
};

export const webApiCatch = (errorResponse: any,toast:any) => {
	if(errorResponse?.error?.data?.message)toast({
		variant: "subtle",
		title:  errorResponse?.error?.data?.message || "درخواست انجام نشد",
		status: "warning",
		duration: 5000,
		isClosable: true,		
	});
};
