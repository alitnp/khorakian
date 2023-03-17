import { Progress, ProgressProps } from 'antd';
import { FC } from 'react';

interface ITcProgress extends ProgressProps {
  percent: number;
  statusString: string;
  title: string;
}

const TcProgress: FC<ITcProgress> = ({ percent = 0, statusString, title, ...props }) => {
  //functions
  const getColor = () => {
    if (percent < 25) return 'var(--error-color)';
    if (percent < 50) return 'var(--warning-color)';
    if (percent < 75) return 'var(--secondary-color)';
    if (percent < 100) return 'var(--primary-color)';
    if (percent == 100) return 'var(--success-color)';
  };

  return (
    <div className='flex flex-col items-center mt-2'>
      <div className='h-20'>
        <Progress
          type='dashboard'
          percent={percent}
          gapDegree={140}
          format={() => <span className='text-sm text-t-text-color'>{statusString || percent + '%'}</span>}
          strokeColor={getColor()}
          {...props}
        />
      </div>
      {title && <p className='mt-2 mb-0 text-xs'>{title}</p>}
    </div>
  );
};

export default TcProgress;
