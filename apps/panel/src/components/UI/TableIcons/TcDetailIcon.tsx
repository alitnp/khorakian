import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TcTooltip from 'components/UI/Tooltip/TcTooltip';
import style from './style.module.css';
import { FC } from 'react';

type ITcDetailIcon =
  | {
      onClick: () => void;
      to?: never;
      tooltip?: string;
      blank?: boolean;
      placement?: 'right' | 'top';
    }
  | {
      to: string;
      onClick?: never;
      tooltip?: string;
      blank?: boolean;
      placement?: 'right' | 'top';
    };

const TcDetailIcon: FC<ITcDetailIcon> = ({ onClick, to, tooltip, blank = true, placement = 'top' }) => {
  if (onClick)
    return (
      <span className={`inline ${style['green-icon']}`}>
        <TcTooltip title={tooltip ? tooltip : 'جزئیات'} placement={placement}>
          <EyeOutlined onClick={onClick} className='mx-[5px] text-t-primary-color inline-block' />
        </TcTooltip>
      </span>
    );

  return (
    <span className={`inline ${style['green-icon']}`}>
      <Link to={to || ''} target={blank ? '_blank' : '_self'}>
        <TcTooltip title={tooltip ? tooltip : 'جزئیات'} placement={placement}>
          <EyeOutlined className='mx-[5px] text-t-primary-color inline-block' />
        </TcTooltip>
      </Link>
    </span>
  );
};

export default TcDetailIcon;
