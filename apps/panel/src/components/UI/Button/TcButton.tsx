import { Button, ButtonProps } from 'antd';
import { FC } from 'react';

const TcButton: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <Button className={`text-center ${className} px-6  shadow-md `} style={{ minWidth: '130px' }} {...props}>
      {children}
    </Button>
  );
};

export default TcButton;
