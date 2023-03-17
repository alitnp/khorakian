import TcTooltip from 'components/UI/Tooltip/TcTooltip';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import style from '../style.module.css';

interface IMenuItem {
  open?: boolean;
  to: string;
  isSelected: boolean;
  icon: ReactNode;
  name: string;
  horizental: boolean;
}

const MenuItem: FC<IMenuItem> = ({ open, to, isSelected, icon, name, horizental }) => {
  return (
    <TcTooltip placement='left' title={!open ? name : ''}>
      <div className='relative w-full px-2 mb-2 overflow-hidden transition-all duration-300 ease-out group shrink-0'>
        <Link to={to}>
          <div
            className={`flex items-center  px-3 py-1 transition-all ${style.menu} ease-out duration-300  rounded-md  ${isSelected && 'bg-t-faded-primary-color '} ${
              !isSelected && 'hover:bg-t-layer-bg-color '
            }`}>
            {icon}
            <div className={`flex w-full pr-2 transition-all overflow-hidden ease-out whitespace-nowrap ${horizental ? '' : open ? 'max-w-[200px]' : 'max-w-[0]'}`}>{name}</div>
          </div>
        </Link>
        {isSelected && <div className='absolute top-0 w-1 h-full left-2 rounded-l-md bg-t-primary-color animate-scale'></div>}
      </div>
    </TcTooltip>
  );
};

export default MenuItem;
