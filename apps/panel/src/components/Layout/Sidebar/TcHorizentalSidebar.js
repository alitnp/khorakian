import Sidebar from 'components/Layout/Sidebar/Sidebar';
import { useState } from 'react';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const TcHorizentalSidebar = () => {
  //states
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  //functions
  const toggleOpen = () => setOpen((prevState) => !prevState);

  //effects
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <aside
      className={` flex shrink-0 overflow-hidden mb-2 transition-all  ease-in-out sm:hidden w-[98%] flex-col pb-2 pt-3 mt-2 mx-auto bg-t-bg-color duration-1000 rounded-md  text-t-text-color print:hidden border border-t-bg-color shadow-lg ${
        open ? 'max-h-[1000px]' : 'max-h-[45px] hover:bg-t-layer-bg-color'
      }`}>
      <div className='flex items-center justify-between px-2 mx-2 mb-4 transition-all duration-300 rounded-md cursor-pointer shrink-0 inherit-color ' onClick={toggleOpen}>
        <div className='flex items-center gap-x-4 shrink-0 '>
          <MenuOutlined />
          گزینه ها
        </div>
        <DownOutlined className='mr-auto transition-all ' style={{ transform: open ? 'scaleY(-1)' : '' }} />
      </div>
      <Sidebar open={true} horizental />
    </aside>
  );
};

export default TcHorizentalSidebar;
