import { FC } from 'react';
import DatePicker, { CalendarProps, DatePickerProps } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import classes from './style/style.module.css';
import 'react-multi-date-picker/styles/colors/green.css';

interface ITcDatePicker extends DatePickerProps, CalendarProps {
  placeholder?: string;
}

const TcDatePicker: FC<ITcDatePicker> = ({ placeholder = 'تاریخ را انتخاب کنید', ...props }) => {
  return (
    <DatePicker
      className='shadow-lg green bg-t-bg-color border-t-border-color-base'
      inputClass={`${classes['t-dataPicker-input']}`}
      containerClassName='bg-t-bg-color'
      containerStyle={{ backgroundColor: 'red !important' }}
      calendar={persian}
      placeholder={placeholder}
      locale={persian_fa}
      calendarPosition='bottom-right'
      {...props}
    />
  );
};

export default TcDatePicker;
