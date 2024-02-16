import { ReactNode } from "react";
import DashboardHeader from "./components/Header";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
   return (
      <div className="my-[30px]">
         <DashboardHeader />
         <div className="mt-[20px]">{children}</div>
      </div>
   );
}
