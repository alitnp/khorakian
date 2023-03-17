import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

export const dateObjectFormatter = (date, format = 'YYYY/MM/DD', inputFormat) =>
  new DateObject({ date, format: inputFormat, locale: persian_fa, calendar: persian }).format(format);

export const getDayOfWeek = (date, inputFormat) => new DateObject({ date, format: inputFormat, locale: persian_fa, calendar: persian }).weekDay.name;
