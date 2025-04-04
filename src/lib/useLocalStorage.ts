import { useState, useEffect } from "react";

const PREFIX = "akddcl-";

const useLocalStorage = (key: string, defaultValue: any) => {
  const prefixedKey = PREFIX + key;
  const [localStorageValue, setLocalStorageValue] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
<<<<<<< HEAD
      const value = localStorage.getItem(prefixedKey);

      if (value && value !== "undefined") {
        setLocalStorageValue(JSON.parse(value));
      } else {
        localStorage.setItem(prefixedKey, JSON.stringify(defaultValue));
=======
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
>>>>>>> 36fb0d2e58af9cadc5024f16f8cb2d03af8ac74b
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
