export const getPropertyFromRequest = (
  req: Req,
  propertyName: string,
): string | number | undefined => {
  return (
    req.query[propertyName] ||
    req.body[propertyName] ||
    req.params[propertyName] ||
    undefined
  );
};

export const getUserIdFromReq = (req: Req): string | undefined => {
  if (!req.headers.tokenData) return undefined;
  return JSON.parse(req.headers.tokenData as string)._id;
};

export const stringToBoolean = (string: any): boolean => {
  string = string + "";
  switch (string?.toLowerCase()?.trim()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return false;
  }
};

export const englishNumberOnly = (
  input: string,
  allowCammaAndDot?: boolean,
  allowDot?: boolean,
) => {
  if (input === null || input === undefined) return "";
  input = input.toString();
  if (!allowCammaAndDot && !allowDot)
    input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789]/g, "");
  if (allowCammaAndDot) input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789,.]/g, "");
  if (!allowCammaAndDot && allowDot)
    input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789.]/g, "");

  input = input.replace(/ /g, "");
  input = input.replace(/۰/g, "0");
  input = input.replace(/۱/g, "1");
  input = input.replace(/۲/g, "2");
  input = input.replace(/۳/g, "3");
  input = input.replace(/۴/g, "4");
  input = input.replace(/۵/g, "5");
  input = input.replace(/۶/g, "6");
  input = input.replace(/۷/g, "7");
  input = input.replace(/۸/g, "8");
  input = input.replace(/۹/g, "9");

  return input;
};
export const englishNumber = (input: string) => {
  if (input === null || input === undefined) return "";
  input = input.toString();

  input = input.replace(/ /g, "");
  input = input.replace(/۰/g, "0");
  input = input.replace(/۱/g, "1");
  input = input.replace(/۲/g, "2");
  input = input.replace(/۳/g, "3");
  input = input.replace(/۴/g, "4");
  input = input.replace(/۵/g, "5");
  input = input.replace(/۶/g, "6");
  input = input.replace(/۷/g, "7");
  input = input.replace(/۸/g, "8");
  input = input.replace(/۹/g, "9");

  return input;
};

//separates text to 3 digit parts
export const separator = (
  input: string,
  seperater = ",",
  seperateLength = 3,
) => {
  if (input === null || input === undefined) return "";
  input = input.toString();
  let result = "";
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

export const convertAllPropertyToEnNumber = (values: Record<string, any>) => {
  const newValues: Record<string, any> = {};
  for (const key in values) {
    if (Object.hasOwnProperty.call(values, key)) {
      const element = values[key];
      if (element && !isNaN(element)) {
        newValues[key] = englishNumber(element);
      } else {
        newValues[key] = element;
      }
    }
  }
  return newValues;
};
