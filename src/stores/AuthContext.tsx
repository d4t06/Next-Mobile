"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}

export const useAuthContext = () => {
  const { data, ...rest } = useSession();
  return { user: data, ...rest };
};
