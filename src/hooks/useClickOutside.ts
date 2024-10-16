import { RefObject, useEffect } from "react";

type Props = {
   cb: () => void;
   trigger: boolean;
   containerRef: RefObject<HTMLElement>;
};

export default function useClickOutside({ containerRef, cb, trigger }: Props) {
   const handleClickOutside = (e: globalThis.MouseEvent) => {
      const $ = document.querySelector.bind(document);

      const addToCompareBtn = $(".add-to-compare-btn");
      const magBtn = $(".mag-btn");
      const target = e.target as HTMLElement;

      if (!containerRef.current || !target) return;
      if (addToCompareBtn?.contains(target) || magBtn?.contains(target)) return;

      if (!containerRef.current.contains(target)) cb();
   };

   useEffect(() => {
      if (!trigger) return;

      document.addEventListener("click", handleClickOutside);

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [trigger]);
}
