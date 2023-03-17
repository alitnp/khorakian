import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface IMenuHoverContentWrapper {
  name: string;
  children: ReactElement;
}
const MenuHoverContentWrapper: FC<IMenuHoverContentWrapper> = ({ name, children }) => {
  return (
    <div className='bg-t-bg-color hover:text-t-opposite-text-color'>
      <p className='pb-2 mb-2 text-center border-b border-gray-600 select-none'>{name}</p>
      {children}
    </div>
  );
};

export default MenuHoverContentWrapper;
