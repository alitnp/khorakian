import TcCheckbox from 'components/UI/Checkbox/TcCheckbox';
import { FilterOutlined } from '@ant-design/icons';

const TableColumnFilter = ({ hiddenColumns, columns, handleColumnVisiblityChange }) => {
  return (
    <div className='flex items-center ml-auto w-fit gap-x-2'>
      <div className='relative group print:hidden'>
        <p className='flex items-center px-3 mb-0 text-xs rounded-full cursor-pointer bg-t-layer-bg-color group-hover:bg-t-layer-bg-color-hovered gap-x-1'>
          {hiddenColumns?.length > 0 && <FilterOutlined />}
          تغییر ستون ها
        </p>
        <div className='absolute opacity-0 max-h-0 group-hover:max-h-[250px] group-hover:opacity-100 transition-[opacity] duration-500 overflow-y-auto  border rounded-md right-0 shadow-xl bg-t-bg-color min-w-[100px] overflow-hidden z-10'>
          {/* <p className='sticky top-0 z-20 flex items-center h-6 pr-2 mb-0 text-xs border-b bg-t-bg-color'>فیلتر ستون ها</p> */}
          {columns?.map((item, index) => (
            <div
              key={item.title + index}
              className='flex items-center px-2 py-1 cursor-pointer gap-x-2 hover:bg-t-layer-bg-color'
              onClick={() => handleColumnVisiblityChange(item.title)}>
              <TcCheckbox name={item.title} checked={!hiddenColumns.includes(item.title)} />
              <label className='text-xs cursor-pointer whitespace-nowrap'>{item.title}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableColumnFilter;
