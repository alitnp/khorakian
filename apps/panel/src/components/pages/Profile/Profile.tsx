import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import TcShowInfo from 'components/UI/ShowInfo/TcShowInfo';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import { RootState } from 'redux/store';

const Profile: FC = () => {
  const { userProfile } = useSelector((state: RootState) => state.profile);

  return (
    <>
      <TcCard>
        <TcPageTitle title='اطلاعات حساب کاربری' />
        <TcFormWrapper>
          <TcShowInfo right='نام' left={userProfile?.firstName} />
          <TcShowInfo right='نام خانوادگی' left={userProfile?.lastName} />
          <TcShowInfo right='شماره موبایل' left={userProfile?.mobileNumber} />
        </TcFormWrapper>
      </TcCard>
      {/* <TcCard>
        <TcPageTitle title='تغییر رمز عبور' subTitle={text.profile.password.desc} />
        <ChangePassword />
      </TcCard> */}
    </>
  );
};

export default Profile;
