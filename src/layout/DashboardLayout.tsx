"use client";

import DashBoardHeader from "./_components/DashboardHeader";
import DashBoardSidebar from "./_components/DashboardSidebar";
import { ReactNode, useRef } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
   const dashboardRef = useRef<HTMLDivElement>(null);

   return (
      <div className="flex min-h-[100vh] max-h-[100vh] overflow-hidden">
         <DashBoardSidebar />
         <div className="relative w-full">
            <DashBoardHeader dashboardRef={dashboardRef} />
            <div className="max-h-[100vh] overflow-auto pt-[60px] px-[20px]">{children}</div>
         </div>
      </div>
   );
}
