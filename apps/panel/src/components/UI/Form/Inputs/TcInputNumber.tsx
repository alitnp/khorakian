import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';

const TcInputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(({ defaultValue, ...props }, ref) => <InputNumber defaultValue={defaultValue} ref={ref} {...props} />);

TcInputNumber.displayName = 'TcInputNumber';

export default TcInputNumber;
