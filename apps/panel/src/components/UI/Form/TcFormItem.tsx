import { Form, FormItemProps } from 'antd';
import { FC } from 'react';

interface IProps extends FormItemProps {
  full?: boolean;
  button?: boolean;
}

const TcFormItem: FC<IProps> = ({ label, name, rules, className, initialValue, full, button, children, ...props }) => {
  return (
    <Form.Item
      initialValue={initialValue}
      className={`mb-2 ${full && 'col-span-full w-full'} ${button && 'col-span-full  w-full mt-2  pt-4 text-left mb-0'} ` + className}
      label={label}
      name={name}
      rules={rules}
      {...props}>
      {children}
    </Form.Item>
  );
};

export default TcFormItem;
