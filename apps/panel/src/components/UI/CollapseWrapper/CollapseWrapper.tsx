import { FilterOutlined, DownOutlined } from '@ant-design/icons';
import { useState, FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface IFilterWrapper {
  isOpen?: boolean;
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  onToggleOpen?: () => void;
  bgStyle?: string;
  customElement?: ReactNode;
  customHeight?: string;
  centerTitle?: ReactNode;
}

const CollapseWrapper: FC<IFilterWrapper> = ({
  isOpen,
  title = 'فیلترها',
  icon = <FilterOutlined />,
  onToggleOpen,
  children,
  bgStyle,
  customElement,
  customHeight,
  centerTitle,
}) => {
  //state
  const { filterWrapperStatus } = useSelector(({ setting }: any) => setting);
  const [open, setOpen] = useState(isOpen !== undefined ? isOpen : filterWrapperStatus === 'open');

  //effect
  useEffect(() => {
    if (isOpen !== undefined && isOpen !== open) setOpen(isOpen);
  }, [isOpen]);

  //functions
  const toggleOpen = () => {
    if (onToggleOpen) return onToggleOpen();
    setOpen((prevState) => !prevState);
  };

  return (
    <div className='mb-4 rounded-md print:hidden'>
      <div
        className={`flex items-center ${bgStyle} justify-between ${
          customHeight ? customHeight : 'sm:h-8'
        } p-2 px-4 transition-all duration-700 ease-in-out border rounded-lg cursor-pointer hover:bg-t-layer-bg-color bg-t-bg-color border-t-border-color-base ${
          open ? 'shadow-sm' : ' shadow-md'
        }`}
        onClick={toggleOpen}>
        <div className='flex items-center gap-2 mb-0'>
          {icon && icon}
          {title}
        </div>
        {centerTitle && centerTitle}
        <div className='flex items-center gap-x-2'>
          {customElement}
          <DownOutlined className={`transition-all duration-500 ease-in-out ${open && '-scale-y-100'}`} />
        </div>
      </div>
      <div
        className={` ${open ? '' : 'overflow-hidden'} transition-all duration-700 ease-in-out ${
          open ? 'max-h-[2000px] md:max-h-[1000px] opacity-100 p-2 m-0' : 'max-h-0 -m-4 mb-6 opacity-0'
        }`}>
        {children}
      </div>
    </div>
  );
};

export default CollapseWrapper;
