import { separator } from 'global/default';

const StatViewLine = ({ title, number, percent, animate }) => {
  return (
    <div className='flex items-center w-full border-b gap-x-1 last:border-none'>
      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-between w-full text-xs '>
          <span className='block w-full overflow-hidden whitespace-nowrap overflow-ellipsis'>{title}</span>
        </div>
        <div className='flex items-center gap-2'>
          <div
            className='rounded-full transition-all duration-[2s] bg-t-primary-color opacity-40 min-w-[5%] grow-0'
            style={{ width: `${animate ? (percent + 5 > 100 ? 100 : percent + 5) : 0}%`, height: '3px' }}
          />
          <span className='text-[10px] whitespace-nowrap block text-t-secondary-text-color'>% {percent?.toFixed(2)}</span>
        </div>
      </div>
      <div className='flex'>
        <span className='text-base'>{typeof number === 'number' && separator(number)}</span>
      </div>
    </div>
  );
};

export default StatViewLine;
