import { FC, ReactNode } from 'react';

interface IDataCard {
  className?: string;
  loading?: boolean;
  children?: ReactNode;
}

const DataCard: FC<IDataCard> = ({ className, loading, children }) => {
  return <div className={` justify-start p-3 bg-t-bg-color border rounded-md shadow-md ${className} ${loading && 'skeleton-box'}`}>{children}</div>;
};

export default DataCard;
