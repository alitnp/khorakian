import { Form } from 'antd';
import NotificationDetail from 'components/pages/Notification/components/NotificationDetail';
import NotificationsFilters from 'components/pages/Notification/filter/NotificationsFilters';
import CollapseWrapper from 'components/UI/CollapseWrapper/CollapseWrapper';
import TcPagination from 'components/UI/Pagination/TcPagination';
import TcTable from 'components/UI/Table/TcTable';
import TcDetailIcon from 'components/UI/TableIcons/TcDetailIcon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationList } from 'redux/reducer/Notification/getNotificationList';

const NotificationList = () => {
  //states
  const { notificationList, loading } = useSelector((state) => state.notification);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(notificationList?.pageNumber || 1);
  const [showDetail, setShowDetail] = useState();

  //hooks
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  //effects
  useEffect(() => {
    !notificationList && handleSearch();
  }, []);

  //functions
  const handlePagination = (pageNumber, pageSize) => {
    setPageSize(pageSize);
    setPageNumber(pageNumber);
    handleSearch(pageNumber, pageSize);
  };
  const handleSearch = (pageNumber, pageSize) => {
    const payload = { ...form.getFieldsValue(), pageNumber, pageSize };
    dispatch(getNotificationList(payload));
  };

  //constants
  const columns = [
    {
      title: 'گیرنده',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'عنوان',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'دیده شده',
      render: (_text, record) => (record.seen ? 'بلی' : 'خیر'),
    },
    {
      title: 'ارسال پیامک',
      render: (_text, record) => (record.sendSMS ? 'بلی' : 'خیر'),
    },
    {
      title: 'اپ موبایل',
      render: (_text, record) => (record.sendSMS ? 'بلی' : 'خیر'),
    },

    { title: 'عملیات', render: (_text, record) => <TcDetailIcon onClick={() => setShowDetail(record)} tooltip='جزئیات اعلان' /> },
  ];

  return (
    <div className=''>
      <CollapseWrapper>
        <NotificationsFilters form={form} handleSubmit={() => handleSearch(pageNumber, pageSize)} />
      </CollapseWrapper>
      <TcTable dataSource={notificationList?.data} columns={columns} loading={loading} count={notificationList?.totalItems} pageSize={pageSize} current={pageNumber} />
      <TcPagination pageSize={pageSize} current={pageNumber} total={notificationList?.totalItems} onPaginationHandler={handlePagination} showSizeChanger />
      <NotificationDetail close={() => setShowDetail()} detail={showDetail} />
    </div>
  );
};

export default NotificationList;
