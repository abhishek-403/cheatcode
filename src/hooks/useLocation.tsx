import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
};

export const KEY_ACCESS_TOKEN = "access_token";

export function getItem(key: any) {
  return localStorage.getItem(key);
}
export function setItem(key: any, value: any) {
  return localStorage.setItem(key, value);
}

export function removeItem(key: any) {
  localStorage.removeItem(key);
}

export default useLocalStorage;
