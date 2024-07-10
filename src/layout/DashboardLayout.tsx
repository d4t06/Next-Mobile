import ToastProvider from "@/stores/ToastContext";
import UploadImageProvider from "@/stores/ImageContext";
import DashBoardHeader from "./_components/DashboardHeader";
import DashBoardSidebar from "./_components/DashboardSidebar";
import { ReactNode } from "react";
import ToastPortal from "@/components/ToastPotal";
import UploadImagePortal from "@/components/UploadImagePortal";

export default function DashboardLayout({ children }: { children: ReactNode }) {
   return (
      <ToastProvider>
         <UploadImageProvider>
            <div className="flex fixed top-0 bottom-0 w-full overflow-hidden">
               <DashBoardSidebar />
               <div className="relative flex flex-col w-full">
                  <DashBoardHeader />
                  <div className="dashboard-content flex-grow overflow-auto pt-[60px] px-[10px] sm:px-[40px]">
                     <div className="pt-[30px] pb-[60px]">{children}</div>
                  </div>
               </div>
            </div>
            <ToastPortal autoClose />
            <UploadImagePortal />
         </UploadImageProvider>
      </ToastProvider>
   );
}
