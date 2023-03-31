import { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';

interface IPlusBox {
  onClick(): void;
}

const PlusBox: FC<IPlusBox> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className='flex items-center justify-center w-12 h-12 border rounded-full cursor-pointer border-t-border-color-base bg-t-layer-bg-color hover:bg-t-layer-bg-color-hovered'>
      <PlusOutlined className='text-xl' />
    </div>
  );
};

export default PlusBox;
