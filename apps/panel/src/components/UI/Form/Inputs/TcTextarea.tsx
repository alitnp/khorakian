import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input/TextArea';
import { FC } from 'react';
const { TextArea } = Input;

const TcTextarea: FC<TextAreaProps> = ({ ...props }) => {
  return <TextArea rows={3} {...props} />;
};

export default TcTextarea;
