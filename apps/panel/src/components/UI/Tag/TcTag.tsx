import { Tag, TagProps } from 'antd';
import React from 'react';

const TcTag: React.FC<TagProps> = ({ children, ...props }) => (
  <Tag {...props}>
    <div className='flex items-center text-t-text-color'> {children}</div>
  </Tag>
);

export default TcTag;
