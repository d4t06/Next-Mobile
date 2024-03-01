import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <div className="mt-[20px]">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
