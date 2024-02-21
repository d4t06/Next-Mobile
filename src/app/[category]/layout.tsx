import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pt-[30px]">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
