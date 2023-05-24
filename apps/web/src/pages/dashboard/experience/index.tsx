import MyButton from "@/components/basicUi/MyButton";
import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import DashboardUserExperience from "@/components/dashboard/dashboardExperience/DashboardUserExperience";
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
			<div className="flex flex-col items-center gap-4 py-10">
				<span className="text-sm">
					تجربه ای برای درمیان گذاشتن با امیر خوراکیان یا اشتراک
					در سایت دارید؟
				</span>
				<MyButton size="small">ثبت تجربه جدید</MyButton>
			</div>
			<DashboardUserExperience />
		</DashboardLayout>
	);
};

export default DashboardExperience;
