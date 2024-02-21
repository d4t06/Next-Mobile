import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export default function ProductDetailLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
