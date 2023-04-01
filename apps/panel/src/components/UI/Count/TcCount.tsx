import { FC, memo } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

interface ITcCount {
  count: number;
  setCount: (_count: number) => void;
}

const TcCount: FC<ITcCount> = ({ count, setCount }) => {
  return (
    <div className='flex items-center justify-center w-full my-1'>
      <div
        className='flex items-center justify-center w-6 h-6 text-xs border rounded-full border-t-border-color-base hover:border-t-secondary-color'
        onClick={() => setCount(count === 0 ? 0 : count - 1)}>
        <MinusOutlined />
      </div>
      <span className='mx-4'>{count}</span>
      <div
        className='flex items-center justify-center w-6 h-6 text-xs border rounded-full border-t-border-color-base hover:border-t-secondary-color'
        onClick={() => setCount(count + 1)}>
        <PlusOutlined />
      </div>
    </div>
  );
};

export default memo(TcCount);
