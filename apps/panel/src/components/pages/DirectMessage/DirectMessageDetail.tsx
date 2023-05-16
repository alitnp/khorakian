import { ApiDataResponse, IDirectMessageRead } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import MessageBubble from 'components/pages/DirectMessage/components/MessageBubble';
import MessageOwner from 'components/pages/DirectMessage/components/MessageOwner';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import useQuery from 'global/helperFunctions/useQuery';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function DirectMessageDetail() {
  //state
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<IDirectMessageRead>();
  const [replyText, setReplyText] = useState<string>('');

  //hooks
  const { pathnameLastPart: id } = useQuery();
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();

  //effect
  useEffect(() => {
    id && getDetail(id);
  }, [id]);

  //functions
  const getDetail = async (id: string) => {
    setLoading(true);
    await ApiService.get(endpointUrls.directMessageDetail(id))
      .then((res: ApiDataResponse<IDirectMessageRead>) =>
        handleApiThenGeneric<ApiDataResponse<IDirectMessageRead>, IDirectMessageRead>({ res, dispatch, onSuccessData: setDetail, notifFail: true, notifSuccess: false })
      )
      .catch(() => {});
    setLoading(false);
  };
  const sendReply = async () => {
    if (!replyText) return;
    setLoading(true);
    await ApiService.post(endpointUrls.directMessageReply(id as string), { text: replyText })
      .then((res: ApiDataResponse<IDirectMessageRead>) =>
        handleApiThenGeneric<ApiDataResponse<IDirectMessageRead>, IDirectMessageRead>({
          res,
          dispatch,
          onSuccessData: (data) => {
            setReplyText('');
            setDetail(data);
          },
          notifFail: true,
          notifSuccess: false,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };
  const isRepeated = (index: number): boolean => {
    if (!detail) return false;
    if (index === 0) return detail.replies[0].user._id === detail.user._id;
    return detail.replies[index].user._id === detail.replies[index - 1].user._id;
  };
  const isActive = (id: string): boolean => {
    return id !== detail?.user._id;
  };

  return (
    <TcCard back={{ to: routes.directMessage.path }}>
      <TcPageTitle title='پیام مستقیم' />
      {detail && (
        <div className='mb-4'>
          <MessageOwner isActive={false} creationTime={detail?.creationDate} fullName={detail.user.fullName} repeatedSender={false} />
          <MessageBubble isActive={false}>
            <span>{detail.text}</span>
          </MessageBubble>
        </div>
      )}
      {detail &&
        detail.replies?.map((message, index) => (
          <div className='mb-4' key={message._id}>
            <MessageOwner isActive={isActive(message.user._id)} creationTime={message?.creationDate} fullName={message.user.fullName} repeatedSender={isRepeated(index)} />
            <MessageBubble isActive={isActive(message.user._id)}>
              <span>{message.text}</span>
            </MessageBubble>
          </div>
        ))}
      <TcDevider>ارسال پیام</TcDevider>
      <TcTextarea placeholder='ارسال پیام' value={replyText} onChange={(e) => setReplyText(e.target.value)} />
      <TcFormButtons noCancel submitButtonText='ارسال' onSubmit={sendReply} />
    </TcCard>
  );
}

export default DirectMessageDetail;
