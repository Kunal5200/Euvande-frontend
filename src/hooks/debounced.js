import { useEffect, useState } from "react";

export const useDebounced = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500); // Use provided delay or default to 500ms

    return () => clearTimeout(timeOut);
  }, [value, delay]);
  return debouncedValue;
};
