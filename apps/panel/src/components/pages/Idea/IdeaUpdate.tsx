import TcCard from 'components/UI/Card/TcCard';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useQuery from 'global/helperFunctions/useQuery';
import TcForm from 'components/UI/Form/TcForm';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcButton from 'components/UI/Button/TcButton';
import { Form } from 'antd';
import { ApiDataListResponse, IIdea } from '@my/types';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcSelectReduxSearch from 'components/UI/Form/Inputs/TcSelectReduxSearch';
import { getAllIdeaCategories } from 'redux/reducer/IdeaCategory/getAllIdeaCategories';

const SurveyUpdate: FC = () => {
  //states
  const [loading, setLoading] = useState(true);
  const [_ideaDetail, setIdeaDetail] = useState<IIdea>();

  //hooks

  const { push, pathnameLastPart: id } = useQuery();
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();
  const [form] = Form.useForm();

  // effect
  useEffect(() => {
    if (id) getIdeaDetail(id);
  }, [id]);

  //functions
  const getIdeaDetail = async (id: string) => {
    setLoading(true);
    await ApiService.get(endpointUrls.ideaDetail(id))
      .then((res: ApiDataListResponse<IIdea>) =>
        handleApiThen({
          res,
          dispatch,
          notifSuccess: false,
          notifFail: true,
          onSuccess: (data: IIdea) => {
            form.setFieldsValue(data);
            setIdeaDetail(data);
          },
          dataOnly: true,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const handleEdit = async (values: any) => {
    if (!id) return;
    setLoading(true);
    await ApiService.put(endpointUrls.ideaEdit(id), { ...values, _id: id })
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
    <>
      <TcCard back={{}}>
        <TcPageTitle title='ویرایش ایده' />
        <TcForm form={form} onFinish={handleEdit}>
          <TcFormWrapper>
            <TcFormItem label='عنوان' name='title'>
              <TcInput placeholder='عنوان' />
            </TcFormItem>
            <TcFormItem label='دسته بندی ایده' name='ideaCategory'>
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
          <div className='flex justify-end mt-6'>
            <TcButton type='primary' htmlType='submit'>
              ثبت تغییرات
            </TcButton>
          </div>
        </TcForm>
        {loading && <TcCoverLoading />}
      </TcCard>
    </>
  );
};

export default SurveyUpdate;
