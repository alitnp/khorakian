import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWhoAmI } from 'redux/reducer/Profile/getWhoAmI';
import useHasAccess from 'global/helperFunctions/useHasAccess';
import HeaderLogout from 'components/Layout/Header/components/HeaderLogout';
import cookie from 'js-cookie';
import HeaderIconLink from 'components/Layout/Header/components/HeaderIconLink';
import routes from 'global/Constants/routes';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';

const TcHeader = () => {
  //states
  const { userProfile } = useSelector((state) => state.profile.value);

  //hooks
  const { hasAccessTo } = useHasAccess();
  const dispatch = useDispatch();

  //effect
  useEffect(() => {
    const getToken = cookie.get('token');
    getToken && !userProfile && dispatch(getWhoAmI());
    // userName && dispatch(getUserProfile());
  }, []);

  return (
    <div className='print:hidden flex flex-col items-center justify-between w-[98%] sm:w-11/12 px-6 py-2 mx-auto mt-2 mb-4 border rounded-md shadow-md bg-t-bg-color sm:flex-row '>
      <div className=' w-fit'>{/* <img src={igtLogo} alt='tipax logo border' className='object-contain object-right h-8 mb-3 sm:mb-0' /> */}</div>

      <div className='flex cursor-pointer gap-x-2'>
        {/* Notification */}
        {/* <HeaderNotification /> */}

        {/* profile */}
        <HeaderIconLink tooltipTitle='پروفایل' route={routes.profile.path} icon={<UserOutlined />} />

        {/* setting */}
        <HeaderIconLink tooltipTitle='تنظیمات پنل' route={routes.setting.path} icon={<SettingOutlined />} />

        {/* logout */}
        <HeaderLogout />
      </div>

      {/* <ChangePasswordModal visible={showChangePassword} /> */}
    </div>
  );
};

export default TcHeader;
