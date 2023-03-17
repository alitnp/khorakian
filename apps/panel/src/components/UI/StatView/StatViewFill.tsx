import { separator } from 'global/default';
import { FC, useEffect, useState } from 'react';

interface IStatViewFill {
  title: string;
  number: number;
  percent: number;
}

const StatViewFill: FC<IStatViewFill> = ({ title, number, percent }) => {
  //state
  const [animate, setAnimate] = useState<boolean>(false);

  //effect
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (percent !== undefined) setAnimate(true);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [percent]);

  return (
    <div className='relative flex items-center justify-between w-full h-6'>
      <div className='absolute top-0 right-0 h-full transition-all duration-[2s] opacity-[0.15] bg-t-primary-color' style={{ width: `${animate ? percent : 0}%` }} />
      <p className='absolute right-0 w-full m-0 overflow-hidden text-xs -translate-y-1/2 top-1/2 overflow-ellipsis whitespace-nowrap '>{title}</p>
      <p className='absolute left-0 text-xs -translate-y-1/2 top-1/2'>{separator(number)}</p>
    </div>
  );
};

export default StatViewFill;
