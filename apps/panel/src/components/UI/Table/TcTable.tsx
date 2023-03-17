import { Table } from 'antd';
import { FC, useState } from 'react';
import { tableRowIndex } from 'global/helperFunctions/tableRowIndex';
import TableColumnFilter from 'components/UI/Table/TableColumnFilter';
import { RedoOutlined, PrinterOutlined } from '@ant-design/icons';
import { separator } from 'global/default';
import { ITableColumn } from 'global/Models/globalModels';
import { DateObject } from 'react-multi-date-picker';
import { dateObjectFormatter } from 'global/helperFunctions/dateFormatter';

interface ITcTable {
  columns: ITableColumn[];
  dataSource: any[];
  loading?: boolean;
  overflow?: boolean;
  className?: string;
  current?: number;
  pageSize?: number;
  count?: number;
  refetch?: () => void;
  noInfoBar?: boolean;
  noCreationDate?: boolean;
  rowKey?: string;
}

const TcTable: FC<ITcTable> = ({
  loading,
  overflow = true,
  className,
  current = 1,
  pageSize = 10,
  columns,
  count,
  dataSource,
  refetch,
  noInfoBar,
  noCreationDate,
  rowKey = 'id',
  ...props
}) => {
  //status
  const [hiddenColumns, setHiddenColumns] = useState<string[]>(['فرد ثبت کننده', 'تاریخ آخرین ویرایش', 'فرد ویرایش کننده']);

  const defaultColumns: ITableColumn[] = [
    {
      title: 'ردیف',
      width: 16,
      render: (_text, _record, index) => tableRowIndex(index, current, pageSize),
    },
  ];

  if (!noCreationDate && dataSource && (dataSource[0]?.creationDate || dataSource[0]?.creationTime))
    defaultColumns.push({
      title: 'تاریخ ثبت',
      key: 'creationDate',
      render: (_text: any, record: any): string => (record?.creationDate || '') + ' ' + (record?.creationTime || ''),
    });

  const tableColumns = [
    ...defaultColumns,
    ...columns.map((col) => ({
      ...col,
      dataIndex: col.key,
    })),
  ];

  if (
    dataSource &&
    (dataSource[0]?.creationDate ||
      dataSource[0]?.creationTime ||
      dataSource[0]?.creator ||
      dataSource[0]?.modificationDate ||
      dataSource[0]?.modificationTime ||
      dataSource[0]?.modifier)
  )
    tableColumns.push(
      {
        title: 'فرد ثبت کننده',
        key: 'creator',
        render: (_text, record: any): string => `${record?.creator || ''}`,
      },
      {
        title: 'تاریخ آخرین ویرایش',
        key: 'modificationDate',
        render: (_text, record: any) => (record?.modificationDate || '') + ' ' + (record?.modificationTime || ''),
      },
      {
        title: 'فرد ویرایش کننده',
        key: 'modifier',
        render: (_text, record: any) => `${record?.modifier || ''}`,
      }
    );

  const handleColumnVisiblityChange = (title: string) => {
    if (hiddenColumns.includes(title)) setHiddenColumns(hiddenColumns.filter((item) => item !== title));
    else setHiddenColumns([...hiddenColumns, title]);
  };

  const handlePrint = () => window.print();

  return (
    <div className='grid mb-4 print:mb-0 print:w-full' style={{ pageBreakInside: 'auto', breakInside: 'auto' }}>
      {!noInfoBar && (
        <div className='flex items-center mb-1'>
          <TableColumnFilter hiddenColumns={hiddenColumns} columns={[...tableColumns]} handleColumnVisiblityChange={handleColumnVisiblityChange} />
          <div className='flex gap-x-3 '>
            {refetch && (
              <div
                className='flex items-center text-xs cursor-pointer print:hidden gap-x-1 text-t-secondary-text-color inherit-color w-fit'
                onClick={() => {
                  !loading && refetch();
                }}>
                <RedoOutlined className={`${loading && 'animate-spin'}`} />
                <span>بروز رسانی</span>
              </div>
            )}
            <div className='flex items-center text-xs cursor-pointer print:hidden gap-x-1 text-t-secondary-text-color inherit-color w-fit' onClick={handlePrint}>
              <PrinterOutlined />
              <span>پرینت</span>
            </div>
            {!!count && count > 0 && (
              <span className='text-xs print:text-black' style={{ color: 'var(--text-color-secondary)' }}>
                {'تعداد کل :' + separator(count)}
              </span>
            )}
          </div>
        </div>
      )}
      <div className={` print:w-full ${overflow && 'overflow-x-auto print:overflow-x-visible'} relative`}>
        <Table
          rowKey={rowKey}
          bordered
          loading={loading}
          size='small'
          pagination={false}
          className={`${className}`}
          columns={tableColumns.filter((item) => !hiddenColumns.includes(item.title))}
          dataSource={dataSource}
          // scroll={dataSource?.length && { x: 300 }}
          // current={current}
          // pageSize={pageSize}

          {...props}
        />
      </div>
    </div>
  );
};

export default TcTable;
