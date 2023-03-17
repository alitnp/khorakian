import { FC, useEffect, useState } from 'react';
import { useRef } from 'react';
import TcButton from 'components/UI/Button/TcButton';
import ItemWrapper from 'components/UI/TextEditor/components/ItemWrapper';
import AddItemButton from 'components/UI/TextEditor/components/AddItemButton';
import { addImageFunction, addParagraphFunction, addTitleFunction, moveItemDownFunction, moveItemUpFunction } from 'components/UI/TextEditor/components/textEditorFunctions';
import MidElementButtons from 'components/UI/TextEditor/components/MidElementButtons';
import { EyeOutlined } from '@ant-design/icons';
import ArticlePreview from 'components/UI/TextEditor/components/ArticlePreview';

interface ITcTextEditor {
  handleSubmit?: () => void;
  onChange?: (a: () => void) => void;
  title: string;
  setValue?: any;
}

const TcTextEditor: FC<ITcTextEditor> = ({ handleSubmit, onChange, title, setValue }) => {
  //states
  const [content, setContent] = useState<any>(
    !!setValue && setValue?.length > 0
      ? setValue
      : [
          {
            type: 'title',
            articleElementTypeId: 1,
            content: '',
          },
        ]
  );
  const [imageInputIndex, setImageInputIndex] = useState<number | undefined>(undefined);
  const [disappearingIndex, setDisappearingIndex] = useState<number[]>([]);
  const [appearingIndex, setAppearingIndex] = useState<number[]>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  //ref
  const wrapper = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //effect
  useEffect(() => {
    setImageInputIndex(undefined);
    onChange && onChange(cleanContent());
  }, [content]);
  useEffect(() => {
    if (appearingIndex.length > 0)
      setTimeout(() => {
        setAppearingIndex([]);
      }, 500);
  }, [appearingIndex]);
  useEffect(() => {
    if (disappearingIndex.length > 0)
      setTimeout(() => {
        setDisappearingIndex([]);
      }, 500);
  }, [disappearingIndex]);

  //functions
  const addTitle = (index?: number | undefined) => addTitleFunction(index, content, setContent, setAppearingIndex);
  const addParagraph = (index?: number | undefined) => addParagraphFunction(index, setAppearingIndex, content, setContent);
  const addImage = (value?: any) => addImageFunction(value, setImageInputIndex, imageInputIndex, content, setContent, setAppearingIndex, fileInputRef);
  const showImageInput = () => fileInputRef?.current?.click();
  const deleteElement = (index: number) => setContent(content.filter((_item: any, idx: number) => idx !== index));
  const handleChange = (index: number, value: string) => {
    const tempContent = [...content];
    tempContent[index].content = value;
    setContent(tempContent);
  };
  const moveItemDown = (index: number | undefined) => moveItemDownFunction(index, disappearingIndex, setDisappearingIndex, content, setContent, setAppearingIndex);
  const moveItemUp = (index: number | undefined) => moveItemUpFunction(index, disappearingIndex, setDisappearingIndex, content, setContent, setAppearingIndex);
  const cleanContent = () => content.filter((item: any) => !!item.content);
  const handleFinish = () => {
    const finalData = cleanContent();
    if (finalData?.length === 0) return;
    handleSubmit && handleSubmit();
  };
  const togglePreview = () => {
    if (showPreview) return setShowPreview(false);
    if (cleanContent().length > 0) setShowPreview(true);
  };

  return (
    <div className='mt-6'>
      <div className='flex flex-col items-center justify-between gap-4 mb-2 sm:items-center sm:flex-row'>
        {title && <h3 className='m-0 text-base font-medium text-t-text-color'>{title}</h3>}
        <div className='flex items-center gap-x-2'>
          <AddItemButton title='+ عنوان' handleClick={() => addTitle()} />
          <AddItemButton title='+ پاراگراف' handleClick={() => addParagraph()} />
          <AddItemButton title='+ عکس' handleClick={() => showImageInput()} />
        </div>
      </div>
      <div className='w-full min-h-[100px] transition-all duration-1000 ease-linear rounded-md bg-t-body-bg p-4 py-16 border shadow-inner relative ' ref={wrapper}>
        <div className='max-w-[700px] mx-auto'>
          {content.map((item: any, index: number) => (
            <div key={item.key}>
              <ItemWrapper
                handleDelete={() => {
                  setDisappearingIndex([index]);
                  setTimeout(() => {
                    deleteElement(index);
                  }, 500);
                }}
                moveItemDown={index !== content?.length - 1 ? () => moveItemDown(index) : undefined}
                moveItemUp={index > 0 ? () => moveItemUp(index) : undefined}
                appearingIndex={appearingIndex}
                index={index}
                disappearingIndex={disappearingIndex}
                content={content}
                itemDetail={item.content}
                type={item.type}
                handleChange={handleChange}
              />
              <MidElementButtons addTitle={addTitle} addParagraph={addParagraph} setImageInputIndex={setImageInputIndex} showImageInput={showImageInput} index={index} />
            </div>
          ))}
          <input type='file' className='hidden' ref={fileInputRef} onChange={addImage} />
        </div>
        <div className='absolute flex items-center p-2 text-xs rounded-md cursor-pointer top-2 left-2 gap-x-1 bg-t-body-bg hover:bg-t-bg-color' onClick={togglePreview}>
          <EyeOutlined /> پیش نمایش
        </div>
      </div>
      <ArticlePreview content={cleanContent()} close={togglePreview} visible={showPreview} />
      {handleSubmit && (
        <div className='flex justify-end mt-4'>
          <TcButton type='primary' onClick={handleFinish}>
            ثبت
          </TcButton>
        </div>
      )}
    </div>
  );
};

export default TcTextEditor;
