"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Skeleton from "./Skeleton";

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
                  <div className="flex">
                     <p>{data.user.name}</p>
                     <Link href={'/api/auth/signout'} className={""}>Sign Out</Link>
                  </div>
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

export function AvatarPlaceholder({
   firstChar,
   image_url,
}: {
   firstChar: string;
   image_url?: string;
}) {
   return (
      <div className={"bg-white"}>
         {image_url ? (
            <img src={image_url} className="w-full h-full rounded-full" alt="" />
         ) : (
            <div className={"avatar-placeholder"}>
               <p>{firstChar}</p>
            </div>
         )}
      </div>
   );
}
