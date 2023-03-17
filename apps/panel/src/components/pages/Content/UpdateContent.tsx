import { Form } from 'antd';
import ContentImageManage from 'components/pages/Content/components/ContentImageManage';
import TcCard from 'components/UI/Card/TcCard';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import RichTextEditor from 'components/UI/RichText/RichTextEditor';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import useQuery from 'global/helperFunctions/useQuery';
import { content } from 'global/Models/ContentModels';
import { backendReponse } from 'global/Models/globalModels';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const UpdateContent: FC = () => {
  //states
  const [loading, setLoading] = useState<boolean>(false);
  const [thumbnailUrl, setThumbnail] = useState<string>();
  const [contentDetail, setContentDetail] = useState<content>();

  //ref
  const richTextRef = useRef();

  //hooks
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();
  const { push } = useHistory();
  const { decryptedPathnameLastPart: id } = useQuery();

  //effects
  useEffect(() => {
    if (id) getContentDetail(id);
  }, [id]);

  //functions
  const getContentDetail = async (id: string) => {
    setLoading(true);
    await ApiService.post(endpointUrls.contentGetList, { id })
      .then((res: backendReponse<content>) =>
        handleApiThen({
          res,
          dispatch,
          onSuccess: (res) => {
            const content = JSON.parse(res.data[0].text);
            content.blocks = Object.values(content.blocks).map((block: any) => {
              if (block.type === 'image') {
                block.data.file.url = endpointUrls.imageBaseUrl + block.data.file.url;
              }
              return block;
            });
            setContentDetail({ ...res.data[0], text: content });
            form.setFieldsValue(res.data[0]);
          },
          notifFail: true,
          notifSuccess: false,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };
  const handleSubmit = async (values: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const richTextData = await richTextRef?.current?.save();
    // const fixedImageUrlBlocks = richTextData.blocks.map((item) => {
    //   if (item.type !== 'image') return item;
    //   const tempItem = { ...item };
    //   tempItem.data.file.url = tempItem.data.file.url.replace(DOMAIN, '');
    //   return tempItem;
    // });
    // richTextData.blocks = { ...fixedImageUrlBlocks };
    const stringRichTextData = JSON.stringify(richTextData);

    // if (!thumbnailUrl) return dispatch(setNotificationData({ type: 'error', message: 'عکس محتوا انتخاب نشده.' }));
    setLoading(true);
    await ApiService.put(endpointUrls.contentUpdate, { ...values, thumbnailUrl: 'asdfasfd', text: stringRichTextData, contentTypeId: 1, id: +id })
      .then((res: any) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.content.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.content.path }}>
      <TcPageTitle title='ایجاد محتوا جدید' />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>
          <TcFormItem label='عنوان' name='title' rules={[{ required: true, message: 'فیلد اجباری' }]}>
            <TcInput placeholder='عنوان' />
          </TcFormItem>
          <TcFormItem label='ویژه (Featured)' name='isFeatured' initialValue={false}>
            <TcSelect
              options={[
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                { label: 'بله', value: true },
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                { label: 'خیر', value: false },
              ]}
            />
          </TcFormItem>
          <TcFormItem label='شرح' name='description'>
            <TcTextarea placeholder='شرح' />
          </TcFormItem>
        </TcFormWrapper>
      </TcForm>
      <ContentImageManage thumbnail={thumbnailUrl} setThumbnail={setThumbnail} /> {loading && <TcCoverLoading />}
      {contentDetail && <RichTextEditor editorRef={richTextRef} initialData={contentDetail.text} />}
      <TcFormButtons noCancel submitButtonText='ثبت' onSubmit={() => form.submit()} />
    </TcCard>
  );
};

export default UpdateContent;
