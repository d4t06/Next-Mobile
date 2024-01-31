import { useEffect } from "react";
import { useState } from "react";

function useDebounce(value: string, delay: number) {
   const [debounceValue, setDebounceValue] = useState(value);

   useEffect(() => {
      const timeId = setTimeout(() => {
         setDebounceValue(value);
      }, delay);

      return () => {
         clearTimeout(timeId);
      };
   }, [value]);

   return debounceValue;
}

export default useDebounce;
