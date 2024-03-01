"use client";

import Button from "@/components/ui/Button";
import { signOut, useSession } from "next-auth/react";

export default function MyAccount() {
   const { status, data } = useSession();

   const handleSignOut = async () => {
      await signOut();
   };

   return (
      <div className="pt-[30px]">
         <div className="">
            <b>Status:</b> {status} <br />
            <b>username:</b> {data?.user?.name} <br />
            <b>role:</b> {data?.user?.role} <br />
            <b>expires:</b> {data?.expires} <br />
         </div>

         {data?.user.name && <Button onClick={handleSignOut} variant={"push"} className="mt-[30px]">
            Sign Out
         </Button>}
      </div>
   );
}
