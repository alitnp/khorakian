import { FC } from 'react';

interface ITcShowInfo {
  right: string;
  left: any;
  nowrap?: boolean;
  full?: boolean;
  vertical?: boolean;
  notNormal?: boolean;
  isItemCenter?: boolean;
  className?: string;
  marginLeft?: string;
  noMinWidth?: boolean;
}

const TcShowInfo: FC<ITcShowInfo> = ({ isItemCenter, right, left, className, full, nowrap = true, notNormal = true, marginLeft, vertical, noMinWidth = false }) => {
  return (
    <div className={` ${className} ${isItemCenter && 'items-center'} mb-2 ${!vertical && 'md:flex'}  ${full && 'col-span-full w-full'} items-start`}>
      <div className={`mb-0 ${notNormal ? 'ml-2 text-t-secondary-text-color' : `${marginLeft}`} ${nowrap && 'whitespace-nowrap'} ${noMinWidth ? '' : 'min-w-[120px]'} `}>
        {right + ' : '}
      </div>
      <div className='text-t-text-color'>{!left && left !== 0 ? 'ثبت نشده' : left}</div>
    </div>
  );
};

export default TcShowInfo;
