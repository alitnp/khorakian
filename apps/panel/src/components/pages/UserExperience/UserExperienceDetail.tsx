import { ApiDataResponse, IUserExperienceRead } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import useQuery from 'global/helperFunctions/useQuery';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const UserExperienceDetail: FC = () => {
  //states
  const [detail, setDetail] = useState<IUserExperienceRead>();
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const { pathnameLastPart: id } = useQuery();
  const dispatch = useDispatch();
  const apiCathcer = useApiCatcher();

  //effect
  useEffect(() => {
    id && getDetail(id);
  }, [id]);

  //functions
  const getDetail = async (id: string) => {
    setLoading(true);
    await ApiService.get(endpointUrls.userExperienceDetail(id))
      .then((res: ApiDataResponse<IUserExperienceRead>) =>
        handleApiThenGeneric<ApiDataResponse<IUserExperienceRead>, IUserExperienceRead>({ res, dispatch, notifFail: true, notifSuccess: false, onSuccessData: setDetail })
      )
      .catch(() => apiCathcer(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.userExperience.path }}>
      <TcPageTitle title='جزئیات تجربه کاربر' />
      <h1 className='mb-4 text-2xl font-bold'>{detail?.title}</h1>
      <p>{detail?.text}</p>
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default UserExperienceDetail;
