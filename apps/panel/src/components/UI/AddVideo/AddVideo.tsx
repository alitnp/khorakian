import { IVideo } from '@my/types';
import { Form } from 'antd';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcModal from 'components/UI/Modal/TcModal';
import { FC, memo } from 'react';

interface IAddVideo {
  visible: boolean;
  addVideo: (_video: IVideo) => void;
  close(): void;
}

const AddVideo: FC<IAddVideo> = ({ visible, addVideo, close }) => {
  //hooks
  const [form] = Form.useForm();

  //functions
  const handleFinish = (values: any) => {
    console.log(values);
  };

  return (
    <TcModal visible={visible} title='انتخاب ویدیو' footer={false} onCancel={close}>
      <TcForm form={form} onFinish={handleFinish}>
        <TcFormItem label='عنوان' name='title'>
          <TcInput placeholder='عنوان' />
        </TcFormItem>
        <TcFormItem label='فایل ویدیو' name='file'>
          <TcInput type='file' accept='video/*' />
        </TcFormItem>
        <TcFormButtons onCancel={close} submitButtonText='ثبت' cancelButtonText='بازگشت' />
      </TcForm>
    </TcModal>
  );
};

export default memo(AddVideo);
