import { Form, FormProps } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React from 'react';

interface IProps extends FormProps {
  children: React.ReactNode;
}

const TcForm = React.forwardRef<FormInstance, IProps>(({ children, className, ...props }, ref) => (
  <Form layout='vertical' className={`${className} print:hidden`} ref={ref} {...props}>
    {children}
  </Form>
));

TcForm.displayName = 'TcForm';

export default TcForm;
