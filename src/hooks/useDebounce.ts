import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useState } from "react";

function useDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  const timerId = useRef<NodeJS.Timeout>();

  const pahtName = usePathname();

  useEffect(() => {
    if (!value.trim()) {
      setDebounceValue("");
      return;
    }

    timerId.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId.current);
    };
  }, [value, delay]);

  useEffect(() => {
    setDebounceValue("");
    clearTimeout(timerId.current);
  }, [pahtName]);

  return debounceValue;
}

export default useDebounce;
