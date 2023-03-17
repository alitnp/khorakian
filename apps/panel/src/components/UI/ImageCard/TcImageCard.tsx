import { Button, Card, Image } from 'antd';
import emptyImage from 'assets/images/empty_image.png';
import { DOMAIN } from 'config/API/ApiService';
import TcDeleteIcon from '../TableIcons/TcDeletIcon';
import { FC } from 'react';

const { Meta } = Card;

interface ITcImageCard {
  onClick: () => any;
  title?: string;
  src?: string;
  onApproveHandler?: () => void;
  approved?: boolean;
  accessApprove?: boolean;
}

const TcImageCard: FC<ITcImageCard> = ({ title, src, onClick, onApproveHandler, approved, accessApprove, ...props }) => {
  return (
    <Card
      {...props}
      cover={
        <div className='relative'>
          <span className={`absolute z-50 top-2 right-2 text-xs text-white px-2 py-1 rounded-md  ${approved ? 'bg-t-primary-color' : 'bg-t-warning-color'}`}>
            {approved ? 'تایید شده' : 'تایید نشده'}
          </span>
          <Image alt='image' src={DOMAIN ? DOMAIN + src : ''} fallback={emptyImage} />
        </div>
      }
      actions={[
        <TcDeleteIcon key='delete' onConfirm={onClick} />,
        ...(accessApprove
          ? [
              <Button onClick={onApproveHandler} size='small' key='approve'>
                {approved ? 'عدم تایید عکس' : 'تایید عکس'}
              </Button>,
            ]
          : []),
      ]}>
      <Meta title={title || 'عنوان عکس ثبت نشده'} />
    </Card>
  );
};

export default TcImageCard;
