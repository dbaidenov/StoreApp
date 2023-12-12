import { useState, useEffect, Dispatch, SetStateAction } from "react";

const getStorageData = function <T>(key: string, value: T): T {
  const data = localStorage.getItem(key);
  if (data !== null) {
    const parsedData: T = JSON.parse(data);
    return parsedData;
  } else {
    return value;
  }
};

type returnStorageData<T> = [T, Dispatch<SetStateAction<T>>];

const useStorageData = function <T>(
  key: string,
  value: T
): returnStorageData<T> {
  const [storageValue, setStorageValue] = useState<T>(
    getStorageData(key, value)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageValue));
  }, [key, storageValue]);
  return [storageValue, setStorageValue];
};

export default useStorageData;
