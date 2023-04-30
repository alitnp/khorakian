import { IImage } from '@my/types';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import { DOMAIN } from 'config/API/ApiService';
import { FC, memo, useMemo } from 'react';

interface IImageThumbnail {
  image: IImage;
  imagePicker?: boolean;
  onSelect?: (_image: IImage) => void;
  onRemove?: (_id: string) => void;
  size?: 'large' | 'normal';
}

const ImageItem: FC<IImageThumbnail> = ({ image, onSelect, onRemove, size }) => {
  const imagePathname = useMemo<string>(() => {
    if (!image) return '';
    if (size === 'large') return DOMAIN + image.pathname;
    if (image.thumbnailPathname) return DOMAIN + image.thumbnailPathname;
    return DOMAIN + image.pathname;
  }, [image]);

  return (
    <div className={size === 'large' ? 'w-80' : 'w-36'}>
      {!onSelect && !onRemove && (
        <a href={DOMAIN + image.pathname} target='_blank' rel='noreferrer' className='cursor-zoom-in'>
          <img src={imagePathname} width={size === 'large' ? 320 : 144} className='object-cover object-center rounded-lg' />
        </a>
      )}
      {onSelect && (
        <img
          src={imagePathname}
          width={size === 'large' ? 320 : 144}
          onClick={() => onSelect(image)}
          className='object-cover object-center transition-all duration-300 rounded-lg cursor-pointer hover:scale-125'
        />
      )}
      {onRemove && (
        <div className='relative'>
          <img src={imagePathname} width={size === 'large' ? 320 : 144} className='object-cover object-center rounded-lg cursor-pointer' />
          <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity duration-300 opacity-0 bg-slate-800/30 hover:opacity-100'>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-t-bg-color'>
              <TcDeleteIcon onConfirm={() => onRemove(image._id)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ImageItem);
