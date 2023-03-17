import { FC, ReactNode } from 'react';

interface ITcFormWrapper {
  twoColumn?: boolean;
  singleColumn?: boolean;
  threeColumn?: boolean;
  children: ReactNode;
  className?: string;
}

const TcFormWrapper: FC<ITcFormWrapper> = ({ twoColumn, singleColumn, threeColumn, children, className }) => {
  return (
    <div
      className={`print:grid print:grid-cols-2 md:grid ${twoColumn ? 'grid-cols-2' : 'grid-cols-1'} gap-x-4 ${!singleColumn && 'md:grid-cols-2'} ${
        threeColumn && 'md:grid-cols-3'
      } ${className}`}>
      {children}
    </div>
  );
};

export default TcFormWrapper;
