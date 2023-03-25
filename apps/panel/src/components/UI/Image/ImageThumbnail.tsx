import { IImage } from '@my/types';
import { DOMAIN } from 'config/API/ApiService';
import { FC } from 'react';

interface IImageThumbnail {
  image: IImage;
}

const ImageThumbnail: FC<IImageThumbnail> = ({ image }) => {
  return (
    <div className='overflow-hidden rounded-lg w-36'>
      <a href={DOMAIN + image.pathname} target='_blank' rel='noreferrer' className='cursor-zoom-in'>
        <img src={DOMAIN + (image.thumbnailPathname ? image.thumbnailPathname : image.pathname)} width={144} className='object-cover object-center' />
      </a>
    </div>
  );
};

export default ImageThumbnail;
