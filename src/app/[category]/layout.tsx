import { ReactNode, Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/Header";

export default function ProductLayout({ children }: { children: ReactNode }) {
   return (
      <div className="">
         {/* <Header /> */}
         <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
   );
}
