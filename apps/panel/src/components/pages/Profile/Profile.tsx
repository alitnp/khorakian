import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import TcShowInfo from 'components/UI/ShowInfo/TcShowInfo';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import { profile } from 'global/Models/UserModels';

const Profile: FC = () => {
  const { userProfile }: { userProfile: profile } = useSelector((state: any) => state.profile.value);

  return (
    <>
      <TcCard>
        <TcPageTitle title='اطلاعات حساب کاربری' />
        <TcFormWrapper>
          <TcShowInfo right='نام' left={userProfile?.mobileNumber} />
          <TcShowInfo right='نام خانوادگی' left={userProfile?.firstName} />
          <TcShowInfo right='آدرس ایمیل' left={userProfile?.email} />
          <TcShowInfo right='ایمیل تایید شده' left={userProfile?.emailConfirmed ? 'بله' : 'خیر'} />
          <TcShowInfo right='شماره موبایل' left={userProfile?.mobileNumber} />
          <TcShowInfo right='نام کاربری' left={userProfile?.userName} />
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
