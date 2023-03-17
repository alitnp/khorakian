import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';

export type profile = {
  accessFailedCount: number;
  concurrencyStamp: string;
  creationDate: string;
  email: string;
  emailConfirmed: boolean;
  firebaseToken: string | null;
  firstName: string;
  id: number;
  isActive: boolean;
  lastLoginDate: string;
  lastName: string;
  lastOtpSentDate: string | null;
  lockoutEnabled: boolean;
  lockoutEnd: boolean | null;
  mobileNumber: string;
  normalizedEmail: string;
  normalizedUserName: string;
  otpCode: string | null;
  passwordHash: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  referrerUser: string | null;
  referrerUserId: number | null;
  remainingPips: number | null;
  securityStamp: string;
  twoFactorEnabled: boolean;
  userName: string;
};

export type user = {
  id: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  firebaseToken: string;
  lastOtpSentDate: string;
  otpCode: string;
  remainingPips: number;
  userName: string;
  fullName: string;
  refererName: string;
  refererId: string;
  persianCreationDateTime: string;
};

export const userColumns = [
  {
    title: 'نام',
    key: 'firstName',
    dataIndex: 'firstName',
  },
  {
    title: 'نام خانوادگی',
    key: 'lastName',
    dataIndex: 'lastName',
  },
  {
    title: 'شماره همراه',
    key: 'mobileNumber',
    dataIndex: 'mobileNumber',
  },
  {
    title: 'پیپ باقی مانده',
    key: 'remainingPip',
    dataIndex: 'remainingPip',
  },
  {
    title: 'فرد معرف',
    key: 'refererName',
    dataIndex: 'refererName',
  },
];

export const userFilterItems = (
  <>
    <TcFormItem label='نام' name='firstName'>
      <TcInput />
    </TcFormItem>
    <TcFormItem label='نام خانوادگی' name='lastName'>
      <TcInput />
    </TcFormItem>
    <TcFormItem label='شماره همراه' name='mobileNumber'>
      <TcInput />
    </TcFormItem>
  </>
);
