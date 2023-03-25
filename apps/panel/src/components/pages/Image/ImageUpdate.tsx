import { ApiDataResponse, IImage } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import useQuery from 'global/helperFunctions/useQuery';
import imageModel from 'global/Models/ImageModel';
import { FC, useEffect, useState, useCallback } from 'react';
import { handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import { AppDispatch } from 'redux/store';
import { useDispatch } from 'react-redux';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import ImageThumbnail from 'components/UI/Image/ImageThumbnail';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import { useHistory } from 'react-router-dom';
import { Form } from 'antd';

const ImageUpdate: FC = () => {
  //states
  const [loading, setLoading] = useState<boolean>(false);
  const [imageDetail, setImageDetail] = useState<IImage>();

  //hooks
  const { pathnameLastPart: id } = useQuery();
  const dispatch: AppDispatch = useDispatch();
  const apiCatcher = useApiCatcher();
  const { push } = useHistory();
  const [form] = Form.useForm();

  //effect
  useEffect(() => {
    id && getDetail(id);
  }, [id]);

  //functions
  const getDetail = async (id: string) => {
    setLoading(true);
    await ApiService.get(endpointUrls.imageDetail(id))
      .then((res: ApiDataResponse<IImage>) =>
        handleApiThenGeneric<ApiDataResponse<IImage>, IImage>({
          res,
          dispatch,
          notifFail: true,
          notifSuccess: false,
          onSuccessData: (data) => {
            setImageDetail(data);
            form.setFieldsValue(data);
          },
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };
  const handleSubmit = useCallback(async ({ title }: { title: string }) => {
    if (!id) return;
    setLoading(true);
    await ApiService.put(endpointUrls.imageEdit(id), { title })
      .then((res: ApiDataResponse<IImage>) =>
        handleApiThenGeneric<ApiDataResponse<IImage>, IImage>({ res, dispatch, notifFail: true, notifSuccess: true, onSuccess: () => push(routes.image.path) })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  }, []);

  return (
    <TcCard back={{ to: routes.image.path }}>
      <TcPageTitle title={'ویرایش ' + imageModel.title} />
      {imageDetail && (
        <>
          <div className='flex justify-center'>
            <ImageThumbnail image={imageDetail} />
          </div>
          <TcForm onFinish={handleSubmit} form={form}>
            <TcFormItem label='عنوان SEO' name='title' rules={[{ required: true, message: 'عنوان تعیین نشده' }]}>
              <TcInput />
            </TcFormItem>
            <TcFormButtons noCancel submitButtonText='ویرایش' />
          </TcForm>
        </>
      )}
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default ImageUpdate;
