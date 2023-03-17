import { FC } from 'react';

interface ITcNotFound {
  text: string;
}

const TcNotFound: FC<ITcNotFound> = ({ text }) => {
  return <div className='flex items-center justify-center w-full p-4 border border-t-border-color-base border-dashed'>{text}</div>;
};

export default TcNotFound;
