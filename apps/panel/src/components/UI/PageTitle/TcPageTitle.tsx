import TcButton from 'components/UI/Button/TcButton';
import { Link } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import TcTab from 'components/UI/Tab/TcTab';
import { Helmet } from 'react-helmet-async';
import { FC, ReactNode, useEffect, useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import TcPopconfirm from '../Popconfirm/TcPopconfirm';

interface IButtons {
  text: string;
  onClick?: () => void;
  type?: 'button';
  to?: string;
  disabled?: boolean;
}

interface ITcPageTitle {
  errorIconColor?: boolean;
  disabled?: boolean;
  title?: string;
  subTitle?: string;
  buttonText?: string;
  to?: string;
  confirmText?: string;
  onClick?: () => void;
  onConfirm?: () => void;
  tabOptions?: {
    tabs: [];
    activeTab: string;
    onChange: () => void;
  };
  button?: IButtons[];
  otherItems?: ReactNode;
}

const TcPageTitle: FC<ITcPageTitle> = ({
  errorIconColor = false,
  disabled = false,
  title,
  subTitle,
  buttonText = 'جدید',
  to,
  button = [],
  onClick,
  onConfirm,
  confirmText,
  tabOptions,
  otherItems,
}) => {
  //states
  const [pageTitle, setPageTitle] = useState<string>();

  //effect
  useEffect(() => {
    setPageTitle(title);
  }, [title]);

  const haveTabs = tabOptions && tabOptions?.tabs?.length > 0;

  return (
    <div className={`${!haveTabs && 'mb-4'} border-t-border-color-base print:m-0 print:p-0`}>
      <Helmet>
        <title>{pageTitle || ''} | سامانه Level Up</title>
      </Helmet>
      <div className={` pb-4  ${!haveTabs && 'border-b'} shrink-0 print:p-0`}>
        <div className='flex flex-col gap-4 print:gap-0 sm:flex-row sm:justify-between sm:items-center'>
          <div className='md:ml-16 print:hidden'>
            <h1 className='my-0 text-lg font-bold text-t-primary-color'>{title}</h1>
            {subTitle && (
              <div className='flex items-center my-0 text-xs print:hidden'>
                <InfoCircleOutlined className={`ml-2 ${errorIconColor && 'text-t-error-color'}`} />
                {subTitle}
              </div>
            )}
          </div>
          <div className='hidden text-xs print:block'>
            <p className='m-0'>پنل مدیریتی - Level Up</p>
            <p className='m-0'>{new DateObject({ calendar: persian, locale: persian_fa }).format('HH:mm dddd YYYY/MM/DD')}</p>
          </div>
          <div className='print:hidden'>
            {button?.length > 0 && (
              <div className='flex flex-col gap-2 md:flex-row'>
                {button.map((item: IButtons, index) =>
                  item.type !== 'button' ? (
                    <Link key={index} to={item.to || ''}>
                      <TcButton disabled={item.disabled}>{item.text}</TcButton>
                    </Link>
                  ) : (
                    <TcButton disabled={item.disabled} key={index} onClick={item.onClick}>
                      {item.text}
                    </TcButton>
                  )
                )}
              </div>
            )}
            {to && (
              <Link to={to}>
                <TcButton disabled={disabled}>{buttonText}</TcButton>
              </Link>
            )}
            {otherItems && <>{otherItems}</>}
            {onClick && (
              <div>
                <TcButton disabled={disabled} onClick={onClick}>
                  {buttonText}
                </TcButton>
              </div>
            )}
            {onConfirm && (
              <TcPopconfirm onConfirm={onConfirm} title={confirmText}>
                <TcButton disabled={disabled}>{buttonText}</TcButton>
              </TcPopconfirm>
            )}
          </div>
        </div>
      </div>
      {tabOptions && tabOptions?.tabs?.length > 0 && <TcTab {...tabOptions} />}
    </div>
  );
};

export default TcPageTitle;
