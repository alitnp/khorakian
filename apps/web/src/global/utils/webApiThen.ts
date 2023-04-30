import { message } from "antd";

type props = {
	res: any;
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
}: props) => {
	if (res.isSuccess) {
		if (notifSuccess) {
			const resMessage =
				typeof notifSuccess === "string"
					? notifSuccess
					: "عملیات با موفقیت انجام شد.";
			message.success(resMessage);
		}
		onSuccess(dataOnly ? res.data : res);
	} else {
		notifFail &&
			message.error(res?.message || "درخواست انجام نشد");
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
	onSuccess?: (_res: T) => void;
	onSuccessData?: (_data: D) => void;
	notifSuccess?: boolean | string;
	notifFail?: boolean;
	onFailed?: () => void;
	setLoading?: (_a: boolean) => void;
}
export const webApiThenGeneric = <T, D>({
	res,
	onSuccess,
	onSuccessData,
	notifSuccess = true,
	notifFail = true,
	onFailed,
	setLoading,
}: genericProps<T, D>) => {
	if (res.isSuccess) {
		if (notifSuccess) {
			const resMessage =
				typeof notifSuccess === "string"
					? notifSuccess
					: "عملیات با موفقیت انجام شد.";
			message.success(resMessage);
		}
		onSuccess && onSuccess(res);
		onSuccessData && onSuccessData(res.data);
	} else {
		notifFail &&
			message.error(res?.message || "درخواست انجام نشد");
		onFailed && onFailed();
	}
	setLoading && setLoading(false);
};

export const webApiCatch = (errorResponse: any) => {
	if (errorResponse?.error?.data?.message)
		message.error(
			errorResponse?.error?.data?.message ||
				"درخواست انجام نشد"
		);
};
