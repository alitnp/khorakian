import { Segmented } from 'antd';
import SettingItem from 'components/pages/Setting/components/SettingItem';
import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setSettingSwitchFilterWrapperStatus, setSettingSwitchShowNotificationsStatus, setSettingSwitchTheme } from 'redux/reducer/Setting/settingReducer';
import { emptyToastData } from 'redux/reducer/Toast/toastReducer';

const Setting = () => {
  //states
  const { theme, filterWrapperStatus, showNotifications } = useSelector((state) => state.setting);

  //hooks
  const dispatch = useDispatch();

  //functions
  const handleThemeChange = () => {
    dispatch(emptyToastData());
    dispatch(setSettingSwitchTheme());
  };
  const handleFilterWrapperStatusChange = () => {
    dispatch(setSettingSwitchFilterWrapperStatus());
  };
  const handleWindowNotificationStatusChange = () => {
    if (showNotifications === 'hidden') return dispatch(setSettingSwitchShowNotificationsStatus());
    if (!('Notification' in window)) {
      return;
    } else if (Notification.permission === 'granted') {
      dispatch(setSettingSwitchShowNotificationsStatus());
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          dispatch(setSettingSwitchShowNotificationsStatus());
        }
      });
    }
  };

  return (
    <TcCard>
      <TcPageTitle title='تنظیمات' />

      <SettingItem
        label='رنگ پس زمینه'
        controller={
          <Segmented
            value={theme}
            options={[
              {
                label: 'روشن',
                value: 'light',
              },
              {
                label: 'تاریک',
                value: 'dark',
              },
            ]}
            onChange={handleThemeChange}
          />
        }
      />

      <SettingItem
        label='پیش فرض فیلتر ها'
        controller={
          <Segmented
            value={filterWrapperStatus}
            options={[
              {
                label: 'بسته',
                value: 'close',
              },
              {
                label: 'باز',
                value: 'open',
              },
            ]}
            onChange={handleFilterWrapperStatusChange}
          />
        }
      />

      {/* {'Notification' in window && Notification.permission !== 'denied' && (
        <SettingItem
          label='نمایش اعلان ها در سیستم عامل'
          controller={
            <Segmented
              value={showNotifications}
              options={[
                {
                  label: 'عدم نمایش',
                  value: 'hidden',
                },
                {
                  label: 'نمایش',
                  value: 'show',
                },
              ]}
              onChange={handleWindowNotificationStatusChange}
            />
          }
        />
      )} */}
    </TcCard>
  );
};

export default Setting;
