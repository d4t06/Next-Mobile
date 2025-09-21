"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashBoardHeader() {
  const { data: session } = useSession();
  const [scroll, setScroll] = useState(false);

  const handleScroll = (e: Event) => {
    if ((e.target as HTMLDivElement).scrollTop > 10) setScroll(true);
    else setScroll(false);
  };

  useEffect(() => {
    const dashboardEle = document.querySelector(".dashboard-content");
    if (dashboardEle) {
      dashboardEle.addEventListener("scroll", handleScroll);
    }
    return () => dashboardEle?.removeEventListener("scroll", handleScroll);
  }, []);

  const classes = {
    container:
      "absolute z-[99] bg-white dark:bg-slate-800 flex items-center left-0 w-[100%] h-[60px] px-[20px]",
  };

  return (
    <div className={`${classes.container} ${scroll ? "shadow-md" : ""}`}>
      <div className="ml-auto">{session?.user.username}</div>
    </div>
  );
}
