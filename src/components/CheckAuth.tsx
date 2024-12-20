"use client";

import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** need force props because
 * the session context don't update with server when navigate between pages
 * if no force will cause stuck at blank page */
type Props = {
  session?: Session;
};
export default function CheckAuth({ session: serverSession }: Props) {
  const { data: clientSession, status, update } = useSession();
  const router = useRouter();

  const targetSession = serverSession || clientSession;

  const handleLogout = async () => {

   console.log("check sesson", targetSession)

    if (targetSession?.error) {
      await signOut({ redirect: false });
      return router.push(`/signin?url=${location.pathname}`);
    }
  };

  // // Polling the session every 1 hour
  // useEffect(() => {
  //    const interval = setInterval(() => update(), 1000 * 10);
  //    return () => clearInterval(interval);
  // }, [update]);

  useEffect(() => {
    if (status === "loading") return;

    handleLogout();
  }, [serverSession, clientSession, handleLogout]);

  return <></>;
}
