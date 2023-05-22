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
		<div className="min-h-screen bg-k-grey-bg-1-color">
			<div className="flex gap-6 py-10 mx-auto max-w-7xl k-container">
				<DashboardSideBar />
				<div className="w-full px-6 py-2 border rounded-lg shadow-lg bg-k-bg-color">
					{children}
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
