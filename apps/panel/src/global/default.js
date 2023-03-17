import ApiService from 'config/API/ApiService';
import { dateObjectFormatter } from 'global/helperFunctions/dateFormatter';

export const converPersionNumberToEnglish = (s = '', number) => {
  const elem = s
    .toString()
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  if (number) return Number(elem);
  return elem;
};

// export const convertArabicNumberToEnglish = (s) => {
//   const elem = s.toString().replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
//   return elem;
// };

export const extractNumberFromString = (s) => {
  const elem = s
    .toString()
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/\D/g, '');
  return elem;
};

export const convertNumberToRial = (number = 0, suffix = ' ریال') => {
  let value = number?.toString()?.replace(/,/g, '');
  const isMinusNumber = value?.includes('-');

  if (isMinusNumber) value = value.toString().slice(1, value.length);

  // value = parseInt(value);
  let caret = value?.length - 1;
  while (caret - 3 > -1) {
    caret -= 3;
    value = value?.split('');
    value?.splice(caret + 1, 0, ',');
    value = value?.join('');
  }
  return isMinusNumber ? `-${value}${suffix}` : `${value}${suffix}`;
};

export const stringToBoolean = (string) => {
  string = string + '';
  switch (string?.toLowerCase()?.trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return undefined;
  }
};

export const scrollToSection = (id, queryParam = undefined) => {
  if (queryParam && Object.keys(queryParam).length !== 0 && Object.keys(queryParam).length > 0) {
    document.getElementById(id)?.scrollIntoView();
  } else {
    document.getElementById(id)?.scrollIntoView();
  }
};

export const englishNumberOnly = (input, allowCammaAndDot, allowDot) => {
  if (input === null || input === undefined) return '';
  input = input.toString();
  if (!allowCammaAndDot && !allowDot) input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789]/g, '');
  if (allowCammaAndDot) input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789,.]/g, '');
  if (!allowCammaAndDot && allowDot) input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789.]/g, '');

  input = input.replace(/ /g, '');
  input = input.replace(/۰/g, '0');
  input = input.replace(/۱/g, '1');
  input = input.replace(/۲/g, '2');
  input = input.replace(/۳/g, '3');
  input = input.replace(/۴/g, '4');
  input = input.replace(/۵/g, '5');
  input = input.replace(/۶/g, '6');
  input = input.replace(/۷/g, '7');
  input = input.replace(/۸/g, '8');
  input = input.replace(/۹/g, '9');

  return input;
};

export const englishDouble = (input) => {
  if (input === null || input === undefined) return '';
  input = input.toString();
  input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789.]/g, '');
  const dotIndexes = [];
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '.' && dotIndexes.length === 0) {
      dotIndexes.push(i);
      continue;
    }
    if (char === '.' && dotIndexes.length > 0) input = input.substring(0, i) + '' + input.substring(i + 1);
  }

  input = input.replace(/ /g, '');
  input = input.replace(/۰/g, '0');
  input = input.replace(/۱/g, '1');
  input = input.replace(/۲/g, '2');
  input = input.replace(/۳/g, '3');
  input = input.replace(/۴/g, '4');
  input = input.replace(/۵/g, '5');
  input = input.replace(/۶/g, '6');
  input = input.replace(/۷/g, '7');
  input = input.replace(/۸/g, '8');
  input = input.replace(/۹/g, '9');

  return input;
};
export const englishNumber = (input) => {
  if (input === null || input === undefined) return '';
  input = input.toString();

  input = input.replace(/ /g, '');
  input = input.replace(/۰/g, '0');
  input = input.replace(/۱/g, '1');
  input = input.replace(/۲/g, '2');
  input = input.replace(/۳/g, '3');
  input = input.replace(/۴/g, '4');
  input = input.replace(/۵/g, '5');
  input = input.replace(/۶/g, '6');
  input = input.replace(/۷/g, '7');
  input = input.replace(/۸/g, '8');
  input = input.replace(/۹/g, '9');

  return input;
};

