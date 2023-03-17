import { FC } from 'react';

interface IAddItemButton {
  title: string;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const AddItemButton: FC<IAddItemButton> = ({ title, handleClick, className }) => (
  <div
    className={`px-3 py-1 text-xs transition-all duration-300 rounded-full shadow-md cursor-pointer bg-t-bg-color dark:bg-t-layer-bg-color hover:bg-t-layer-bg-color dark:hover:bg-t-layer-bg-color-hovered hover:shadow-md border ${className}`}
    onClick={handleClick}>
    {title}
  </div>
);

export default AddItemButton;
