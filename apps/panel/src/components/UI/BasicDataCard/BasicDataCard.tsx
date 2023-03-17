import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ITcCardNew {
  to: string;
  title?: string;
  description?: string;
}

const BasicDataCard: FC<ITcCardNew> = ({ title, to, description }) => {
  return (
    <Link to={to}>
      <div className='h-full p-1 transition-all duration-500 border rounded-md hover:shadow-md border-t-bg-color hover:bg-t-layer-bg-color hover:border-t-border-color-base'>
        <h3 className='font-bold text-t-primary-color group-hover:text-t-primary-color border-t-border-color-base text-md'>{title}</h3>
        <p className='m-0 text-2xs '>{description}</p>
      </div>
    </Link>
  );
};

export default BasicDataCard;
