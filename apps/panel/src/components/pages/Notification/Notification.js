import NotificationList from 'components/pages/Notification/list/NotificationList';
import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import routes from 'global/Constants/routes';

const Notification = () => {
  return (
    <>
      <TcCard>
        <TcPageTitle title='اعلان ها' buttonText='ایجاد اعلان' to={routes.notificationCreate.path} />
        <NotificationList />
      </TcCard>
    </>
  );
};

export default Notification;
