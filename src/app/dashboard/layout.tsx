import { ReactNode } from "react";
// import DashboardHeader from "../../components/DashboardHeader";
import ToastPortal from "@/components/ToastPotal";
import ToastProvider from "@/stores/ToastContext";
import UploadImageProvider from "@/stores/ImageContext";
import UploadImagePortal from "@/components/UploadImagePortal";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
   return (
      <ToastProvider>
         <UploadImageProvider>
            <div className="py-[30px]">
               {/* <DashboardHeader /> */}
               {children}
               <ToastPortal autoClose={false} />
               <UploadImagePortal />
            </div>
         </UploadImageProvider>
      </ToastProvider>
   );
}
