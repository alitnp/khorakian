import { DeleteOutlined } from '@ant-design/icons';
import TcPopconfirm from 'components/UI/Popconfirm/TcPopconfirm';
import TcTooltip from 'components/UI/Tooltip/TcTooltip';
import { FC } from 'react';
import style from './style.module.css';

interface ITcDeleteIcon {
  onConfirm: () => void;
  confirmText?: string;
  tooltip?: string;
}

const TcDeleteIcon: FC<ITcDeleteIcon> = ({ onConfirm, confirmText, tooltip }) => {
  return (
    <TcTooltip title={tooltip ? tooltip : 'حذف'}>
      <TcPopconfirm onConfirm={onConfirm} title={confirmText ? confirmText : 'این مورد حذف شود؟'}>
        <span className={`inline ${style['red-icon']}`}>
          <DeleteOutlined className='mx-[5px] text-t-error-color cursor-pointer' />
        </span>
      </TcPopconfirm>
    </TcTooltip>
  );
};

export default TcDeleteIcon;
