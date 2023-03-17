import { FileAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TcTooltip from 'components/UI/Tooltip/TcTooltip';
import style from './style.module.css';
import { FC } from 'react';

interface ITcCreateIcon {
  to: string;
  tooltip: string;
  blank: boolean;
  onClick: () => void;
}

const TcCreateIcon: FC<ITcCreateIcon> = ({ onClick, to, tooltip, blank = true }) => {
  if (onClick)
    return (
      <span className={`inline ${style['green-icon']}`}>
        <TcTooltip title={tooltip ? tooltip : 'ثبت'}>
          <FileAddOutlined onClick={onClick} className='mx-[5px] text-t-primary-color' />
        </TcTooltip>
      </span>
    );

  return (
    <span className={`inline ${style['green-icon']}`}>
      <Link to={to} target={blank ? '_blank' : '_self'}>
        <TcTooltip title={tooltip ? tooltip : 'ثبت'}>
          <FileAddOutlined className='mx-[5px] text-t-primary-color' />
        </TcTooltip>
      </Link>
    </span>
  );
};

export default TcCreateIcon;
