"use client";

import Link from "next/link";

import defaultUser from "@/assets/user-default.png";
import { useSession } from "next-auth/react";
import Skeleton from "./Skeleton";
import Image from "next/image";

export default function Avatar({ revert }: { revert?: boolean }) {
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
               <div className={classes.imageFrame}>
                  {data?.user ? (
                     <Link href="/my-account">
                        <div className={classes.placeHolder}>
                           <p>{data.user.name?.charAt(0).toUpperCase() || ""}</p>
                        </div>
                     </Link>
                  ) : (
                     <Image
                        alt="avatar"
                        height={44}
                        width={44}
                        className="rounded-full w-full"
                        src={defaultUser}
                     />
                  )}
               </div>

               {data?.user ? (
                  <h5 className={"user-name"}>{data.user.name}</h5>
               ) : (
                  <Link href={"/signin"}>Sign In</Link>
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
