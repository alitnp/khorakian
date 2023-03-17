import { Drawer, DrawerProps } from 'antd';
import { FC } from 'react';

const TcDrawer: FC<DrawerProps> = ({ children, ...props }) => {
  return <Drawer {...props}>{children}</Drawer>;
};

export default TcDrawer;
