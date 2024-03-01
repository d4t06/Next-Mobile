"use client";

import { useSession } from "next-auth/react";
import { RefObject, useEffect, useState } from "react";

export default function DashBoardHeader({
   dashboardRef,
}: {
   dashboardRef: RefObject<HTMLDivElement>;
}) {
   const { data } = useSession();
   const [scroll, setScroll] = useState(false);

   const handleScroll = () => {
      const dashboardEle = dashboardRef.current;
      if (!dashboardEle) return;

      if (dashboardEle.scrollTop > 10) setScroll(true);
      else setScroll(false);
   };

   useEffect(() => {
      const dashboardEle = dashboardRef.current;
      if (!dashboardEle) return;

      dashboardEle.addEventListener("scroll", handleScroll);
      return () => dashboardEle.removeEventListener("scroll", handleScroll);
   }, []);

   const classes = {
      container: "absolute flex items-center left-0 w-[100%] h-[60px] px-[20px]",
   };

   return (
      <div className={`${classes.container} ${scroll ? "shadow-md" : ""}`}>
         <p className="ml-auto">
            Hello <span className="font-[500]">{data ? data.user.name : "no persist"}</span>
         </p>
      </div>
   );
}
