import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import DashboardUserExperience from "@/components/dashboard/dashboardExperience/DashboardUserExperience";
import DashboardLayout from "@/components/global/Layout/components/DashboardLayout";
import { FC, useCallback, useState } from "react";

const DashboardExperience: FC = () => {
	//state
	const [showCreateModal, setShowCreateModal] =
		useState<boolean>(false);

	//functions
	const toggleCreateModal = useCallback(
		() => setShowCreateModal((prevState) => !prevState),
		[]
	);

	return (
		<DashboardLayout>
			<DashboardPageTitle
				title="تجربیات من"
				moreContent={
					<span
						className="text-sm font-normal cursor-pointer text-k-primary-color"
						onClick={toggleCreateModal}
					>
						+ ثبت تجربه جدید
					</span>
				}
			/>

			<DashboardUserExperience
				visible={showCreateModal}
				toggleCreateModal={toggleCreateModal}
			/>
		</DashboardLayout>
	);
};

export default DashboardExperience;
