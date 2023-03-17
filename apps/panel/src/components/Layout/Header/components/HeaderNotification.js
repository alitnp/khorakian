import { Badge, notification, Popover } from 'antd';
import Notifications from 'components/Layout/Header/components/Notifications';
import { BellOutlined } from '@ant-design/icons';
import NotificationDetail from 'components/pages/Notification/components/NotificationDetail';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setMyNotifications } from 'redux/reducer/Notification/notificationReducer';
import { getMyNotifications } from 'redux/reducer/Notification/getMyNotifications';
import TcButton from 'components/UI/Button/TcButton';

const HeaderNotification = () => {
  //states
  const [connection, setConnection] = useState(null);
  const [showNotificationDetail, setShowNotificationDetail] = useState();
  const { userProfile } = useSelector((state) => state.profile);
  const { myNotifications } = useSelector((state) => state.notification);
  const [unSeenNotificationCount, setUnSeenNotificationCount] = useState(0);

  //hooks
  const history = useHistory();
  const dispatch = useDispatch();

  //effects
  useEffect(() => {
    if (!myNotifications || myNotifications?.data?.lenght) setUnSeenNotificationCount(0);
    else setUnSeenNotificationCount(myNotifications?.data?.filter((item) => item.seen === false).length);
  }, [myNotifications]);
  useEffect(() => {
    dispatch(setMyNotifications(null));
    userProfile?.id && myNotifications === null && dispatch(getMyNotifications(userProfile?.id));
    // if (userProfile && userProfile?.isPasswordUpdated === false) {
    //   setShowChangePassword(true);
    // } else setShowChangePassword(false);
  }, [userProfile]);

  useEffect(() => {
    if (!connection) return;
    connection
      .start()
      .then(() => {
        connection.on('SendNotification', (res) => {
          openNotification(res.data);
          dispatch(getMyNotifications(userProfile?.id));
        });
      })
      .catch(() => {});
  }, [connection]);

  //functions
  const closeNotification = useCallback(() => {
    setShowNotificationDetail();
  }, []);

  const openNotification = (data) => {
    const showOsNotif = localStorage.getItem('showNotifications');
    if (showOsNotif === 'show') {
      const notification = new Notification(data.title, { body: data.description });
      notification.onclick = function () {
        window.parent.focus();
        notification.close();
      };
    }
    notification.info({
      message: data.title,
      description: data.description,
      duration: 0,
      key: data.id,
      btn: (
        <TcButton
          type='primary'
          size='small'
          onClick={() => {
            history.push(data.frontendRoute.url + data.contextId);
            notification.close(data.id);
          }}>
          نمایش {data.frontendRoute.title}
        </TcButton>
      ),
      onClick: () => {},
    });
  };

  return (
    <>
      <Badge count={unSeenNotificationCount}>
        <Popover
          placement='bottom'
          autoAdjustOverflow
          content={<Notifications showNotificationDetail={setShowNotificationDetail} />}
          title={<p className='mb-0'>اعلان ها</p>}
          overlayInnerStyle={{ boxShadow: '0px 3px 6px rgba(0,0,0,0.2)', zIndex: 10, backgroundColor: 'var(--bg-color)' }}>
          <div className='flex items-center justify-center p-2 text-center transition-all duration-500 rounded-md hover:bg-t-layer-bg-color bg-t-layer-bg-color'>
            <BellOutlined />
          </div>
        </Popover>
      </Badge>
      <NotificationDetail close={closeNotification} detail={showNotificationDetail} userId={userProfile?.id} handleSeen />
    </>
  );
};

export default HeaderNotification;
