import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TcTooltip from 'components/UI/Tooltip/TcTooltip';
import style from './style.module.css';
import { FC } from 'react';

type tcEditIcon =
  | {
      onClick: () => void;
      to?: never;
      tooltip?: string;
      blank?: boolean;
    }
  | {
      to: string;
      onClick?: never;
      tooltip?: string;
      blank?: boolean;
    };

const TcEditIcon: FC<tcEditIcon> = ({ onClick, to, tooltip, blank = false }) => {
  if (onClick)
    return (
      <span className={`inline ${style['green-icon']}`}>
        <TcTooltip title={tooltip ? tooltip : 'ویرایش'}>
          <EditOutlined onClick={onClick} className='mx-[5px] text-t-primary-color inline-block' />
        </TcTooltip>
      </span>
    );

  return (
    <span className={`inline ${style['green-icon']}`}>
      <Link to={to || ''} target={blank ? '_blank' : '_self'}>
        <TcTooltip title={tooltip ? tooltip : 'ویرایش'}>
          <EditOutlined className='mx-[5px] text-t-primary-color inline-block' />
        </TcTooltip>
      </Link>
    </span>
  );
};

export default TcEditIcon;
