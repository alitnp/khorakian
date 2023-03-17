import TcTooltip from 'components/UI/Tooltip/TcTooltip';
import { FC, memo, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface IHeaderIcon {
  tooltipTitle: string;
  route: string;
  icon: ReactNode;
}

const HeaderIconLink: FC<IHeaderIcon> = ({ tooltipTitle, route, icon }) => {
  //hooks
  const { pathname } = useLocation();
  return (
    <TcTooltip placement='bottom' title={tooltipTitle}>
      <Link to={route}>
        <div
          className={`text-center relative p-2 flex  transition-all duration-500 items-center hover:bg-t-layer-bg-color-hovered justify-center rounded-md ${
            pathname === route ? 'bg-t-layer-bg-color-hovered' : 'bg-t-layer-bg-color'
          }`}>
          {icon}
          {pathname === route && <div className='absolute bottom-0 left-0 w-full h-1 rounded-b-md bg-t-primary-color animate-scale'></div>}
        </div>
      </Link>
    </TcTooltip>
  );
};

export default memo(HeaderIconLink);
