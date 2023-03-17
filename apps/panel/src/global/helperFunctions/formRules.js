import { englishNumber } from 'global/default';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

export const isDateTodayOrGreater = (date) => {
  if (!date) return;
  const valueDate = englishNumber(date.format('YYYY/MM/DD')).split('/');
  const todayDate = englishNumber(new DateObject({ calendar: persian, locale: persian_fa }).format('YYYY/MM/DD')).split('/');
  let isGreater = true;
  for (let index = 0; index < valueDate.length; index++) {
    if (valueDate[index] > todayDate[index]) break;
    if (valueDate[index] < todayDate[index]) isGreater = false;
  }
  return isGreater;
};

export const isDateTodayOrLess = (date) => {
  if (!date) return;
  const valueDate = englishNumber(date.format('YYYY/MM/DD')).split('/');
  const todayDate = englishNumber(new DateObject({ calendar: persian, locale: persian_fa }).format('YYYY/MM/DD')).split('/');
  let isLess = true;
  for (let index = 0; index < valueDate.length; index++) {
    if (valueDate[index] < todayDate[index]) break;
    if (valueDate[index] > todayDate[index]) isLess = false;
  }
  return isLess;
};

export const minDateToday = () => ({
  validator(_, value) {
    if (isDateTodayOrGreater(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('تاریخ گذشته قابل انتخاب نیست.'));
    }
  },
});

export const maxDateToday = () => ({
  validator(_, value) {
    if (isDateTodayOrLess(value)) return Promise.resolve();
    else return Promise.reject(new Error('تاریخ آینده قابل انتخاب نیست.'));
  },
});
