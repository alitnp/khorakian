import { ButtonProps } from 'antd';
import TcButton from 'components/UI/Button/TcButton';
import { FC, ReactNode } from 'react';

interface ITcFormButtons {
  onCancel?: () => void;
  onSubmit?: () => void;
  className?: string;
  noCancel?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
  notPrimarySubmitButton?: boolean;
  loading?: boolean;
  submitButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const TcFormButtons: FC<ITcFormButtons> = ({
  onCancel,
  onSubmit,
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
      <div className={`flex flex-col justify-between gap-4 my-6 sm:items-center sm:flex-row col-span-full ${className}`}>
        <div></div>
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
