import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import TcPopconfirm from 'components/UI/Popconfirm/TcPopconfirm';
import TcTooltip from 'components/UI/Tooltip/TcTooltip';

const TcToggleIsActive = ({ isActive, onConfirm }) => {
  return (
    <TcPopconfirm onConfirm={onConfirm} title={isActive ? 'به وضعیت "غیر فعال" تغییر کند؟' : 'به وضعیت "فعال" تغییر کند؟'}>
      <div className='cursor-pointer w-fit mx-[5px]'>
        <TcTooltip title={isActive ? 'فعال' : 'غیرفعال'}>
          {!isActive && (
            <div className='text-t-error-color inherit-color'>
              <CloseCircleOutlined />
            </div>
          )}
          {isActive && (
            <div className='text-t-success-color inherit-color'>
              <CheckCircleOutlined />
            </div>
          )}
        </TcTooltip>
      </div>
    </TcPopconfirm>
  );
};

export default TcToggleIsActive;
