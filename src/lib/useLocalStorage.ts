import { useState, useEffect } from "react";

const PREFIX = "akddcl-";

const useLocalStorage = (key: string, defaultValue: any) => {
  const prefixedKey = PREFIX + key;
  const [localStorageValue, setLocalStorageValue] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if (typeof window !== "undefined") {
        const value = localStorage.getItem(prefixedKey);

        // If value is already present in
        // localStorage then return it

        // Else set default value in
        // localStorage and then return it
        if (value && value !== "undefined") {
          return JSON.parse(value);
        } else {
          if (typeof window !== "undefined")
            localStorage.setItem(prefixedKey, JSON.stringify(defaultValue));
          return defaultValue;
        }
      }
    } catch (error) {
      localStorage.setItem(prefixedKey, JSON.stringify(defaultValue));
    }
  }, [prefixedKey]);

  const setLocalStorageStateValue = (valueOrFn: any) => {
    const newValue =
      typeof valueOrFn === "function" ? valueOrFn(localStorageValue) : valueOrFn;

    if (typeof window !== "undefined") {
      localStorage.setItem(prefixedKey, JSON.stringify(newValue));
    }

    setLocalStorageValue(newValue);
  };

  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
