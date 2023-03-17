import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  //states

  //hooks

  //effects

  //function

  return (
    <>
      <Helmet>
        <title>داشبورد | سامانه Level Up</title>
      </Helmet>
      <TcCard>
        <TcPageTitle title='داشبورد' />
      </TcCard>
    </>
  );

  // return (
  //   <div className='relative flex-grow-0 pt-6 mx-auto mb-8 text-right'>
  //     <Helmet>
  //       <title>داشبورد | سامانه Level Up</title>
  //     </Helmet>
  //     {hasAccessTo(false) && <AdminDashboard />}
  //     {hasAccessTo(roles.ticket?.dashboard) && <TicketDashboard />}
  //     {hasAccessTo(roles.dashboard?.transportation) && <TransportationDashboard />}
  //     {hasAccessTo(roles.dashboard?.branch) && <BranchDashboard />}
  //     {/* <MyBranchSheba /> */}
  //   </div>
  // );
};

export default Dashboard;
