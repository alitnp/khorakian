import {
  DoubleRightOutlined,
  ExceptionOutlined,
  QuestionCircleOutlined as BulbOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  YoutubeOutlined,
  PictureOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import TcMenu from 'components/UI/Menu/TcMenu';
import useScreenWidth from 'global/helperFunctions/useScreenWidth';
import { memo, useEffect, useState } from 'react';
import SidebarModalApplication from './components/SidebarModalApplication';
import routes from 'global/Constants/routes';
import genericModels from 'global/Models/genericRoutesModels';
import defaultImageModel from 'global/Models/defaultImageModel';
import pageItemModel from 'global/Models/pageItemModel';
import sliderModel from 'global/Models/sliderModel';

const TcSidebar = ({ open, setOpen, horizental }) => {
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
    { name: 'افراد', icon: <UserOutlined />, to: routes.user.path, open: open, role: true },
    { name: 'پست', icon: <DashboardOutlined />, to: routes.post.path, open: open, role: true },
    { name: 'ویدیو', icon: <YoutubeOutlined />, to: routes.video.path, open: open, role: true },
    { name: 'عکس', icon: <PictureOutlined />, to: routes.image.path, open: open, role: true },
    { name: 'ایده ها', icon: <BulbOutlined />, to: routes.idea.path, open: open, role: true },
    { name: 'ایده ی کاربران', icon: <BulbOutlined />, to: routes.userIdea.path, open: open, role: true },
    { name: 'تجربیات', icon: <ExceptionOutlined />, to: routes.experience.path, open: open, role: true },
    { name: 'تجربیات کاربران', icon: <ExceptionOutlined />, to: routes.userExperience.path, open: open, role: true },
    { name: 'درباره من', icon: <UserOutlined />, to: routes.aboutMe.path, open: open, role: true },
    {
      name: 'صفحه بندی',
      icon: <HomeOutlined />,
      subMenu: [
        { name: defaultImageModel.title, to: routes.defaultImage.path, role: true },
        { name: sliderModel.title, to: routes.slider.path, role: true },
        { name: pageItemModel.title, to: routes.pageItem.path, role: true },
      ],
      open: open,
    },
    {
      name: 'اطلاعات پایه',
      icon: <InfoCircleOutlined />,
      subMenu: [
        ...genericModels.map((menu) => ({ name: menu.title, to: menu.ListRoute, role: true })),
        { name: 'رسانه‌ی اجتماعی', to: routes.socialMedia.path, open: open, role: true },
      ],
      open: open,
    },
  ];

  return (
    <>
      {sidebarMenus.map((item, index) => (
        <TcMenu key={index} {...item} horizental={!!horizental} />
      ))}

      <div className='px-2 mt-auto cursor-pointer'>
        {/* <div onClick={() => setIsShowModal(true)} className='flex items-center justify-center gap-1 py-1 mt-6 mb-1 text-sm rounded-md hover:bg-t-layer-bg-color'>
          <DownloadOutlined />
          <span className={`${open ? 'max-w-[100px]' : 'max-w-0'} overflow-hidden transition-all whitespace-nowrap`}>دانلود اپلیکیشن</span>
        </div> */}

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

export default memo(TcSidebar);
