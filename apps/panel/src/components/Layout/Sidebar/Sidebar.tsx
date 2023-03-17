import {
  UserOutlined,
  DoubleRightOutlined,
  NotificationOutlined,
  DownloadOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  DollarOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import TcMenu from 'components/UI/Menu/TcMenu';
import useScreenWidth from 'global/helperFunctions/useScreenWidth';
import { FC, useEffect, useState } from 'react';
import SidebarModalApplication from './components/SidebarModalApplication';
import routes from 'global/Constants/routes';
import genericModels from 'global/Models/genericRoutesModels';

interface ITcSidebar {
  open: boolean;
  setOpen(_open: boolean): void;
  horizental: boolean;
}

const TcSidebar: FC<ITcSidebar> = ({ open, setOpen, horizental }) => {
  // state
  const [isShowModal, setIsShowModal] = useState(false);

  //hooks
  const screenWidth = useScreenWidth();

  //effects
  useEffect(() => {
    if (!horizental) {
      screenWidth < 1024 && open && setOpen(false);
      screenWidth > 1024 && !open && setOpen(true);
    }
  }, [screenWidth]);

  //constants
  const sidebarMenus = [
    { name: 'داشبورد', icon: <DashboardOutlined />, to: routes.dashboard.path, open: open, role: true },
    { name: 'سیگنال', icon: <NotificationOutlined />, to: routes.signal.path, open: open, role: true },
    { name: 'محتوا', icon: <ProfileOutlined />, to: routes.content.path, open: open, role: true },
    { name: 'کاربران', icon: <UserOutlined />, to: routes.user.path, open: open, role: true },
    { name: 'پرداخت ها', icon: <DollarOutlined />, to: routes.payment.path, open: open, role: true },
    {
      name: 'اطلاعات پایه',
      icon: <InfoCircleOutlined />,
      subMenu: genericModels.map((menu) => ({ name: menu.title, to: menu.ListRoute, role: true })),
      open: open,
    },
  ];

  return (
    <>
      {sidebarMenus.map((item, index) => (
        <TcMenu key={index} {...item} horizental={!!horizental} />
      ))}

      <div className='px-2 mt-auto cursor-pointer'>
        <div onClick={() => setIsShowModal(true)} className='flex items-center justify-center gap-1 py-1 mt-6 mb-1 text-sm rounded-md hover:bg-t-layer-bg-color'>
          <DownloadOutlined />
          <span className={`${open ? 'max-w-[100px]' : 'max-w-0'} overflow-hidden transition-all whitespace-nowrap`}>دانلود اپلیکیشن</span>
        </div>

        {!horizental && (
          <div
            onClick={() => {
              setOpen && setOpen(!open);
            }}
            className='flex items-center justify-center px-2 py-1 text-center rounded-md text-t-text-color bg-t-layer-bg-color hover:bg-t-layer-bg-color-hovered'>
            <DoubleRightOutlined className='duration-300 trnasition-all' style={{ transform: !open ? 'scaleX(-1)' : '' }} />
          </div>
        )}
      </div>

      {isShowModal && <SidebarModalApplication isShowModal={isShowModal} setIsShowModal={setIsShowModal} />}
    </>
  );
};

export default TcSidebar;
