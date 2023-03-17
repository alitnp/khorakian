import { Select, SelectProps } from 'antd';
import { FC } from 'react';
const { Option } = Select;

interface ITcSelect extends SelectProps {
  isSort?: boolean;
  items?: [{ id: number; title: string }];
}

const TcSelect: FC<ITcSelect> = ({ isSort = true, placeholder = 'انتخاب کنید', items = [], children, ...props }) => {
  const newItems = isSort ? items?.sort((a, b) => (a.title > b.title ? 1 : -1)) : [];

  return (
    <Select
      placeholder={placeholder}
      optionFilterProp={newItems.length > 0 ? 'children' : 'label'}
      filterOption={(input, option) => ((newItems.length > 0 ? option!.children : option!.label) as unknown as string).toLowerCase().includes(input.toLowerCase())}
      {...props}>
      {newItems &&
        newItems?.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.title}
          </Option>
        ))}
      {children}
    </Select>
  );
};

export default TcSelect;
