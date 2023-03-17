import { Radio, RadioGroupProps } from 'antd';
import { FC } from 'react';

const TcRadioButton: FC<RadioGroupProps> = ({ ...props }) => {
  return <Radio.Group {...props} />;
};
export default TcRadioButton;
