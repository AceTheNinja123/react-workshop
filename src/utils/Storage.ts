"use client"; // Make it a client component then you don't need to check if you're on the browser

import _ from "lodash";
type StorageType = "session" | "local";

type ServerStorage = Record<string, string>;
type ServerStorages = Record<string, ServerStorage>;

type UseStorageReturnValue = {
  getItem: (key: string, type?: StorageType) => string;
  getObject: (key: string, type?: StorageType) => object | null;
  setItem: (key: string, value: string, type?: StorageType) => boolean;
  setObject: (key: string, value: object, type?: StorageType) => boolean;
  removeItem: (key: string, type?: StorageType) => void;
  clearItemList: (type?: StorageType) => void;
  getArray: (key: string, type?: StorageType) => Array<number | string> | null;
  setArray: (key: string, value: Array<number | string>, type?: StorageType) => boolean;
  removeObject: (key: string, type?: StorageType) => void;
  removeArray: (key: string, type?: StorageType) => void;
};
// Just make this a class or a static object (singleton), we don't need to create a new instance every time
// we use it because its state is a side-effect

//const MyStorage = {
//  getItem(key: string, storage_type?: StorageType): string | null {
//    if (!!storage_type || storage_type == "local") {
//      return window.localStorage.getItem(key);
//    } else {
//      return window.sessionStorage.getItem(key);
//    }
//  },
//};

const Storage = (): UseStorageReturnValue => {
  const storageType = (type?: StorageType): "localStorage" | "sessionStorage" =>
    `${type ?? "session"}Storage`;

  const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();

  const serverStorage: ServerStorages = {
    localStorage: {},
    sessionStorage: {},
  };

  const getItem = (key: string, type?: StorageType): string => {
    if (isBrowser) {
      const storage = window[storageType(type)];
      return storage.getItem(key) ?? "";
    } else {
      return serverStorage[storageType(type)]?.[key] ?? "";
    }
  };

  const getObject = (key: string, type?: StorageType): object | null => {
    if (isBrowser) {
        // Safely cast to `Storage` and handle possible errors from JSON parsing
        const storage = window[storageType(type)];
        const item = storage.getItem(key);
        try {
            return typeof item == 'object' ? item : null;
        } catch {
            console.warn(`Failed to parse object for key: ${key}`);
            return null;
        }
    } else {
        const item = serverStorage[storageType(type)]?.[key];
        try {
            return typeof item == 'object' ? item : null;
        } catch {
            console.warn(`Failed to parse server object for key: ${key}`);
            return null;
        }
    }
};

const getArray = (key: string, type?: StorageType): Array<number | string> | null => {
    if (isBrowser) {
        // Safely cast to `Storage` and handle possible errors from JSON parsing
        const storage = window[storageType(type)];
        const item = storage.getItem(key);
        try {
          return (item && item !== null && typeof item !== "string" || typeof item !== "object") ? [item] : [];
        } catch {
            console.warn(`Failed to parse array for key: ${key}`);
            return [];
        }
    } else {
        const item = serverStorage[storageType(type)]?.[key];
        try {
          return (item && item !== null && item !== undefined && typeof item !== "object") ? [item] : [];
        } catch {
          console.warn(`Failed to parse server array for key: ${key}`);
          return [];
        }
    }
};


  const removeObject = (key: string, type?: StorageType): void => {
    if (isBrowser) {window[storageType(type)].removeItem(key);} 
    else {_.omit(serverStorage[storageType(type)], key);}
  };

  const removeArray = (key: string, type?: StorageType): void => {
    if (isBrowser) {window[storageType(type)].removeItem(key);} 
    else {_.omit(serverStorage[storageType(type)], key);}
  };

  const removeItem = (key: string, type?: StorageType): void => {
    if (isBrowser) {window[storageType(type)].removeItem(key);} 
    else {_.omit(serverStorage[storageType(type)], key);}
  };

  const clearItemList = (type?: StorageType): void => {
    if (isBrowser) {window[storageType(type)].clear();} 
    else {serverStorage[storageType(type)] = {};}
  };

  const setItem = (key: string, value: string, type?: StorageType): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, value);
      return true;
    } else {
      const storageKey = storageType(type); 
      if (!serverStorage[storageKey]) serverStorage[storageKey] = {};
      serverStorage[storageKey][key] = JSON.stringify(value);
    }
    return false;
  };

  const setObject = (key: string, value: object, type?: StorageType): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  };

  const setArray = (key: string, value: Array<number | string>, type?: StorageType): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
};

  return {
    getItem,
    setItem,
    removeItem,
    clearItemList,
    getArray,
    setArray,
    getObject,
    setObject,
    removeObject,
    removeArray,
  };
};

export default Storage;