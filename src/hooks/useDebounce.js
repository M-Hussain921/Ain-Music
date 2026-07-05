import { useState, useEffect } from "react";

export const useDebounce = (value, delay = 600) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value || "");
    }, delay);
    return clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};
