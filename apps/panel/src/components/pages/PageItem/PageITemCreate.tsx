import { ApiDataResponse, IPageItemRead } from '@my/types';
import { Form } from 'antd';
import TcCard from 'components/UI/Card/TcCard';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import TcSelectReduxSearch from 'components/UI/Form/Inputs/TcSelectReduxSearch';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import pageItemModel from 'global/Models/pageItemModel';
import { convertFormValuesToEnglishNumber } from 'global/default';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getAllPageItemSortings } from 'redux/reducer/PageItemSorting/getAllpageItemSortings';
import { getAllPageItemStyles } from 'redux/reducer/PageItemStyle/getAllpageItemStyles';
import { getAllPageItemTypes } from 'redux/reducer/PageItemType/getAllpageItemTypes';
import { AppDispatch, RootState } from 'redux/store';

const PageITemCreate: FC = () => {
  //states
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const apiCatcher = useApiCatcher();
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { push } = useHistory();

  //function

  const handleSubmit = async (values: any) => {
    setLoading(true);
    await ApiService.post(endpointUrls.pageItemCreate, { ...values })
      .then((res: ApiDataResponse<IPageItemRead>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.pageItem.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const handleChange = (value: any, values: any) => {
    convertFormValuesToEnglishNumber(value, values, ['index'], form, false);
  };

  return (
    <TcCard back={{ to: routes.pageItem.path }}>
      <TcPageTitle title={'ایجاد ' + pageItemModel.title} />
      <TcForm form={form} onFinish={handleSubmit} onValuesChange={handleChange}>
        <TcFormWrapper>
          <TcFormItem name='title' label='عنوان اصلی' rules={[{ required: true, message: 'عنوان اصلی تعیین نشده' }]}>
            <TcInput placeholder='عنوان اصلی' />
          </TcFormItem>
          <TcFormItem name='subTitle' label='عنوان فرعی'>
            <TcInput placeholder='عنوان فرعی' />
          </TcFormItem>
          <TcFormItem name='index' label='ردیف'>
            <TcInput placeholder='ردیف' />
          </TcFormItem>
          <TcFormItem name='type' label='نوع' rules={[{ required: true, message: 'نوع تعیین نشده' }]}>
            <TcSelectReduxSearch reducerName='pageItemType' getlist={getAllPageItemTypes} reducerListProperty='list' placeholder='نوع' />
          </TcFormItem>
          <TcFormItem name='sorting' label='ترتیب'>
            <TcSelectReduxSearch reducerName='pageItemSorting' getlist={getAllPageItemSortings} reducerListProperty='list' placeholder='ترتیب' />
          </TcFormItem>
          <TcFormItem name='style' label='ظاهر' rules={[{ required: true, message: 'نوع تعیین نشده' }]}>
            <TcSelectReduxSearch reducerName='pageItemStyle' getlist={getAllPageItemStyles} reducerListProperty='list' placeholder='ظاهر' />
          </TcFormItem>
          <TcFormItem name='isPublished' label='فعال' initialValue={true}>
            <TcSelect
              options={[
                //@ts-ignore
                { label: 'بله', value: true },
                //@ts-ignore
                { label: 'خیر', value: false },
              ]}
            />
          </TcFormItem>
        </TcFormWrapper>
      </TcForm>

      <TcFormButtons noCancel submitButtonText='ثبت' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default PageITemCreate;