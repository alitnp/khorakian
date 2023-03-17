import { FC, ReactNode } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
import { SendOutlined } from '@ant-design/icons';
import TcButton from 'components/UI/Button/TcButton';
import { useDispatch } from 'react-redux';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';

interface ITcMessageInput {
  text: string;
  setText: (_text: string) => void;
  toolbelt?: ReactNode[];
  handleSend: () => void;
}

const TcMessageInput: FC<ITcMessageInput> = ({ text, setText, toolbelt = [], handleSend }) => {
  //hooks
  const dispatch = useDispatch();

  //function
  const sendMessage = () => {
    if (!text) return dispatch(setNotificationData({ message: 'متن پیام وارد نشده.', type: 'warning' }));
    if (text) handleSend();
  };

  return (
    <div>
      <div className='flex gap-x-2 '>
        <div className='w-full '>
          <div className='max-h-[200px] overflow-y-auto border border-t-border-color-base rounded-md hover:border-t-primary-color overflow-x-hidden'>
            <TextArea autoSize className='py-[8px]' placeholder='متن پیام' value={text} onChange={(e) => setText(e.target.value)} style={{ border: 'none' }} />
          </div>
          <div className='flex justify-end my-1 gap-x-2'>{toolbelt?.map((item) => item)}</div>
        </div>
        <div
          className='items-center justify-center hidden w-10 h-10 text-lg text-white transition-all duration-500 ease-out rounded-full shadow-lg cursor-pointer sm:flex bg-t-primary-color -scale-x-100 hover:bg-green-700 shrink-0 inherit-color'
          onClick={sendMessage}>
          <SendOutlined className='scale-x-[0.8] -right-[1px] relative  ' />
        </div>
      </div>
      <div className='w-full mt-6 sm:hidden'>
        <TcButton type='primary' className='w-full' onClick={sendMessage}>
          ارسال
        </TcButton>
      </div>
    </div>
  );
};

export default TcMessageInput;
