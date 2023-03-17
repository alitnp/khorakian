import AddItemButton from 'components/UI/TextEditor/components/AddItemButton';
import  { FC } from 'react';

interface IMidElementButtons {
  addTitle: (a: number) => void;
  addParagraph: (a: number) => void;
  setImageInputIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  showImageInput: (a: number) => void;
  index: number;
}

const MidElementButtons: FC<IMidElementButtons> = ({ addTitle, addParagraph, setImageInputIndex, showImageInput, index }) => {
  return (
    <div className='flex items-center group h-4 hover:h-8 transition-[height] duration-300'>
      <div className='z-50 flex items-center justify-center w-5 h-5 transition-all duration-300 rounded-full opacity-0 select-none bg-t-primary-color hover:shadow-md group-hover:opacity-100 '>
        <p className='mb-0 translate-y-[1.5px] text-t-opposite-text-color'>+</p>
      </div>
      <AddItemButton title='عنوان' handleClick={() => addTitle(index)} className='transition-all duration-300 scale-75 opacity-0 group-hover:opacity-100' />
      <AddItemButton title='پاراگراف' handleClick={() => addParagraph(index)} className='-mr-2 transition-all duration-300 scale-75 opacity-0 group-hover:opacity-100' />
      <AddItemButton
        title='عکس'
        handleClick={() => {
          setImageInputIndex(index);
          showImageInput(index);
        }}
        className='-mr-2 transition-all duration-300 scale-75 opacity-0 group-hover:opacity-100'
      />
    </div>
  );
};

export default MidElementButtons;
