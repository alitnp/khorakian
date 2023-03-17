import { Badge, Empty } from 'antd';
import { useSelector } from 'react-redux';

const Notifications = ({ showNotificationDetail }) => {
  //states
  const { myNotifications } = useSelector((state) => state.notification);

  return (
    <div className='max-h-[60vh] overflow-y-auto'>
      {(!myNotifications || myNotifications?.data?.length === 0) && <Empty description='اعلانی وجود ندارد.' />}
      {myNotifications?.data?.length > 0 && (
        <div className='flex flex-col gap-y-2'>
          {myNotifications.data.map((item) => (
            <div
              key={item.id}
              className='pb-1 pl-1 transition-all duration-500 border-b cursor-pointer w-60 hover:bg-t-layer-bg-color last:border-none'
              onClick={() => showNotificationDetail(item)}>
              <div className='flex justify-between mb-0 font-medium gap-x-2'>
                <div>
                  <p className='mb-0'>{item.title}</p>
                  <p className='mb-0 text-xs text-t-secondary-text-color'>{item.sendDate}</p>
                </div>
                {!item.seen && <Badge status='processing' />}
              </div>
              <p className='mb-0 text-xs '>
                {item.description?.substring(0, 80)}
                {`${item.description?.length > 80 ? '...' : ''}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
