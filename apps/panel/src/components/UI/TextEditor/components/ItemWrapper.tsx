import { DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import { FC } from 'react';
import style from '../style.module.css';

interface IItemWrapper {
  handleDelete: () => void;
  moveItemDown?: () => void | undefined;
  moveItemUp?: () => void | undefined;
  appearingIndex: number[];
  index: number;
  disappearingIndex: number[];
  content: [{ content: string }];
  handleChange: (a: number, b: string) => void;
  type: 'title' | 'paragraph' | 'image';
  itemDetail: any;
}

const ItemWrapper: FC<IItemWrapper> = ({ handleDelete, moveItemDown, moveItemUp, appearingIndex, index, disappearingIndex, content, handleChange, type, itemDetail }) => (
  <div className='relative group'>
    <div className='absolute z-50 flex items-center cursor-pointer w-fit h-fit -left-2 -top-3'>
      {moveItemDown && (
        <div
          className='px-2 py-1 transition-all duration-300 ease-out scale-0 rounded-full shadow-lg cursor-pointer bg-t-bg-color group-hover:scale-90 hover:bg-t-layer-bg-color w-fit h-fit'
          onClick={moveItemDown}>
          <span className=' inherit-color'>
            <ArrowDownOutlined className='-translate-y-1' />
          </span>
        </div>
      )}
      {moveItemUp && (
        <div
          className='px-2 py-1 transition-all duration-300 ease-out scale-0 rounded-full shadow-lg cursor-pointer bg-t-bg-color group-hover:scale-90 hover:bg-t-layer-bg-color w-fit h-fit'
          onClick={moveItemUp}>
          <span className=' inherit-color'>
            <ArrowUpOutlined className='-translate-y-1' />
          </span>
        </div>
      )}
      {handleDelete && (
        <div
          className='px-2 py-1 transition-all duration-300 ease-out scale-0 rounded-full shadow-lg cursor-pointer bg-t-bg-color group-hover:scale-90 hover:bg-t-layer-bg-color w-fit h-fit'
          onClick={handleDelete}>
          <span className=' inherit-color text-t-error-color'>
            <DeleteOutlined className='-translate-y-1' />
          </span>
        </div>
      )}
    </div>

    <div className={`p-1 ${appearingIndex.includes(index) && style.appear} ${disappearingIndex.includes(index) && style.disappear}`}>
      {type === 'title' && (
        <TcTextarea
          autoSize
          rows={1}
          className={`${style.input} ${style.title}`}
          placeholder='عنوان...'
          value={content[index].content}
          onChange={(e) => handleChange(index, e.target.value.replace(/[\r\n\v]+/g, ''))}
        />
      )}
      {type === 'paragraph' && (
        <div>
          <TcTextarea
            autoSize
            className={` ${style.input} `}
            placeholder='پاراگراف...'
            value={content[index].content}
            onChange={(e) => {
              handleChange(index, e.target.value.replace(/[\r\n\v]+/g, ''));
            }}
          />
        </div>
      )}
      {itemDetail && type === 'image' && <img className='w-full' src={URL?.createObjectURL(itemDetail)} />}
    </div>
  </div>
);

export default ItemWrapper;
