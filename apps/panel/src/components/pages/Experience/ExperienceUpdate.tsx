import { ApiDataResponse, IImage, IExperienceRead, IVideoRead, IExperience } from '@my/types';
import AddVideo from 'components/UI/Video/AddVideo';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useState, useEffect, useRef } from 'react';
import AddImage from 'components/UI/Image/AddImage';
import TcForm from 'components/UI/Form/TcForm';
import { Form } from 'antd';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import ApiService, { DOMAIN, errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import { AppDispatch } from 'redux/store';
import { useDispatch } from 'react-redux';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import { handleApiThen, handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import { useHistory } from 'react-router';
import routes from 'global/Constants/routes';
import useQuery from 'global/helperFunctions/useQuery';
import experienceModel from 'global/Models/experienceModel';
import RichTextEditor from 'components/UI/RichText/RichTextEditor';

const ExperienceUpdate = () => {
  //states
  const [videos, setVideos] = useState<IVideoRead[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [experienceDetail, setExperienceDetail] = useState<IExperienceRead>();

  //hooks
  const apiCatcher = useApiCatcher();
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { push } = useHistory();
  const { pathnameLastPart: id } = useQuery();
  const richTextRef: any = useRef();

  //effect
  useEffect(() => {
    id && getDetail(id);
  }, [id]);

  //function
  const getDetail = async (id: string) => {
    setLoading(true);
    await ApiService.get(endpointUrls.experienceDetail(id))
      .then((res: ApiDataResponse<IExperienceRead>) =>
        handleApiThenGeneric({
          res,
          onSuccessData: (data) => {
            let content: any;
            try {
              content = JSON.parse(data.article);
              content.blocks = Object.values(content.blocks).map((block: any) => {
                if (block.type === 'image') {
                  block.data.file.url = DOMAIN + block.data.file.url;
                }
                return block;
              });
            } catch (_error) {
              content = undefined;
            }
            setExperienceDetail({ ...data, article: content || undefined });
            form.setFieldsValue(data);
            form.setFieldValue('experienceCategory', data.experienceCategory._id);
            setImages(data.images);
            setVideos(data.videos);
          },
          dispatch,
          notifSuccess: false,
          notifFail: true,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const handleSubmit = async (values: any) => {
    if (videos.length + images.length === 0) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ عکس یا ویدیویی انتخاب نشده' }));
    setLoading(true);

    const richTextData = await richTextRef.current.save();
    const fixedImageUrlBlocks = richTextData.blocks.map((item: any) => {
      if (item.type !== 'image') return item;
      const tempItem = { ...item };
      tempItem.data.file.url = tempItem.data.file.url.replace(DOMAIN, '');
      return tempItem;
    });
    richTextData.blocks = { ...fixedImageUrlBlocks };

    const myJSONrRichTextData = JSON.stringify(richTextData);

    await ApiService.put(endpointUrls.experienceEdit(experienceDetail?._id || ''), {
      ...values,
      videos: videos.map((vid) => vid._id),
      images: images.map((img) => img._id),
      article: myJSONrRichTextData,
    })
      .then((res: ApiDataResponse<IExperience>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.experience.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));

    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.experience.path }}>
      <TcPageTitle title='ایجاد تجربه' />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>{experienceModel.inputs}</TcFormWrapper>
      </TcForm>
      <TcDevider>ویدیو</TcDevider>
      <AddVideo videos={videos} setVideos={setVideos} />

      <TcDevider>عکس</TcDevider>
      <AddImage images={images} setImages={setImages} />

      <TcDevider>مقاله</TcDevider>
      {experienceDetail && <RichTextEditor editorRef={richTextRef} initialData={experienceDetail.article} />}

      <TcFormButtons noCancel submitButtonText='ویرایش' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default ExperienceUpdate;
