"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Skeleton from "@/components/Skeleton";

export default function Avatar() {
   const { data, status } = useSession();

   const classes = {
      container: "flex items-center space-x-[6px]",
      imageFrame: "h-[36px] w-[36px]",
      placeHolder: "flex h-full justify-center items-center bg-[#e1e1e1] rounded-full",
   };

   return (
      <div className={classes.container}>
         {status === "loading" && (
            <>
               <Skeleton className="h-[44px] w-[44px] rounded-full" />
               <Skeleton className="h-[24px] w-[100px] rounded-[4px]" />
            </>
         )}
         {status !== "loading" && (
            <>
               {data && data.user ? (
                  <p className="">
                     hi <Link href={'/my-account'} className="font-[500] hover:text-[#cd1818]">{data.user.name}</Link>
                  </p>
               ) : (
                  <Link className="font-[500] hover:text-[#cd1818]" href={"/signin"}>
                     Sign In
                  </Link>
               )}
            </>
         )}
      </div>
   );
}
