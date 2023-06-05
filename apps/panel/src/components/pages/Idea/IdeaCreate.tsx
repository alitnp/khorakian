import TcCard from 'components/UI/Card/TcCard';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Form } from 'antd';
import TcForm from 'components/UI/Form/TcForm';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcButton from 'components/UI/Button/TcButton';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import TcSelectReduxSearch from 'components/UI/Form/Inputs/TcSelectReduxSearch';
import { getAllIdeaCategories } from 'redux/reducer/IdeaCategory/getAllIdeaCategories';
import { IImage, IVideoRead } from '@my/types';
import TcDevider from 'components/UI/Devider/TcDevider';
import AddVideo from 'components/UI/Video/AddVideo';
import AddImage from 'components/UI/Image/AddImage';

const IdeaCreate: FC = () => {
  //states
  const [videos, setVideos] = useState<IVideoRead[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState(false);

  //hooks
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();
  const { push } = useHistory();

  //functions
  const handelSubmit = async (values: any) => {
    setLoading(true);
    await ApiService.post(endpointUrls.ideaCreate, { ...values, isAdminSubmitted: true, videos: videos.map((vid) => vid._id), images: images.map((img) => img._id) })
      .then((res: any) =>
        handleApiThen({
          res,
          dispatch,
          notifFail: true,
          notifSuccess: true,
          onSuccess: () => push(routes.idea.path),
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard back={{}}>
      <TcPageTitle title='ثبت' />
      <TcForm form={form} onFinish={handelSubmit}>
        <TcFormWrapper>
          <TcFormItem label='عنوان' name='title' rules={[{ required: true, message: 'عنوان وارد نشده است' }]}>
            <TcInput placeholder='عنوان' />
          </TcFormItem>
          <TcFormItem label='دسته بندی ایده' name='ideaCategory' rules={[{ required: true, message: 'دسته بندی وارد نشده است' }]}>
            <TcSelectReduxSearch reducerListProperty='list' getlist={getAllIdeaCategories} reducerName='ideaCategory' />
          </TcFormItem>
          <TcFormItem label='برجسته (Featured)' name='featured' initialValue={false}>
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
          <TcFormItem label='متن' name='text' full>
            <TcTextarea placeholder='متن' />
          </TcFormItem>
        </TcFormWrapper>
      </TcForm>
      <TcDevider>ویدیو</TcDevider>
      <AddVideo videos={videos} setVideos={setVideos} />

      <TcDevider>عکس</TcDevider>
      <AddImage images={images} setImages={setImages} />

      <div className='flex flex-row-reverse mt-6'>
        <TcButton type='primary' onClick={() => form.submit()}>
          ثبت
        </TcButton>
      </div>
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default IdeaCreate;
