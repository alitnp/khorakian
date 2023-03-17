import { Skeleton } from 'antd';

const TcSkeleton = ({ children, loading, ...props }) => {
  return (
    <Skeleton loading={loading} active {...props}>
      {children}
    </Skeleton>
  );
};

export default TcSkeleton;
