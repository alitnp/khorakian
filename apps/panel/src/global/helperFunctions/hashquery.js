import { englishNumber } from 'global/default';

export const encryptQuery = (query) => {
  if (!query) return '';
  const stringQuery = JSON.stringify(query);
  return window.btoa(stringQuery);
};

export const decryptQuery = (encriptedQuery) => {
  if (!encriptedQuery) return {};
  let decryptedQuery;
  try {
    decryptedQuery = window.atob(encriptedQuery);
  } catch (error) {
    decryptedQuery = encriptedQuery;
  }
  return JSON.parse(decryptedQuery);
};

export const encryptId = (id) => {
  // if (process.env.REACT_APP_NOD_ENV === 'production') {
  try {
    return window.btoa(englishNumber(id));
  } catch (error) {
    return id;
  }
  // }
  // return id;
};
export const decryptId = (encryptedId) => {
  if (!encryptId) return null;
  // if (process.env.REACT_APP_NOD_ENV === 'production') {
  try {
    return window.atob(englishNumber(encryptedId));
  } catch (error) {
    return encryptedId;
  }
  // }
  // return encryptedId;
};
