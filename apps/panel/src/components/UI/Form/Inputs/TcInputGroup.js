import { Input } from 'antd';
import React from 'react';

const TcInputGroup = React.forwardRef(({ defaultValue, children, ...props }, ref) => (
  <Input.Group defaultValue={defaultValue} ref={ref} {...props}>
    {children}
  </Input.Group>
));

TcInputGroup.displayName = 'TcInputGroup';

export default TcInputGroup;
