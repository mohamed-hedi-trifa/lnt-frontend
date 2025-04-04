import { useState } from "react";

const PREFIX = "akddcl-";

const useLocalStorage = (key: string, defaultValue: any) => {
  // Create state variable to store
  // localStorage value in state
  const prefixedKey = PREFIX + key;
  const [localStorageValue, setLocalStorageValue] = useState(() => {
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
      return defaultValue;
    }
  });

  // this method update our localStorage and our state
  const setLocalStorageStateValue = (valueOrFn: any) => {
    let newValue;
    if (typeof valueOrFn === "function") {
      const fn = valueOrFn;
      newValue = fn(localStorageValue);
    } else {
      newValue = valueOrFn;
    }
    localStorage.setItem(prefixedKey, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
