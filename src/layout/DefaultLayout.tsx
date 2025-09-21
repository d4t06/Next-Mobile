import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { ReactNode, Suspense } from "react";
import ToastProvider from "@/stores/ToastContext";
import ScrollTop from "./_components/ScrollTop";
import CompareList from "@/modules/compare-list";
import ToastPortal from "@/modules/toast-portal";

export default async function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastProvider>
        <Suspense fallback={<div className="h-[80px] sm:h-[92px]"></div>}>
          <Header />
        </Suspense>
        <div className="container min-h-screen mt-[30px]">{children}</div>
        <CompareList />
        <ScrollTop />
        <Footer />

        <ToastPortal autoClose />
      </ToastProvider>
    </>
  );
}
