import { separator } from 'global/default';
import { useEffect, useState } from 'react';

const StatViewFill = ({ title, number, percent }) => {
  //state
  const [animate, setAnimate] = useState(false);

  //effect
  useEffect(() => {
    if (percent !== undefined)
      setTimeout(() => {
        setAnimate(true);
      }, 500);
  }, [percent]);

  return (
    <div className='relative flex items-center justify-between w-full h-6'>
      <p className='w-full m-0 overflow-hidden text-xs overflow-ellipsis whitespace-nowrap '>{title}</p>
      <p className='text-xs'>{separator(number)}</p>
      <div className='absolute top-0 right-0 h-full transition-all duration-[2s] opacity-[0.15] bg-t-primary-color' style={{ width: `${animate ? percent : 0}%` }} />
    </div>
  );
};

export default StatViewFill;
