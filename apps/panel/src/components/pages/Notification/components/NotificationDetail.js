import TcButton from 'components/UI/Button/TcButton';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcModal from 'components/UI/Modal/TcModal';
import TcShowInfo from 'components/UI/ShowInfo/TcShowInfo';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { encryptId } from 'global/helperFunctions/hashquery';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getMyNotifications } from 'redux/reducer/Notification/getMyNotifications';

const NotificationDetail = ({ detail, close, handleSeen, userId }) => {
  //effects
  useEffect(() => {
    detail && handleSeen && makeNotifitacionSeen();
  }, [detail]);

  //hooks
  const dispatch = useDispatch();
  const history = useHistory();

  //functions
  const makeNotifitacionSeen = async () => {
    if (detail.seen) return;
    await ApiService.put(endpointUrls.updateNotification, { ...detail, seen: true })
      .then(() => {
        userId && dispatch(getMyNotifications(userId));
      })
      .catch(() => {});
  };

  return (
    <TcModal
      visible={detail}
      title='جزئیات اعلان'
      footer={false}
      onCancel={close}
      bodyStyle={{ backgroundColor: 'var(--bg-color)' }}
      headStyle={{ backgroundColor: 'var(--bg-color) !important' }}>
      <TcFormWrapper singleColumn>
        <TcShowInfo right='عنوان' left={detail?.title} />
        {!handleSeen && <TcShowInfo right='زمان ایجاد' left={detail?.creationDate} />}
        {!handleSeen && <TcShowInfo right='فرد گیرنده' left={detail?.fullName} />}
        {!handleSeen && <TcShowInfo right='دیده شده' left={detail?.seen ? 'بلی' : 'خیر'} />}
        {!handleSeen && <TcShowInfo right='پیامک ارسال شده' left={detail?.sendSMS ? 'بلی' : 'خیر'} />}
        {!handleSeen && <TcShowInfo right='در اپ نمایش داده شده' left={detail?.sendInApp ? 'بلی' : 'خیر'} />}
      </TcFormWrapper>
      {detail?.url && <TcShowInfo right='لینک' left={detail?.url} />}
      <TcShowInfo right='متن' left={detail?.description} />

      {detail?.frontendRoute && (
        <div className='flex justify-end'>
          <TcButton
            type='primary'
            size='small'
            onClick={() => {
              history.push(detail.frontendRoute.url + encryptId(detail.contextId));
              close();
            }}>
            نمایش {detail.frontendRoute?.title}
          </TcButton>
        </div>
      )}
    </TcModal>
  );
};

export default memo(NotificationDetail);
