"use client";

import { useEffect, useState } from "react";
import Avatar from "./Avatar";

export default function DashBoardHeader() {
   const [scroll, setScroll] = useState(false);

   const handleScroll = (e: Event) => {
      if ((e.target as HTMLDivElement).scrollTop > 10) setScroll(true);
      else setScroll(false);
   };

   useEffect(() => {
      const dashboardEle = document.querySelector(".dashboard-content");
      if (!dashboardEle) return;

      dashboardEle.addEventListener("scroll", handleScroll);
      return () => dashboardEle.removeEventListener("scroll", handleScroll);
   }, []);

   const classes = {
      container:
         "absolute z-[99] bg-[#fff] flex items-center left-0 w-[100%] h-[60px] px-[20px]",
   };

   return (
      <div className={`${classes.container} ${scroll ? "shadow-md" : ""}`}>
         <div className="ml-auto">
            <Avatar />
         </div>
      </div>
   );
}
