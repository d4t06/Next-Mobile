'use client'

import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/16/solid";
import Button from "./ui/Button";

export default function ScrollTop() {
   const [show, setShow] = useState(false);

   const scrollToTop = () => {
      setTimeout(() => {
         window?.scroll({
            behavior: "smooth",
            top: 0,
         });
      }, 150);
   };

   const handleShow = () => {
      if (window.scrollY > 100) setShow(true);
      else setShow(false);
   };

   useEffect(() => {
      window.addEventListener("scroll", handleShow);

      return () => window.removeEventListener("scroll", handleShow);
   }, []);

   const classes = {
      base: "!fixed z-[99] bottom-[30px] transition-[padding,opacity,transform] right-[16px]",
      hide: "opacity-0 translate-y-[30px]",
      show: "translate-y-[0] opacity-[1]",
   };

   return (
      <div className={`${classes.base} ${show ? classes.show : classes.hide}`}>
         <Button
         colors={'third'}
            className="p-[6px]"
            size={"clear"}
            onClick={show ? scrollToTop : () => {}}
         >
            <ChevronUpIcon className="w-[22px] " />
         </Button>
      </div>
   );
}
