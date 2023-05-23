import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import DashboardLayout from "@/components/global/Layout/components/DashboardLayout";
import { FC } from "react";

const DashboardExperience: FC = () => {
	return (
		<DashboardLayout>
			<DashboardPageTitle
				title="تجربیات من"
				moreContent={
					<span className="text-sm font-normal cursor-pointer text-k-primary-color">
						+ ثبت تجربه جدید
					</span>
				}
			/>
			<div>
				<span>تجربه ای دارید که </span>
			</div>
		</DashboardLayout>
	);
};

export default DashboardExperience;
