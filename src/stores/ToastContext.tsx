"use client";

// init state
import { ReactNode, createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isDark, setIsDark] = useState<boolean>();

  const setErrorToast = (message: string = "Somethings went wrong") =>
    setToasts((t) => [...t, { title: "error", id: nanoid(4), desc: message }]);

  const setSuccessToast = (message: string = "Somethings went successful") =>
    setToasts((t) => [...t, { title: "success", id: nanoid(4), desc: `${message}` }]);

  return {
    toasts,
    isDark,
    setIsDark,
    setToasts,
    setErrorToast,
    setSuccessToast,
  };
}

type ContextType = ReturnType<typeof useToast>;

const ToastContext = createContext<ContextType | null>(null);

// define context provider
const ToastProvider = ({ children }: { children: ReactNode }) => {
  return <ToastContext.Provider value={useToast()}>{children}</ToastContext.Provider>;
};

// define useToast Hook
const useToastContext = () => {
  const ct = useContext(ToastContext);
  if (!ct) throw new Error("ToastProvider not provided");
  return ct;
};

export default ToastProvider;
export { useToast };
