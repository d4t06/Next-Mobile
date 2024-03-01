import { ReactNode } from "react";
// import DashboardHeader from "../../components/DashboardHeader";
import ToastPortal from "@/components/ToastPotal";
import ToastProvider from "@/stores/ToastContext";
import UploadImageProvider from "@/stores/ImageContext";
import UploadImagePortal from "@/components/UploadImagePortal";
import DashboardLayout from "@/layout/DashboardLayout";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Layout({ children }: { children: ReactNode }) {
   const session = await getServerSession(nextAuthOptions);

   // console.log('check sesstion', session);

   if (session?.user.role !== 'ADMIN') return redirect('/unauthorized')
   
   
   // if (!session || !session.user.name) return redirect('/signin')

   return (
      <ToastProvider>
         <UploadImageProvider>
            <DashboardLayout>{children}</DashboardLayout>

            <ToastPortal autoClose />
            <UploadImagePortal />
         </UploadImageProvider>
      </ToastProvider>
   );
}