// download file
export const downloadFile = (data, name, setIsLoading) => {
  setIsLoading(true);

  ApiService.get(data, {
    responseType: 'blob', // important
    headers: { 'content-disposition': 'attachment', 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
  })
    .then((response) => {
      setIsLoading(false);
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
    })
    .catch(() => {
      setIsLoading(false);
    });
};

//separates text to 3 digit parts
export const separator = (input, seperater = ',', seperateLength = 3) => {
  if (input === null || input === undefined) return '';
  input = input.toString();
  let result = '';
  let count = 0;
  for (let i = input.length - 1; i > -1; i--) {
    if (count === seperateLength) {
      result = seperater + result;
      count = 0;
    }
    result = input.charAt(i) + result;
    count++;
  }
  return result;
};

export const setPlateNumberFormat = (value) => {
  const splitPlate = value?.split('-ایران-');
  return `${splitPlate?.[1] || ''}  ${splitPlate?.[0] || ''}`;
};

export const getPathnameFromReferrer = (referrer) => {
  return referrer.replace(/^[^:]+:\/\/[^/]+/, '').replace(/#.*/, '');
};

export const isFillMinimumInput = (values) => {
  let isRequired = false;
  for (const key in values) {
    values[key];
    if (values[key] !== undefined) {
      isRequired = true;
      break;
    }
  }

  return isRequired;
};

export const convertAllPropertyToEnNumber = (values, noNumber) => {
  const newValues = {};
  for (const key in values) {
    if (Object.hasOwnProperty.call(values, key)) {
      const element = values[key];
      if (element && !isNaN(element)) {
        newValues[key] = converPersionNumberToEnglish(element, noNumber ? false : true);
      } else {
        newValues[key] = element;
      }
    }
  }
  return newValues;
};

export const convertRangeDatePicker = (dates = [], startName, endName) => {
  const values = {};
  values[startName] = typeof dates?.[0] === 'object' ? converPersionNumberToEnglish(dates?.[0]?.format('YYYY/MM/DD')) : dates?.[0];
  values[endName] = typeof dates?.[1] === 'object' ? converPersionNumberToEnglish(dates?.[1]?.format('YYYY/MM/DD')) : dates?.[1];

  return values;
};

export const convertDatePicker = (dates) => {
  return typeof dates === 'object' ? converPersionNumberToEnglish(dates?.format('YYYY/MM/DD')) : dates;
};

export const calculatePercent = (total, part) => {
  if (!total || !part) return 0;
  total = parseFloat(total);
  part = parseFloat(part);
  return ((part / total) * 100).toFixed(2);
};

export const getPercent = (part, full) => {
  if (!part || !full) return 0;
  return parseFloat(((part / full) * 100).toFixed(2));
};

export const getTrendPercent = (part, full, tofix = 2) => {
  if (!part || !full) return 0;
  return ((part / full) * 100 - 100).toFixed(tofix);
};

export const isValidLatitude = (lat) => {
  if (!lat || lat > 40 || lat < 24) return false;
  return true;
};

export const isValidLongitude = (long) => {
  if (!long || long > 65 || long < 43) return false;
  return true;
};

export const getNowDate = () => dateObjectFormatter(Date.now());
export const getYesterdayDate = () => dateObjectFormatter(Date.now() - 86400000);
export const getLastWeekDate = () => dateObjectFormatter(Date.now() - 604800000);
export const getLastMonthDate = () => dateObjectFormatter(Date.now() - 2592000000);
export const getLastYearDate = () => dateObjectFormatter(Date.now() - 31536000000);
export const getFormattedLincensePlate = (values) => {
  return {
    plateNumberPartial: `${(values?.cartPlateThreeDigit && converPersionNumberToEnglish(values?.cartPlateThreeDigit)) || ''}${values?.cartPlateAlphabet || ''}${
      (values.cartPlateTwoDigit && converPersionNumberToEnglish(values.cartPlateTwoDigit)) || ''
    }`,
    plateLocationCode: values?.plateLocationCode && converPersionNumberToEnglish(values?.plateLocationCode),
  };
};

export const getPayloadWithLicensePlateAndDateRange = (query, defaultDateName = 'date', firstDateName = 'fromCreationDate', secondDateName = 'toCreationDate') => {
  const tempQuery = { ...query };
  let payload = {};
  if (tempQuery.cartPlateThreeDigit || tempQuery.cartPlateTwoDigit) payload = { ...getFormattedLincensePlate(query) };
  if (tempQuery.cartPlateAlphabet) delete tempQuery.cartPlateAlphabet;
  payload = { ...tempQuery, ...payload };

  if (tempQuery[defaultDateName]) {
    payload[firstDateName] = dateObjectFormatter(tempQuery[defaultDateName][0]);
    payload[secondDateName] = dateObjectFormatter(tempQuery[defaultDateName][1]);
  }
  return payload;
};

export const getPayloadWithLicensePlate = (query) => {
  const tempQuery = { ...query };
  let payload = {};
  if (tempQuery.cartPlateThreeDigit || tempQuery.cartPlateTwoDigit) payload = { ...getFormattedLincensePlate(query) };
  if (tempQuery.cartPlateAlphabet) delete tempQuery.cartPlateAlphabet;
  payload = { ...tempQuery, ...payload };

  return payload;
};

export const getPayloadDateRange = (date, firstDateName = 'fromCreationDate', secondDateName = 'toCreationDate') => {
  const payload = {};
  if (date[0]) {
    payload[firstDateName] = englishNumber(dateObjectFormatter(date[0]));
  }
  if (date[1]) {
    payload[secondDateName] = englishNumber(dateObjectFormatter(date[1]));
  }
  return payload;
};

export const persianCharacter = (input) => {
  if (input === null || input === undefined) return '';
  input = input.toString();
  input = input.replace(/0/g, '۰');
  input = input.replace(/1/g, '۱');
  input = input.replace(/2/g, '۲');
  input = input.replace(/3/g, '۳');
  input = input.replace(/4/g, '۴');
  input = input.replace(/5/g, '۵');
  input = input.replace(/6/g, '۶');
  input = input.replace(/7/g, '۷');
  input = input.replace(/8/g, '۸');
  input = input.replace(/9/g, '۹');
  input = input.replace(/Q/g, 'ض');
  input = input.replace(/q/g, 'ض');
  input = input.replace(/W/g, 'ص');
  input = input.replace(/w/g, 'ص');
  input = input.replace(/E/g, 'ث');
  input = input.replace(/e/g, 'ث');
  input = input.replace(/R/g, 'ق');
  input = input.replace(/r/g, 'ق');
  input = input.replace(/T/g, '،');
  input = input.replace(/t/g, 'ف');
  input = input.replace(/Y/g, 'غ');
  input = input.replace(/y/g, 'غ');
  input = input.replace(/U/g, 'ع');
  input = input.replace(/u/g, 'ع');
  input = input.replace(/I/g, 'ه');
  input = input.replace(/i/g, 'ه');
  input = input.replace(/O/g, 'خ');
  input = input.replace(/o/g, 'خ');
  input = input.replace(/P/g, 'ح');
  input = input.replace(/p/g, 'ح');
  input = input.replace(/\[/g, 'ج');
  input = input.replace(/\]/g, 'چ');
  input = input.replace(/\\/g, 'پ');
  input = input.replace(/A/g, 'ش');
  input = input.replace(/a/g, 'ش');
  input = input.replace(/S/g, 'س');
  input = input.replace(/s/g, 'س');
  input = input.replace(/D/g, 'ی');
  input = input.replace(/d/g, 'ی');
  input = input.replace(/F/g, 'پ');
  input = input.replace(/f/g, 'ب');
  input = input.replace(/G/g, 'ل');
  input = input.replace(/g/g, 'ل');
  input = input.replace(/H/g, 'آ');
  input = input.replace(/h/g, 'ا');
  input = input.replace(/J/g, 'ت');
  input = input.replace(/j/g, 'ت');
  input = input.replace(/K/g, 'ن');
  input = input.replace(/k/g, 'ن');
  input = input.replace(/L/g, 'م');
  input = input.replace(/l/g, 'م');
  input = input.replace(/;/g, 'ک');
  input = input.replace(/'/g, 'گ');
  input = input.replace(/Z/g, 'ظ');
  input = input.replace(/z/g, 'ظ');
  input = input.replace(/X/g, 'ط');
  input = input.replace(/x/g, 'ط');
  input = input.replace(/C/g, 'ژ');
  input = input.replace(/c/g, 'ز');
  input = input.replace(/V/g, 'ر');
  input = input.replace(/v/g, 'ر');
  input = input.replace(/B/g, 'ذ');
  input = input.replace(/b/g, 'ذ');
  input = input.replace(/N/g, 'د');
  input = input.replace(/n/g, 'د');
  input = input.replace(/M/g, 'ئ');
  input = input.replace(/m/g, 'ء');
  input = input.replace(/,/g, 'و');
  input = input.replace(/÷/g, 'پ');

  return input;
};

export const getEnglishNumber = (number, needString = false) => {
  const string = englishNumberOnly(number);
  if (!string && !needString) return 0;
  if (!string && needString) return '';
  if (needString) return string;
  return parseInt(string);
};
export const getEnglishDouble = (number) => {
  const string = englishDouble(number);
  if (!string) return '';
  return string;
};

export const convertFormValuesToEnglishNumber = (value, values, shouldBeNumberList, form, needString = false) => {
  const changedInputName = Object.keys(value)[0];
  if (shouldBeNumberList.includes(changedInputName)) {
    form.setFieldsValue({ ...values, [changedInputName]: getEnglishNumber(value[changedInputName], needString) });
  }
};
export const convertFormValuesToEnglishDouble = (value, values, shouldBeNumberList, form, needString = false) => {
  const changedInputName = Object.keys(value)[0];
  if (shouldBeNumberList.includes(changedInputName)) {
    form.setFieldsValue({ ...values, [changedInputName]: getEnglishDouble(value[changedInputName], needString) });
  }
};
