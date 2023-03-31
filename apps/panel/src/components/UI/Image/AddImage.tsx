import { IImage } from '@my/types';
import { FC, memo, useState, useCallback } from 'react';
import PlusBox from 'components/UI/PlusBox/PlusBox';
import ImagePickerModal from 'components/UI/Image/ImagePickerModal';
import ImageItem from 'components/UI/Image/ImageItem';

interface IAddVideo {
  addImage: (_image: IImage) => void;
  images: IImage[];
  removeImage: (_id: string) => void;
}

const AddVideo: FC<IAddVideo> = ({ addImage, images, removeImage }) => {
  //states
  const [showImagePicker, setShowImagePicker] = useState<boolean>(false);

  //functions
  const toggleShowVideoPicker = useCallback(() => setShowImagePicker((prevState) => !prevState), []);

  return (
    <>
      <div className='flex flex-wrap items-center gap-4 my-4'>
        {images.map((img) => (
          <ImageItem image={img} key={img._id} onRemove={removeImage} size='large' />
        ))}
        <PlusBox onClick={toggleShowVideoPicker} />
      </div>
      <ImagePickerModal visible={showImagePicker} close={toggleShowVideoPicker} handlePick={addImage} />
    </>
  );
};

export default memo(AddVideo);
