import TcButton from 'components/UI/Button/TcButton';
import { FC } from 'react';

interface IButtonLabel {
  text?: string;
  buttonText: string;
  onClick?: () => void;
}

const ButtonLabel: FC<IButtonLabel> = ({ text, buttonText, onClick }) => {
  return (
    <div className='flex items-center border w-fit rounded-[6px] bg-gray-200/80'>
      <p className='px-3 m-0 whitespace-nowrap'>{text}</p>
      <div>
        <TcButton size='small' className='h-full' onClick={onClick}>
          {buttonText}
        </TcButton>
      </div>
    </div>
  );
};

export default ButtonLabel;
