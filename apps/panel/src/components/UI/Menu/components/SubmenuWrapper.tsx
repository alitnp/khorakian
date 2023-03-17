import { FC, ReactElement, ReactNode } from 'react';
import style from '../style.module.css';
import { DownOutlined } from '@ant-design/icons';
interface ISubmenuWrapper {
  open?: boolean;
  isWrapperOpen: boolean;
  setIsWrapperOpen: (a: boolean) => void;
  itemsCount: number;
  haveSubmenu: boolean;
  icon: ReactNode;
  name: string;
  submenuSelected: boolean;
  horizental: boolean;
  children: ReactElement;
}
const SubmenuWrapper: FC<ISubmenuWrapper> = ({ open, isWrapperOpen, setIsWrapperOpen, horizental, itemsCount, haveSubmenu, icon, name, submenuSelected, children }) => {
  return (
    <div
      className={`px-2 relative flex-shrink-0 ${style.menu} transition-all ease-out  cursor-pointer group duration-700 ${!submenuSelected && 'hover:bg-t-layer-bg-color'}  mb-2 ${
        open && 'overflow-hidden '
      } ${isWrapperOpen && open ? 'bg-t-layer-bg-color' : ''} `}
      style={{ maxHeight: isWrapperOpen && open ? `${itemsCount * 40 + 40}px` : '36px' }}>
      <div
        className={`flex ${style.menu} items-center mb-2  px-3 py-1 transition-all ease-out   rounded-md group- ${isWrapperOpen && ' '} ${
          submenuSelected && (!isWrapperOpen || !open) && 'bg-t-layer-bg-color'
        }`}
        onClick={() => setIsWrapperOpen(!isWrapperOpen)}>
        <span style={{ color: 'white !important' }}> {icon}</span>
        {/* {!open && <CaretLeftFilled className='mr-2' />} */}
        <div className={`flex w-full pr-2 transition-all overflow-hidden whitespace-nowrap ease-in-out ${horizental ? '' : open ? 'max-w-[200px]' : 'max-w-[0]'}`}>
          <span className='ml-3 '>{name}</span>
          {haveSubmenu && <DownOutlined className='mr-auto transition-all duration-700 text-t-text-color' style={{ transform: isWrapperOpen ? 'scaleY(-1)' : '' }} />}
        </div>
      </div>

      {children}
      {!open && submenuSelected && <div className='absolute top-0 w-1 h-full left-2 rounded-l-md bg-t-primary-color max-h-[32px] animate-scale'></div>}
    </div>
  );
};

export default SubmenuWrapper;
