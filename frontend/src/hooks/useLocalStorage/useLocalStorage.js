import { useState, useEffect } from "react";

const useLocalStorage = (key, initialvalue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialvalue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
