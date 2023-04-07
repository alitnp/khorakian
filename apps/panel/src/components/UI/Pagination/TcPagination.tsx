import { Pagination, PaginationProps } from 'antd';
import classes from 'assets/css/global.module.css';
import { separator } from 'global/default';
import { FC, memo } from 'react';

interface ITcPagination extends PaginationProps {
  onPaginationHandler: (_pageNumber?: number, _pageSize?: number) => void;
}

type pageItemType = 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';

const TcPagination: FC<ITcPagination> = ({ className, responsive, total = 0, current = 1, onPaginationHandler, pageSize = 10, ...props }) => {
  const onChangeHandler = (page: number, pageSize: number) => {
    onPaginationHandler(page, pageSize);
  };

  const maxPageNumber = Math.ceil(total / pageSize);
  const handleItemRender = (page: number, type: pageItemType, originalElement: React.ReactNode) => {
    if (type === 'page') return <>{separator(page)}</>;
    return originalElement;
  };

  return (
    <>
      <div className='hidden print:block'>{`صفحه ${current} از ${maxPageNumber || 1}`}</div>
      <div className='print:hidden'>
        <Pagination
          showLessItems={true}
          pageSizeOptions={[10, 20, 30, 50]}
          pageSize={pageSize}
          className={`${classes['t-TcPagination-li-btn']} text-left ${className}`}
          itemRender={handleItemRender}
          responsive={responsive}
          defaultCurrent={1}
          current={current}
          onChange={onChangeHandler}
          total={total}
          showSizeChanger={total > 10}
          size='small'
          {...props}
        />
      </div>
    </>
  );
};

export default memo(TcPagination);
