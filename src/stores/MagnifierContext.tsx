'use client'

import { ReactNode, createContext, useContext, useState } from "react";

const useMagnifier = () => {
   const [isOpen, setIsOpen] = useState(false);

   return { isOpen, setIsOpen };
};

type ContextType = ReturnType<typeof useMagnifier>;

const Context = createContext<ContextType | null>(null);

export default function MagnifierProvider({
   children,
}: {
   children: ReactNode;
}) {
   return (
      <Context.Provider value={useMagnifier()}>{children}</Context.Provider>
   );
}

export const useMagnifierContext = () => {
   const context = useContext(Context);
   if (!context) throw new Error("");

   return context;
};
