import { IImage } from '@my/types';
import { moveItemInArray } from '@my/helpers';
import { FC, memo, useState, useCallback } from 'react';
import PlusBox from 'components/UI/PlusBox/PlusBox';
import ImagePickerModal from 'components/UI/Image/ImagePickerModal';
import ImageItem from 'components/UI/Image/ImageItem';
import TcCount from 'components/UI/Count/TcCount';
import { HomeOutlined } from '@ant-design/icons';

interface IAddVideo {
  images: IImage[];
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
  singleImage?: boolean;
}

const AddVideo: FC<IAddVideo> = ({ images, setImages, singleImage = false }) => {
  //states
  const [showImagePicker, setShowImagePicker] = useState<boolean>(false);

  //functions
  const toggleShowVideoPicker = useCallback(() => setShowImagePicker((prevState) => !prevState), []);
  const addImage = useCallback(
    (image: IImage) => {
      if (singleImage) setImages([image]);
      else
        setImages((images) => {
          if (images.some((img) => img._id === image._id)) return images;
          return [...images, image];
        });
    },
    [images]
  );
  const removeImage = useCallback(
    (_id: string) => {
      const tempImages = images.filter((img) => img._id !== _id);
      setImages([...tempImages]);
    },
    [images]
  );
  const handleReArrange = useCallback((oldIndex: number, newIndex: number) => setImages((images: IImage[]) => [...moveItemInArray(images, oldIndex, newIndex)]), [images]);

  return (
    <>
      <div className='flex flex-wrap items-center gap-4 my-4'>
        {images.map((img, index) => (
          <div key={img._id} className='flex flex-col items-center gap-1'>
            <div className={`${index === 0 && 'border border-t-secondary-color rounded-xl p-1'}`}>
              {!singleImage && <TcCount count={index} setCount={(newIndex: number) => handleReArrange(index, newIndex)} />}
              <ImageItem image={img} onRemove={removeImage} />
            </div>

            <span className={`text-t-secondary-color color-inherit ${index !== 0 ? 'opacity-0' : ''}`}>
              <HomeOutlined />
            </span>
          </div>
        ))}
        <PlusBox onClick={toggleShowVideoPicker} />
      </div>
      <ImagePickerModal visible={showImagePicker} close={toggleShowVideoPicker} handlePick={addImage} />
    </>
  );
};

export default memo(AddVideo);
