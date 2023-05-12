import DashboardSideBar from "@/components/global/Layout/components/DashboardSideBar";
import { RootState } from "@/redux/store";
import { FC, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

interface IDashboardLayout {
	children: ReactNode;
}

const DashboardLayout: FC<IDashboardLayout> = ({
	children,
}) => {
	return (
		<div>
			<DashboardSideBar />
			{children}
		</div>
	);
};

export default DashboardLayout;
