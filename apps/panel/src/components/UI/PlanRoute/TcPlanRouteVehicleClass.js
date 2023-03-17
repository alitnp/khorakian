import { useEffect, useState } from 'react';
import TcDatePicker from 'components/UI/DatePicker/TcDatePicker';
import TcFormItem from 'components/UI/Form/TcFormItem';
import ApiService, { errorResponse } from 'config/API/ApiService';
import { Select } from 'antd';
const { Option } = Select;
import endpointUrls from 'global/Constants/endpointUrls';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';

const TcPlanRouteVehicleClass = ({
  isShowDate = true,
  setTripPlanDate,
  filter,
  tripPlanDate,
  queryParam,
  required = false,
  initialTripPlanDate,
  isMinDate = true,
  label = 'مسیرها',
  payload = {},
}) => {
  const [planRoutes, setPlanRoutes] = useState([]);
  const apiCatcher = useApiCatcher();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tripPlanDate || queryParam?.tripPlanDate || initialTripPlanDate) {
      setIsLoading(true);

      ApiService.post(
        endpointUrls.getAllNetPlanRoute,
        JSON.stringify({
          insideDate: tripPlanDate || queryParam?.tripPlanDate || initialTripPlanDate || '1390/01/01',
          ...payload,
        })
      )
        .then((data) => {
          setIsLoading(false);
          if (data.isSuccess) {
            setPlanRoutes(data.data);
          } else {
            setIsLoading(false);
            setPlanRoutes([]);
          }
        })
        .catch(() => {
          setIsLoading(false);
          apiCatcher(errorResponse);
        });
    }
  }, [tripPlanDate, queryParam, initialTripPlanDate]);

  return (
    <>
      {isShowDate && (
        <TcFormItem
          label='تاریخ اعزام'
          name='tripPlanDate'
          rules={[
            {
              required,
              message: 'تاریخ اعزام را انتخاب کنید',
            },
          ]}>
          <TcDatePicker
            onChange={(dateObjects) => {
              setTripPlanDate(dateObjects);
            }}
            minDate={isMinDate && new Date()}
          />
        </TcFormItem>
      )}
      <TcFormItem
        label={label}
        name='planRouteId'
        initialValue={filter && '0'}
        rules={[
          {
            required,
            message: 'مسیر / محور را انتخاب کنید',
          },
        ]}>
        <Select
          disabled={tripPlanDate || initialTripPlanDate || planRoutes.length !== 0 ? false : true}
          showSearch
          placeholder='انتخاب کنید'
          optionFilterProp='children'
          loading={isLoading}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
          {filter && (
            <Option key='AllProvinces' value='0'>
              همه مسیرها
            </Option>
          )}
          {planRoutes.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.routeTitle}
            </Option>
          ))}
        </Select>
      </TcFormItem>
    </>
  );
};

export default React.memo(TcPlanRouteVehicleClass);
