"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function AuthProvider({
   children,
   session,
}: {
   session: Session | null;
   children: ReactNode;
}) {
   return (
      <>
         <SessionProvider session={session}>{children}</SessionProvider>
      </>
   );
}
