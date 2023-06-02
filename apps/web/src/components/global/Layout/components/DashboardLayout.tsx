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
			<div className="flex flex-col gap-6 py-10 mx-auto md:flex-row max-w-7xl k-container">
				<DashboardSideBar />
				<div className="relative w-full px-3 pt-2 pb-10 border rounded-lg shadow-lg sm:px-6 bg-k-bg-color">
					{children}
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
