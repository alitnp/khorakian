import { ButtonProps } from 'antd';
import TcButton from 'components/UI/Button/TcButton';
import { FC, ReactNode } from 'react';

interface ITcFormButtons {
  onCancel?: () => void;
  onSubmit?: () => void;
  onAdvanceClick?: () => void;
  isAdvanceOpen?: boolean;
  className?: string;
  advanceContent?: ReactNode;
  noCancel?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
  notPrimarySubmitButton?: boolean;
  loading?: boolean;
  submitButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const TcFormButtons: FC<ITcFormButtons> = ({
  advanceContent,
  onCancel,
  onSubmit,
  onAdvanceClick,
  isAdvanceOpen,
  className,
  noCancel,
  submitButtonText,
  cancelButtonText,
  notPrimarySubmitButton,
  loading,
  submitButtonProps,
  cancelButtonProps,
}) => {
  return (
    <>
      <div
        className={`transition-all duration-700 ease-in-out  col-span-full ${
          isAdvanceOpen ? 'max-h-[1000px] md:max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden -m-4 mt-2'
        }`}>
        {advanceContent}
      </div>
      <div className={`flex flex-col justify-between gap-4 my-6 sm:items-center sm:flex-row col-span-full ${className}`}>
        <div>
          {onAdvanceClick && (
            <p className='relative z-50 m-0 cursor-pointer text-t-primary-color hover:underline' onClick={onAdvanceClick}>
              {isAdvanceOpen ? 'بستن' : 'جستجو پیشرفته'}
            </p>
          )}
        </div>
        <div className='flex gap-x-4'>
          {!noCancel && (
            <TcButton onClick={onCancel} loading={loading} {...cancelButtonProps}>
              {cancelButtonText ? cancelButtonText : 'حذف فیلترها'}
            </TcButton>
          )}
          <TcButton type={!notPrimarySubmitButton ? 'primary' : 'default'} htmlType='submit' onClick={onSubmit} loading={loading} {...submitButtonProps}>
            {submitButtonText ? submitButtonText : 'جستجو'}
          </TcButton>
        </div>
      </div>
    </>
  );
};

export default TcFormButtons;
