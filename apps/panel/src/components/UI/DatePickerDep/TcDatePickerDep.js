import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import 'react-multi-date-picker/styles/colors/green.css';
import classes from './style/style.module.css';

const TcDatePickerDep = ({ placeholder, max, ...props }) => {
  return (
    <DatePicker
      range
      fixMainPosition
      inputClass={`${classes['t-dataPicker-input']}`}
      className='shadow-lg green bg-t-bg-color border-t-border-color-base'
      calendar={persian}
      placeholder={placeholder}
      containerClassName='bg-t-bg-color'
      containerStyle={{ backgroundColor: 'red !important' }}
      plugins={[<DatePanel position='left' key={max} />]}
      locale={persian_fa}
      calendarPosition='bottom-right'
      maxDate={new DateObject({ calendar: persian }).set('date', max)}
      {...props}
    />
  );
};

export default TcDatePickerDep;
