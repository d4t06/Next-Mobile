"use client";

import Button from "@/components/ui/Button";
import { signOut, useSession } from "next-auth/react";

export default function MyAccount() {
   const { status, data } = useSession();

   const handleSignOut = async () => {
      await signOut({ redirect: false });
   };

   return (
      <div className="pt-[30px]">
         <div className="">
            <b>Status:</b> {status} <br />
            <b>username:</b> {data?.user?.username} <br />
            <b>role:</b> {data?.user?.role} <br />
            <b>expires:</b> {data?.expires} <br />
         </div>

         {data?.user.username && (
            <Button onClick={handleSignOut} className="mt-[30px]">
               Sign Out
            </Button>
         )}
      </div>
   );
}
