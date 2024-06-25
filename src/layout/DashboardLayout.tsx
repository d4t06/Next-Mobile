
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
            <div className="flex min-h-[100vh] max-h-[100vh] overflow-hidden">
               <DashBoardSidebar />
               <div className="relative w-full">
                  <DashBoardHeader />
                  <div className="dashboard-content max-h-[100vh] overflow-auto pt-[60px] px-[10px] sm:px-[40px]">
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
