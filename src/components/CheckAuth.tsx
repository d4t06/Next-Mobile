"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

/** need force props because
 * the session context don't update with server when navigate between pages
 * if no force will cause stuck at blank page */
type Props = {
  session?: Session;
};
export default function CheckAuth({ session: serverSession }: Props) {
  const { data: clientSession, status, update } = useSession();

  const targetSession = serverSession || clientSession;

  const handleLogout = async () => {
    console.log("check client sesson", targetSession);
  };

  useEffect(() => {
    if (status === "loading") return;

    handleLogout();
  }, [serverSession, clientSession, handleLogout]);

  return <></>;
}
