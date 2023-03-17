import { FC } from 'react';
import { Link } from 'react-router-dom';
interface ISubmenuItem {
  to: string;
  isSelected: boolean;
  name: string;
  open?: boolean;
}
const SubmenuItem: FC<ISubmenuItem> = ({ to, isSelected, name, open }) => {
  return (
    <div className={`relative px-2 mb-2 transition-all duration-300 ease-out group ${!isSelected && 'hover:bg-t-layer-bg-color-hovered rounded-md'}`}>
      <Link to={to}>
        <div className={`flex items-center px-3 py-1 transition-all ease-out duration-300  rounded-md text-sm  ${isSelected && 'bg-t-faded-primary-color'}`}>
          {open && <div className='w-3' />}
          {open && name}
        </div>
      </Link>
      {isSelected && <div className='absolute top-0 w-1 h-full left-2 rounded-l-md bg-t-primary-color animate-scale'></div>}
    </div>
  );
};

export default SubmenuItem;
