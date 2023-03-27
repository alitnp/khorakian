import { IImage } from '@my/types';
import { DOMAIN } from 'config/API/ApiService';
import { FC, memo, useMemo } from 'react';

interface IImageThumbnail {
  image: IImage;
  imagePicker?: boolean;
  onClick?: (_image: IImage) => void;
  size?: 'large' | 'normal';
}

const ImageItem: FC<IImageThumbnail> = ({ image, imagePicker, onClick, size }) => {
  const imagePathname = useMemo<string>(() => {
    if (size === 'large') return DOMAIN + image.pathname;
    if (image.thumbnailPathname) return DOMAIN + image.thumbnailPathname;
    return DOMAIN + image.pathname;
  }, [image]);

  return (
    <div className={size === 'large' ? 'w-80' : 'w-36'}>
      {!imagePicker && (
        <a href={DOMAIN + image.pathname} target='_blank' rel='noreferrer' className='cursor-zoom-in'>
          <img src={imagePathname} width={size === 'large' ? 320 : 144} className='object-cover object-center rounded-lg' />
        </a>
      )}
      {imagePicker && (
        <img
          src={imagePathname}
          width={size === 'large' ? 320 : 144}
          onClick={() => onClick && onClick(image)}
          className='object-cover object-center transition-all duration-300 rounded-lg cursor-pointer hover:scale-125'
        />
      )}
    </div>
  );
};

export default memo(ImageItem);
