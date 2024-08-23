import ScrollTop from "@/components/ScrollTop";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { ReactNode } from "react";
import CompareList from "./_components/CompareList";
import ToastProvider from "@/stores/ToastContext";
import ToastPortal from "@/components/ToastPotal";

export default async function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastProvider>
        <Header />
        <div className="container min-h-screen mt-[30px]">{children}</div>
        <CompareList />
        <ScrollTop />
        <Footer />

        <ToastPortal autoClose />
      </ToastProvider>
    </>
  );
}
