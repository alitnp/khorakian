import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IMenuHoverItem {
  name: string;
  to: string;
  isSelected: boolean;
}
const MenuHoverItem: FC<IMenuHoverItem> = ({ name, to, isSelected }) => {
  return (
    <Link to={to}>
      <div
        className={`transition-all relative duration-700 ease-out p-2 whitespace-nowrap rounded-md min-w-[150px] mb-1  ${
          isSelected ? 'bg-t-faded-primary-color text-t-text-color' : 'hover:bg-t-layer-bg-color'
        }`}>
        {name}
        {isSelected && <div className='absolute top-0 left-0 w-1 h-full rounded-l-md bg-t-primary-color animate-scale'></div>}
      </div>
    </Link>
  );
};

export default MenuHoverItem;
