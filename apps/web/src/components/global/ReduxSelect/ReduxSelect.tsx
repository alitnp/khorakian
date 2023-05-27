import { store } from "@/redux/store";
import { Select, SelectProps } from "antd";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

interface IReduxSelect extends SelectProps {
	value?: string | number | undefined | null;
	labelPropertyName?: string;
	reducerName: string;
	reducerListProperty: string;
	getlist: any;
	onChange?: (_a: string | number) => void;
	onChangeFullInfo?: (_a: any) => void;
	underValue?: boolean;
}

const ReduxSelect: FC<IReduxSelect> = ({
	value,
	reducerName,
	reducerListProperty,
	underValue,
	onChange,
	onChangeFullInfo,
	getlist,
	labelPropertyName = "title",
	...props
}) => {
	//states
	const state = useSelector(
		(state: any) => state[reducerName]
	);
	const optionsList = underValue
		? state.value[reducerListProperty]
		: state[reducerListProperty];

	//effect
	useEffect(() => {
		!optionsList && store.dispatch(getlist());
	}, []);

	//functions
	const handleChange = (e: any) => {
		onChange && onChange(e);
		if (onChangeFullInfo) {
			const item = optionsList?.find(
				(item: any) => item._id == e
			);
			onChangeFullInfo({
				...item,
				label: item.title,
				value: item._id,
			});
		}
	};

	return (
		<Select
			showSearch
			allowClear
			loading={!optionsList}
			placeholder="انتخاب کنید"
			optionFilterProp="children"
			options={optionsList?.map((item: any) => ({
				label: item[labelPropertyName],
				value: item._id + "",
			}))}
			{...props}
			onChange={handleChange}
		/>
	);
};

export default ReduxSelect;
