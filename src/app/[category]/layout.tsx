import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export default function ProductLayout({ children }: { children: ReactNode }) {
   return (
      <div className="">
         <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
   );
}
