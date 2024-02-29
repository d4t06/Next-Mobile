import Header from "@/components/Header";
import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
   return (
      <>
         <Header />
         <div className="container h-full min-[768px]:w-[800px] mx-auto px-[10px] sm:px-0">
            {children}
         </div>
      </>
   );
}
