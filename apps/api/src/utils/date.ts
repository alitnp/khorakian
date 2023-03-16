import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const dateObjectFormatter = (
  date: string | DateObject | number,
  format = "YYYY/MM/DD",
  inputFormat?: string,
) =>
  new DateObject({
    date,
    format: inputFormat,
    locale: persian_fa,
    calendar: persian,
  }).format(format);

export const getDayOfWeek = (date: string | DateObject, inputFormat?: string) =>
  new DateObject({
    date,
    format: inputFormat,
    locale: persian_fa,
    calendar: persian,
  }).weekDay.name;

export const getNowDate = () => dateObjectFormatter(Date.now());
export const getYesterdayDate = () =>
  dateObjectFormatter(Date.now() - 86400000);
export const getLastWeekDate = () =>
  dateObjectFormatter(Date.now() - 604800000);
export const getLastMonthDate = () =>
  dateObjectFormatter(Date.now() - 2592000000);
export const getLastYearDate = () =>
  dateObjectFormatter(Date.now() - 31536000000);
