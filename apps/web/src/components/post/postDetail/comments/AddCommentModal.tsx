import MyButton from '@/components/basicUi/MyButton';
import WebApiService, { errorResponse } from '@/global/utils/WebApiService';
import { webApiCatch, webApiThen } from '@/global/utils/webApiThen';
import { ApiDataResponse, ICommentReplyRead } from '@my/types';
import { Modal, ModalProps, Form, Input } from 'antd';
import { FC, useState } from 'react';

interface ITcModal extends ModalProps {
  title: string;
  endPointUrl: string;
  route?: string;
  close: () => void;
  visible: boolean;
  refetch(): void;
}

const AddCommentModal: FC<ITcModal> = ({
  children,
  title,
  visible,
  close,
  refetch,
  endPointUrl,
  route,
  ...props
}) => {
  //state
  const [_loading, setLoading] = useState<boolean>(false);

  //hooks
  const [form] = Form.useForm();

  //func
  const handleSubmit = async (values: any) => {
    setLoading(true);
    await WebApiService.post(endPointUrl, values)
      .then((res: ApiDataResponse<ICommentReplyRead>) =>
        webApiThen({
          res,
          notifFail: true,
          notifSuccess: false,
          onSuccess: () => {
            close();
            refetch();
          },
        })
      )
      .catch(() => webApiCatch(errorResponse));
    setLoading(false);
  };

  return (
    <Modal
      title={<p className="mb-0">{title}</p>}
      centered
      destroyOnClose
      open={visible}
      onCancel={close}
      footer={false}
      {...props}
    >
      <div className="pt-2 border-t border-t-border-color-base">
        <Form
          form={form}
          onFinish={handleSubmit}
          requiredMark={false}
          validateTrigger="submit"
          layout="vertical"
        >
          <Form.Item
            name="text"
            label="توضیحات"
            rules={[
              {
                required: true,
                message: ' توضیحات وارد نشده.',
              },
            ]}
          >
            <Input.TextArea placeholder="توضیحات" rows={5} />
          </Form.Item>
          <div className="flex justify-end">
            <MyButton className="mt-2" type="primary" htmlType="submit">
              ارسال
            </MyButton>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddCommentModal;
