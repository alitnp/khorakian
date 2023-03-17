import { Input, InputProps } from 'antd';
import { InputRef } from 'antd/es/input/Input';
import React from 'react';

const TcInput = React.forwardRef<InputRef, InputProps>(({ defaultValue, ...props }, ref) => <Input defaultValue={defaultValue} ref={ref} {...props} />);

TcInput.displayName = 'TcInput';

export default TcInput;
