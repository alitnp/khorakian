import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import DashboardUserIdea from "@/components/dashboard/dashboardIdea/DashboardUserIdea";
import DashboardLayout from "@/components/global/Layout/components/DashboardLayout";
import { FC, useCallback, useState } from "react";

const DashboardIdea: FC = () => {
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
				title="ایده های من"
				moreContent={
					<span
						className="text-sm font-normal cursor-pointer text-k-primary-color"
						onClick={toggleCreateModal}
					>
						+ ثبت ایده جدید
					</span>
				}
			/>

			<DashboardUserIdea
				visible={showCreateModal}
				toggleCreateModal={toggleCreateModal}
			/>
		</DashboardLayout>
	);
};

export default DashboardIdea;
