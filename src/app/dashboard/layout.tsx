import { ReactNode } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import ToastPortal from "@/components/ToastPotal";
import ToastProvider from "@/stores/ToastContext";
import UploadImageProvider from "@/stores/ImageContext";
import UploadImagePortal from "@/components/UploadImagePortal";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <UploadImageProvider>
        <div className="my-[30px]">
          <DashboardHeader />
          <div className="mt-[20px]">{children}</div>
          <ToastPortal autoClose={false} />
          <UploadImagePortal />
        </div>
      </UploadImageProvider>
    </ToastProvider>
  );
}
