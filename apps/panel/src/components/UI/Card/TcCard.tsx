import TcBack from 'components/UI/Back/TcBack';
import { FC, ReactNode } from 'react';

interface ITcCard {
  children: ReactNode;
  className?: string;
  helpKey?: string;
  back?: {
    to?: string;
    onClick?: () => void;
  };
}

const TcCard: FC<ITcCard> = ({ children, className, helpKey, back, ...props }) => {
  return (
    <>
      <div className={`flex w-full ${(back || helpKey) && 'mb-2 h-9'} print:hidden`}>
        {back && (
          <div className=''>
            <TcBack {...back} />
          </div>
        )}
      </div>
      <div
        {...props}
        className={`relative flex-grow-0 p-2 sm:p-5 pt-3 sm:pt-6 mx-auto mb-8 text-right bg-t-bg-color border border-t-border-color-base rounded-md shadow-lg ${className} print:flex-grow print:p-0 sm:print:p-0 print:border-none print:shadow-none `}>
        {children}
      </div>
    </>
  );
};

export default TcCard;
