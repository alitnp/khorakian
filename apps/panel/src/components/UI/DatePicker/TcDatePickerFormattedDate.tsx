import { FC, useEffect, useState } from 'react';
import DatePicker, { CalendarProps, DatePickerProps } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import classes from './style/style.module.css';
import 'react-multi-date-picker/styles/colors/green.css';
import { dateObjectFormatter } from 'global/helperFunctions/dateFormatter';
import { DateObject as DateObjectClass } from 'react-multi-date-picker';
import { englishNumber } from 'global/default';

interface ITcDatePicker extends DatePickerProps, CalendarProps {
  placeholder?: string;
  range?: boolean;
  onChange?: (a: any) => void;
  value?: any;
}

const TcDatePickerFormattedDate: FC<ITcDatePicker> = ({ placeholder = 'تاریخ را انتخاب کنید', value, onChange, range, ...props }) => {
  //states
  const [localValue, setLocalValue] = useState<any>(null);

  //effect
  useEffect(() => {
    if (!value) return setLocalValue(null);
    if (range) {
      const tempValue = [];
      if (value.length > 0) tempValue[0] = getDateObject(value[0]);
      if (value.length > 1) tempValue[1] = getDateObject(value[1]);
      return setLocalValue(tempValue);
    }
    setLocalValue(getDateObject(value));
  }, [value]);

  //functions
  const getDateObject = (date: string) => new DateObjectClass({ date, format: 'YYYY/MM/DD', locale: persian_fa, calendar: persian });
  const handleChange = (e: any) => {
    if (!range) {
      onChange && onChange(englishNumber(dateObjectFormatter(e)));
    } else {
      const value = [];
      if (e.length > 0) value[0] = englishNumber(dateObjectFormatter(e[0]));
      if (e.length > 1) value[1] = englishNumber(dateObjectFormatter(e[1]));
      onChange && onChange(value);
    }
  };

  return (
    <DatePicker
      className='shadow-lg green bg-t-bg-color border-t-border-color-base'
      inputClass={`${classes['t-dataPicker-input']}`}
      containerClassName='bg-t-bg-color'
      containerStyle={{ backgroundColor: 'red !important' }}
      calendar={persian}
      onChange={handleChange}
      placeholder={placeholder}
      value={localValue}
      range={range}
      locale={persian_fa}
      calendarPosition='bottom-right'
      {...props}
    />
  );
};

export default TcDatePickerFormattedDate;
