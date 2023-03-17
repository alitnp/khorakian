import { Popconfirm, PopconfirmProps } from 'antd';
import { FC, ReactNode } from 'react';

interface ITcPopconfirm extends PopconfirmProps {
  children: ReactNode;
}

const TcPopconfirm: FC<ITcPopconfirm> = ({ children, ...props }) => {
  return <Popconfirm {...props}>{children}</Popconfirm>;
};

export default TcPopconfirm;
