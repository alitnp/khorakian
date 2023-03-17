import { Checkbox, CheckboxProps } from 'antd';
import { FC } from 'react';

interface ITcCheckbox extends CheckboxProps {}

const TcCheckbox: FC<ITcCheckbox> = ({ ...props }) => {
  return <Checkbox {...props} />;
};

export default TcCheckbox;
