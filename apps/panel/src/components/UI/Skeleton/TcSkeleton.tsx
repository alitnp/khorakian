import { Skeleton, SkeletonProps } from 'antd';
import { FC, ReactNode } from 'react';

interface ITcSkeleton extends SkeletonProps {
  children: ReactNode;
}

const TcSkeleton: FC<ITcSkeleton> = ({ children, ...props }) => {
  return (
    <Skeleton active {...props}>
      {children}
    </Skeleton>
  );
};

export default TcSkeleton;
